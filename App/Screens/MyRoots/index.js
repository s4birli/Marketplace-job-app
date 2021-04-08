import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  Alert
} from 'react-native';
import styles from './index.styles';
import { connect } from "react-redux";
import DrawerWrapper from '../../commons/rightDrawerWrapper'
import Icon from "react-native-vector-icons/FontAwesome";
import { 
  my_roots,
  root_list_action
} from '../../services/myRoots';
import ReadMore from 'react-native-read-more-text';
import { Button } from 'native-base';
import moment from 'moment';

class MyRoots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      MyRoots: [],
      isLoading: false,
      totalClicks : 0,
      totalViews : 0,
      counts: []
    }
  }
  componentDidMount = async () => {
    console.disableYellowBox = true;
    this.fetchRoots(1);
  }

  fetchRoots = async (type) => {
    this.setState({ type: type, isLoading: true })
    const response = await my_roots(this.props.token,type)
    console.log('response data =======================>',response)
    if(response.status === 1){
      this.setState({ 
        MyRoots: response.data.data, 
        totalClicks : response.data.totalclicks  ,
        totalViews : response.data.totalviews,
        isLoading: false,
        counts: response.data
      })
    }else{
      this.setState({isLoading:false})
      Alert.alert('Error while fetching')
    }
   
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'blue', marginTop: 5 }} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'blue', marginTop: 5 }} onPress={handlePress}>
        Show less
      </Text>
    );
  }

  deleteRoot = (data) => {

    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
            this.setState({ isLoading: true })
            const requestData = {
              root_id : data.r_id,
              action : 'delete'
            }
            const response = await root_list_action(this.props.token,requestData)
            if(response.status === 1){
              Alert.alert('Root deleted successfully.');
              let newData = [];
              this.state.MyRoots.map((item)=>{
                if(item.r_id !== data.r_id){
                  newData.push(item)
                }
              })
              console.log('New Data is',newData)
              this.setState({ 
                MyRoots: newData, 
                isLoading: false
              })
            }
          }},
      ],
      {cancelable: false},
    );

  }

  paushRoot = (data) => {

    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
            this.setState({ isLoading: true })
            const requestData = {
              root_id : data.r_id,
              action : 'pause'
            }
            const response = await root_list_action(this.props.token,requestData);
            console.log('Pause response',response)
            if(response.status === 1){
              Alert.alert('Root paused successfully.');
              let newData = [];
              this.state.MyRoots.map((item)=>{
                 if(item.r_id !== data.r_id){
                   newData.push(item)
                 }
              })
              this.setState({ 
                MyRoots: newData, 
                isLoading: false
              })
            }
          }},
      ],
      {cancelable: false},
    );

    
  }

  activetRoot = (data) => {

    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
            this.setState({ isLoading: true })
            const requestData = {
              root_id : data.r_id,
              action : 'activate'
            }
            const response = await root_list_action(this.props.token,requestData);
            console.log('Active response',response)
            if(response.status === 1){
              Alert.alert('Root activated successfully.');
              let newData = [];
              this.state.MyRoots.map((item)=>{
                 if(item.r_id !== data.r_id){
                   newData.push(item)
                 }
              })
              this.setState({ 
                MyRoots: newData, 
                isLoading: false
              })
            }
          }},
      ],
      {cancelable: false},
    );

    
  }


  render() {
    console.log('this.state.MyRoots', this.state.MyRoots)
    return (
      <DrawerWrapper {...this.props}>
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            {/*Header Component*/}
            <View style={styles.header_container}>
              <View style={styles.header_item}>
                <Text style={styles.header_text_left}>
                  TOTAL CLICKS
                </Text>
                <Text style={styles.header_text_right}>
                  {this.state.totalClicks}
                </Text>
              </View>
              <View style={styles.header_item}>
                <Text style={styles.header_text_left}>
                  TOTAL VIEWS
                </Text>
                <Text style={styles.header_text_right}>
                  {this.state.totalViews}
                </Text>
              </View>
            </View>
            {/*New Root Button*/}
            <View style={styles.addButtonViewStyle} >
              <Button
                onPress={() => this.props.navigation.navigate('PostRoot')}
                style={styles.addButton}>
                <Text style={styles.addButtonTextStyle}>
                    NEW ROOT
                </Text>
              </Button>
            </View>
            {/*Status Picker*/}
            <View style={styles.picker_wrapper}>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) =>
                  this.fetchRoots(itemValue)
                }>
                <Picker.Item label={`Active(${this.state.counts.activeRootCount})`} value={1} />
                <Picker.Item label={`Paused(${this.state.counts.pausedRootCount})`} value={0} />
                <Picker.Item label={`Under Review(${this.state.counts.underReviewRootCount})`} value={2} />
                <Picker.Item label={`Rejected(${this.state.counts.rejectedRootCount})`} value={3} />
                <Picker.Item label={`Draft(${this.state.counts.draftRootCount})`} value={4} />
              </Picker>
            </View>
            {/* Content */}
            <View style={{ marginBottom: 50 }}>
              {
                this.state.isLoading && (<ActivityIndicator size="large" color="#10A2EF" />)
              }
              {this.state.MyRoots.length > 0 ?
                this.state.MyRoots.map((item, index) => {
                  console.log('MyRoots',item)
                  return (
                    <View style={styles.roots_wrapper}>
                      <View key={index} style={styles.roots_individual_wrapper}>
                        <View style={styles.avatarContainer}>
                          <Image 
                            style={styles.image_wrapper} 
                            source={{uri: item.rf_file_name ? item.rf_file_name : ''}} />
                          <Text 
                            onPress={() => this.props.navigation.navigate('RootPage', {
                              isreview:true,
                              token: this.props.token,
                              root_id: item.r_id,
                              user_id: item.r_user_id
                            })}
                          numberOfLines={1}
                          ellipsizeMode='tail'
                          style={styles.titleStyle}>
                            {item.r_title ? item.r_title : ''}
                          </Text>
                        </View>
                        <View style={styles.line} />   
                        {/*items*/}     
                        <View style={styles.itemContainer} >
                        <View style={styles.tableItemView}>
                          <Text style={styles.tableItemTitel}>
                            Published On:
                          </Text>
                            <Text style={styles.tableItemData}>
                              {item.published_date ? item.published_date : ''}
                            </Text>
                          </View>
                          <View style={styles.tableItemView}>
                            <Text style={styles.tableItemTitel}>
                              Price:
                          </Text>
                            <Text style={styles.tableItemData}>
                            ${ item.r_fiixed_price && item.r_fiixed_price.price ? item.r_fiixed_price.price : ''}
                            </Text>
                          </View>
                          <View style={styles.tableItemView}>
                            <Text style={styles.tableItemTitel}>
                              Clicks:
                          </Text>
                            <Text style={styles.tableItemData}>
                              {item.clicks ? item.clicks : 0}
                            </Text>
                          </View>
                          <View style={styles.tableItemView}>
                            <Text style={styles.tableItemTitel}>
                              Views:
                          </Text>
                            <Text style={styles.tableItemData}>
                              {item.views ? item.views : 0}
                            </Text>
                          </View>
                          <View style={styles.tableItemView}>
                            <Text style={styles.tableItemTitel}>
                              Completed Orders:
                          </Text>
                            <Text style={styles.tableItemData}>
                              {item.completed_orders ? item.completed_orders : 0}
                            </Text>
                          </View>
                        </View>        
                        <View style={styles.roots_separator} />
                        <View style={styles.requestBottomViewStyle}>
                          <Text
                            style={[styles.requestBottomButtonStyle]}
                            onPress={() => this.props.navigation.navigate('PostRoot', {
                              requestData: item
                            })}
                          >
                            Edit
                          </Text>
                          {
                            this.state.type === 0 ? 
                            <Text
                            onPress={() => this.activetRoot(item)}
                            style={styles.requestBottomButtonStyle} >
                              Acivate
                            </Text>
                            : null
                          }
                          {
                            this.state.type === 1 ? 
                            <Text
                            onPress={() => this.paushRoot(item)}
                            style={styles.requestBottomButtonStyle} >
                              Pause
                            </Text> 
                            : null
                          }
                          <Text
                          onPress={() => this.deleteRoot(item)}
                          style={styles.requestBottomButtonStyle} >
                            Delete
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }) :
                !this.state.isLoading && (<Text style={{ textAlign: 'center' }}>Nothing yet to show!</Text>)
              }
            </View>
          </ScrollView>
        </View>
      </DrawerWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};


const My_roots = connect(
  mapStateToProps,
  null,
)(MyRoots);

export default My_roots;

