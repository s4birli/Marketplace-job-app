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
  Picker
} from 'react-native';
import { Button } from 'native-base';
import styles from './index.styles';
import { connect } from "react-redux";
import DrawerWrapper from '../../commons/rightDrawerWrapper'
import Icon from "react-native-vector-icons/FontAwesome";
import { my_requests } from '../../services/myRequests';
import ReadMore from 'react-native-read-more-text';

class MyRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      MyRequests: [],
      isLoading: false,
      counts: []
    }
  }
  componentDidMount = async () => {
    console.disableYellowBox = true;
    this.fetchRequests(1);
  }

  fetchRequests = async (type) => {
    this.setState({ type: type, isLoading: true })
    const response = await my_requests(this.props.token, type)
    this.setState({ counts: response.data, MyRequests: response.data.data, isLoading: false })
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


  render() {
    console.log('this.state.MyRequests', this.state.MyRequests)
    return (
      <DrawerWrapper {...this.props}>
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={styles.addButtonViewStyle} >
              <Button
                onPress={() => this.props.navigation.navigate('EditRequest')}
                style={styles.addButton}>
                <Text style={styles.addButtonTextStyle}>
                  NEW REQUEST
                </Text>
              </Button>
            </View>
            <View style={styles.button_wrapper}>
              <Picker
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) =>
                  this.fetchRequests(itemValue)
                }>
                <Picker.Item label={`Active(${this.state.counts.activeRequestCount})`} value={1} />
                <Picker.Item label={`Under Review(${this.state.counts.underReviewRequest})`} value={2} />
                <Picker.Item label={`Paused(${this.state.counts.pausedRequestCount})`} value={3} />
                <Picker.Item label={`Expired(${this.state.counts.expiredRequest})`} value={4} />
                <Picker.Item label={`Rejected(${this.state.counts.rejectedRequest})`} value={0} />
              </Picker>
            </View>
            <View style={{ marginBottom: 50 }}>
              {
                this.state.isLoading && (<ActivityIndicator size="large" color="#10A2EF" />)
              }
              {this.state.MyRequests.length > 0 ?
                this.state.MyRequests.map((item, index) => {
                  return (
                    <View style={styles.roots_wrapper}>
                      <View key={index} style={styles.roots_individual_wrapper}>
                        <Text style={styles.titleStyle}>
                          {item.subcategory}
                        </Text>
                        <ReadMore
                          numberOfLines={3}
                          renderTruncatedFooter={this._renderTruncatedFooter}
                          renderRevealedFooter={this._renderRevealedFooter}
                        >
                          <Text
                            style={styles.descriptionStyle} >
                            {item.description}
                          </Text>
                        </ReadMore>
                        <TouchableHighlight style={styles.fileViewStyle}
                        // onPress={this.toggleModal()}
                        >
                          <>
                            <Icon
                              name="file"
                              color='gray'
                              size={20}
                            />
                            <Text style={styles.fileNameStyle}>
                              {(item.files).split("/")[5]}
                            </Text>
                          </>
                        </TouchableHighlight>
                        <View style={styles.tableItemView}>
                          <Text style={styles.tableItemTitel}>
                            Delivery :
                        </Text>
                          <Text style={styles.tableItemData}>
                            {item.delivery}
                          </Text>
                        </View>
                        <View style={styles.tableItemView}>
                          <Text style={styles.tableItemTitel}>
                            Budget :
                        </Text>
                          <Text style={styles.tableItemData}>
                            ${item.budget_from} - ${item.budget_to}
                          </Text>
                        </View>
                        <View style={styles.tableItemView}>
                          <Text style={styles.tableItemTitel}>
                            See Less
                        </Text>
                          <Text style={styles.tableItemData}>
                            Since 12 days
                        </Text>
                        </View>
                        <View style={styles.roots_separator} />
                        <View style={styles.requestBottomViewStyle}>
                          <Text
                            style={[styles.requestBottomButtonStyle, styles.editTextStyle]}
                            onPress={() => this.props.navigation.navigate('EditRequest', {
                              requestData: item
                            })}
                          >
                            Edit
                          </Text>
                          <Text style={styles.requestBottomButtonStyle} >
                            Delete
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }) :
                !this.state.isLoading && (<View style={[styles.cardView, { justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}>
                <Text style={[styles.transaction_date, { padding: 30, marginTop: 0 }]}>Nothing yet to show !</Text>
              </View>)
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


const My_requests = connect(
  mapStateToProps,
  null,
)(MyRequests);

export default My_requests;

