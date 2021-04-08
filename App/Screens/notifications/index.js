import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  CheckBox,
  Dimensions,
  Button,
  Alert, TouchableOpacity
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from "react-native-vector-icons/FontAwesome";

import DrawerWrapper from '../../commons/rightDrawerWrapper';
import { connect } from 'react-redux';

import { notifications, markAsReadNotification, markAllAsReadNotification, rootNotifications } from '../../services/notifications';
import { or } from 'react-native-reanimated';
import moment from 'moment';


const allItems = []
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myNotifications: [],
      loader: true,
      activeSections: [],
      checked: false,
      checkedBox: [],
      rootNotification: [],
      isSelected: false
    };
  }

  componentDidMount = async () => {
    console.disableYellowBox = true;
    this.setState({ loader: true })
    const rootNotificationResponse = await notifications(this.props.token, 0);
    console.log("----- root", rootNotificationResponse);
    this.setState({ rootNotification: rootNotificationResponse.data })
    const response = await notifications(this.props.token, 1);
    console.log("====== simple", response)
    this.setState({ myNotifications: response.data, loader: false });

    let array = []
    this.state.rootNotification.map((item) => {
      allItems.push(item.n_id)
    })
    this.state.myNotifications.map((item) => {
      item.data ? array.push(item.data) : ''
    })
    array.map((item) => {
      item.map((id) => {
        allItems.push(id.n_id)
      })
    })
  };

  loader = () => {
    setTimeout(() => {
      this.setState({ loader: false });
    }, 4000);
    if (this.state.loader) {
      return (
        <View style={[styles.loadercontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#10A2EF" />
        </View>
      );
    } else {
      return (
        <View style={[styles.loadercontainer, styles.horizontal]}>
          <Text>No Notifications</Text>
        </View>
      );
    }
  };



  notifications = (item) => {
    return (
      <>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F7F7F' }}>
          <View style={styles.notificationView}>
            <Text style={{ fontSize: 15, color: '#10A2EF', width: 220 }}>Order {item.o_order_id} - {item.r_title}</Text>
            <Text style={{ fontSize: 15, color: '#10A2EF' }}>Expand/Collapse</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: '#7F7F7F', paddingLeft: 10, paddingBottom: 10 }}>{item.date}</Text>
          </View>
        </View>
      </>
    )
  }
  

  pushInArray = (id, o_id) => {
    if (this.state.checkedBox.indexOf(id)<0){
      this.setState(prevState => ({
        checkedBox: [...prevState.checkedBox, id]
      }))
    }
    else {
      let index = this.state.checkedBox.indexOf(id);
      this.state.checkedBox.splice(index, 1)
      this.setState(prevState => ({
        checkedBox: this.state.checkedBox
      }))
    }
  }
  checkAll = () => {
    if (this.state.checkedBox.length != this.state.rootNotification.length){
      this.state.rootNotification.map((item, index) => {
        this.setState({checkedBox:[]}, () => {
          this.setState(prevState => ({
            checkedBox: [...prevState.checkedBox, item.n_id]
          }))
        })
      })
    }
    else {
      this.setState({checkedBox: []})
    }
  }

  renderContent = section => {
    let sectionData = section.data
    if (!sectionData) {
      sectionData = [];
    }

    return sectionData.map((item) => {
      return (
        <View>
          <View style={styles.boxStyle}>
            <Icon name="close" size={25} color='red' style={{ padding: 5 }} />
            <Text style={{ fontSize: 15, color: '#10A2EF', width: 220 }}>{item.n_title}</Text>
            <CheckBox
              onValueChange={() => this.pushInArray(item.n_id)}
            />
          </View>
          <Text style={{ fontSize: 12, color: '#7F7F7F', paddingLeft: 10, paddingBottom: 10, marginLeft: 25 }}>{item.n_created_at}</Text>
        </View>
      )
    })
  }

  updateSections = activeSections => {
    this.setState({ activeSections: activeSections })
  };

  markAsRead = async () => {
    if (!this.state.checkedBox) {
      return Alert.alert("Please select at least one notification")
    } else {
      let response = await markAsReadNotification(this.props.token, this.state.checkedBox)
      if (response.status == 1) {
        return Alert.alert("Mark as read successfully")
      } else {
        return Alert.alert("Something went wrong please try again later")
      }
    }
  }

  markAllAsRead = async () => {
    let response = await markAllAsReadNotification(this.props.token, allItems)
    console.log("=========>>>>>>>>>>", response)
    if (response.status == 1) {
      return Alert.alert("Mark all as read successfully")
    } else {
      return Alert.alert("Something went wrong please try again later")
    }
  }
  
  handleCheckBox = () => {
    // this.setState({ isSelected: !this.state.isSelected })
  }

  render() {
    console.log(this.state.checkedBox)
    return (
      <DrawerWrapper {...this.props}>
        <View style={{ marginBottom: 20 }}>
          <ScrollView>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Icon name="bullhorn" size={30} color='black' style={{ padding: 5 }} />
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Notifications</Text>
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <View style={styles.readBox}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.button} onPress={() => { this.markAsRead() }}><Text style={styles.text}>Mark as read</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { marginLeft: 10 }]} onPress={() => { this.markAllAsRead() }}><Text style={styles.text}>Mark all as read</Text></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    value={this.state.checked}
                    title="Check All"
                    onValueChange={() => {this.setState({ checked: !this.state.checked }); this.checkAll()}}
                  />
                  <Text style={{ fontSize: 15, marginTop: 5 }}>Check All</Text>
                </View>
              </View>
            </View>
            {this.state.rootNotification.length > 0
              &&
              this.state.rootNotification.map((item, index) => {
                return (
                  <View style={{ borderBottomColor: '#7F7F7F', borderBottomWidth: 1 }}>
                    <View style={styles.boxStyle}>
                      <Icon name="gavel" size={50} color='green' style={{ padding: 5, marginLeft: 15, transform: [{ rotateY: '180deg' }] }} />
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 15, color: '#10A2EF', width: 220, marginLeft: 15 }}>{item.n_title}</Text>
                        <Text style={{ fontSize: 12, color: '#7F7F7F', paddingLeft: 10, marginLeft: 5 }}>{item.n_created_at}</Text>
                      </View>
                    </View>
                    <CheckBox
                      style={{ marginLeft: 15 }}
                      onValueChange={() => this.pushInArray(item.n_id)}
                      value={this.state.checkedBox.includes(item.n_id)}
                    />
                  </View>
                )
              })
            }
            {this.state.myNotifications.length > 0
              &&
              <Accordion
                activeSections={this.state.activeSections}
                sections={this.state.myNotifications}
                renderHeader={this.notifications}
                renderContent={this.renderContent}
                onChange={this.updateSections}
              />}
          </ScrollView>
        </View>
      </DrawerWrapper>
    );
  }
}


