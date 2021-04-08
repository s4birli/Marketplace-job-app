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
  Alert
} from 'react-native';
import { Button } from 'native-base';
import styles from './index.styles';
import { connect } from "react-redux";
import DrawerWrapper from '../../commons/rightDrawerWrapper'
import Icon from "react-native-vector-icons/FontAwesome";
import { my_favorites , remove_favorites} from '../../services/myFavorites'

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'active',
      MyFavorites: [],
      isLoading: false
    }
  }

  componentDidMount = async () => {
    console.disableYellowBox = true;
    this.setState({ isLoading: true })
    this.fetchRequests();
  }

  fetchRequests = async () => {
    const response = await my_favorites(this.props.token)
    if(response.status === 1){
      console.log('new',response.data)

      this.setState({ MyFavorites : response.data, isLoading: false })
    }else{
      this.setState({isLoading : false})
    }
  }

  handleRemoveFavorite = async (token,fav_id) => {
    this.setState({isLoading : true})
    const response = await remove_favorites(token,fav_id)
    if(response.status === 1){
      console.log('new')
      const newFavorites = await this.state.MyFavorites.filter((item) => {
        return item.f_id !== fav_id
      })
      this.setState({ MyFavorites : newFavorites , isLoading: false })
    }else{
      Alert.alert('Error while remove favorite.');
      this.setState({isLoading : false})
    }
  }

  render() {
    return (
      <DrawerWrapper {...this.props}>
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
          <View style={{ marginBottom : 50}}>
              {
                this.state.isLoading && (<ActivityIndicator size="large" color="#10A2EF" />)
              }
              { this.state.MyFavorites.length > 0 ?
                this.state.MyFavorites.map((item, index) => {
                  return (
                    <View key={index} style={styles.roots_wrapper}>
                      <View style={styles.roots_individual_wrapper}>
                        <TouchableHighlight onPress={()=> this.props.navigation.navigate('RootPage',{
                          isreview:true,
                          token: this.props.token,
                          root_id: item.root_id,
                          user_id: item.user_id
                        })}>
                          <>
                            <View style={styles.profileViewStyle} >
                                <Image
                                  style={styles.profileImageStyle}
                                  source={{ uri: item.r_root_image }}
                                />
                                <Text style={styles.profilenameStyle}>
                                  {item.r_title}
                                </Text>
                            </View>
                            <View style={styles.tableItemView}>
                              <Text style={styles.tableItemTitel}>
                                Price :
                            </Text>
                              <Text style={styles.tableItemData}>
                                ${JSON.parse(item.r_fiixed_price).price}.00
                              </Text>
                            </View>
                            <View style={styles.tableItemView}>
                              <Text style={styles.tableItemTitel}>
                                Delivery :
                            </Text>
                              <Text style={styles.tableItemData}>
                                {JSON.parse(item.r_fiixed_price).max_days} Days
                              </Text>
                            </View>
                          </>
                        </TouchableHighlight>
                        <View style={styles.roots_separator} />
                        <TouchableHighlight
                         onPress={() => this.handleRemoveFavorite(this.props.token,item.f_id)}
                         style={styles.requestBottomViewStyle}>
                            <Text style={styles.requestBottomButtonStyle} >
                              Delete
                            </Text>
                        </TouchableHighlight>
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


const My_favorites = connect(
  mapStateToProps,
  null,
)(MyFavorites);

export default My_favorites;