const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};

const Notifications_Screen = connect(mapStateToProps, null)(Notifications);
export default Notifications_Screen;

const styles = StyleSheet.create({
  inboxEach: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'column',
    borderRadius: 28,
    borderColor: '#2EAE92',
    borderWidth: 1,
  },
  loadercontainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  avatarContainer: {
    height: 56,
    width: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderColor: '#2EAE92',
    borderWidth: 2,
  },
  avatar: {
    flex: 1,
    height: null,
    width: null,
  },
  userName: {
    fontSize: 14,
    color: '#748F9E',
  },
  message: {
    marginTop: 5,
    fontSize: 12,
    color: '#AFB3BF',
  },
  time: {
    fontSize: 12,
    color: '#B2B7C2',
  },
  separator: {
    borderBottomColor: '#D1E0E8',
    borderBottomWidth: 1,
    width: '100%',
  },
  seeAll: {
    fontSize: 14,
    color: '#10A2EF',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationView: {
    flexDirection: 'row',
    padding: 10,
  },
  boxStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  readBox: {
    width: Dimensions.get('window').width / 1.2,
    borderColor: '#748F9E',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    alignContent: 'center',
    padding: 10,
    alignItems: 'center'
  },
  button: {
    height: 35,
    width: 120,
    backgroundColor: '#10a2ef',
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 7
  }
});
