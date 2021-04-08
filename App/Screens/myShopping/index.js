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
  Picker,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { connect } from "react-redux";
import DrawerWrapper from '../../commons/rightDrawerWrapper'

import { my_shopping } from '../../services/myShopping'
import Details from './details';
let offsetNum = 5;
class MyShopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'active',
      myShopping: [],
      counts: [],
      loader: true,
      message: '',
      noMore: false
    }
  }
  componentDidMount = async () => {
    console.disableYellowBox = true;

    const response = await my_shopping(this.props.token, 'active')
    console.log("response===========",response)
    this.setState({ counts: response.data, loader: false })
    this.setState({ myShopping: response.data.orders }, () => {
      if (this.state.myShopping.length<5){
        this.setState({noMore:true})
      }
    })

    const socket = global.socket;
    socket.on('user_message', (data) => {
      const userMessage = JSON.parse(data)
      if (userMessage.type == "user_login") {
        this.state.myShopping.map((item, index) => {
          if (item.o_buyer_id == userMessage.data.user_id) {
            item.is_online = 1
            let index = this.state.myShopping.findIndex((item) => {
              return item.o_buyer_id == userMessage.data.user_id
            })
            let newArr = [...this.state.myShopping];
            newArr[index] = item;
            this.setState({ myShopping: newArr})
          }
        })
      } else if (userMessage.type == "user_logout") {
        this.state.myShopping.map((item, index) => {
        if (item.o_buyer_id == userMessage.data.user_id) {
          item.is_online = 0
          let index = this.state.myShopping.findIndex((item) => {
            return item.o_buyer_id == userMessage.data.user_id
          })
          let newArr = [...this.state.myShopping];
          newArr[index] = item;
          this.setState({ myShopping: newArr})
        }
      })
      }
    })
  }

  fetchShopping = async (type) => {
    this.setState({ type: type })
    const response = await my_shopping(this.props.token, type)
    this.setState({ myShopping: response.data.orders }, () => {
      if (this.state.myShopping.length<5){
        this.setState({noMore:true})
      }
      else{
        this.setState({noMore:false})
      }
    })
  }
  loadMore = async() => {
    if (this.state.message == "no data") {
      this.setState({noMore:true})
      return;
    }
    else{
      const response = await my_shopping(this.props.token, this.state.type, offsetNum)
      this.setState({ counts: response.data, loader: false, message:response.message})
      if (response.status == 1){
        offsetNum = offsetNum+5;
        this.setState(prevState => ({
          myShopping: [...prevState.myShopping, ...response.data.orders]
        }))
      }
    }
  }

  showCard = (item, total) => {
    console.log("::::::", item)
    if (this.state.type == "active") {
      return (
        <View style={styles.cardView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10 }}>
            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload/profile/' + item.profile }} />
            <View style={item.is_online == 1 ? styles.isOnline : styles.isOffline}></View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>
              {item.r_title}({item.o_order_id})
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Due On:
            </Text>
            <Text style={styles.dataText}>
              {item.due_on}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Amount:
            </Text>
            <Text style={styles.dataText}>
              ${total}
            </Text>
          </View>
        </View>
      )
    } else if (this.state.type == "late") {
      return (
        <View style={styles.cardView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10 }}>
            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload/profile/' + item.profile }} />
            <View style={item.is_online == 1 ? styles.isOnline : styles.isOffline}></View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>
              {item.r_title}({item.o_order_id})
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Sold on:
            </Text>
            <Text style={styles.dataText}>
              {item.sold_on}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Late:
            </Text>
            <Text style={styles.dataText}>
              {item.late}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Amount:
            </Text>
            <Text style={styles.dataText}>
              ${total}
            </Text>
          </View>
        </View>
      )
    } else if (this.state.type == 'delivered') {
      return (
        <View style={styles.cardView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10 }}>
            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload/profile/' + item.profile }} />
            <View style={item.is_online == 1 ? styles.isOnline : styles.isOffline}></View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>
              {item.r_title}({item.o_order_id})
                          </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Delivered On:
            </Text>
            <Text style={styles.dataText}>
              {item.delivered_on}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Amount:
            </Text>
            <Text style={styles.dataText}>
              ${total}
            </Text>
          </View>
        </View>
      )
    } else if (this.state.type == "completed") {
      return (
        <View style={styles.cardView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10 }}>
            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload/profile/' + item.profile }} />
            <View style={item.is_online == 1 ? styles.isOnline : styles.isOffline}></View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>
              {item.r_title}({item.o_order_id})
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Sold on:
            </Text>
            <Text style={styles.dataText}>
              {item.sold_on}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Completed On:
            </Text>
            <Text style={styles.dataText}>
              {item.completed_on}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Amount:
            </Text>
            <Text style={styles.dataText}>
              ${total}
            </Text>
          </View>
        </View>
      )
    } else if (this.state.type == "cancelled") {
      return (
        <View style={styles.cardView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10 }}>
            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload/profile/' + item.profile }} />
            <View style={item.is_online == 1 ? styles.isOnline : styles.isOffline}></View>
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 10 }}>
              {item.r_title}({item.o_order_id})
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Cancelled On:
            </Text>
            <Text style={styles.dataText}>
              {item.cancelled_on}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Text style={styles.headText}>
              Amount:
            </Text>
            <Text style={styles.dataText}>
              ${total}
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <DrawerWrapper {...this.props}>
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingVertical: 15 }}>
            {this.state.loader ? (<ActivityIndicator size="large" color="#10A2EF" />) : <>
              {this.state.counts ? <View style={styles.pickerUp}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>TOTAL SPENT</Text>
                  <Text style={{ color: '#10A2EF' }}>${this.state.counts.totalSpent}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>ACTIVE ORDERS</Text>
                  <Text style={{ color: '#10A2EF' }}>{this.state.counts.activeOrderCount}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>COMPLETED ORDERS</Text>
                  <Text style={{ color: '#10A2EF' }}>{this.state.counts.completedOrderCount}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>AVAILABLE FUNDS</Text>
                  <Text style={{ color: '#10A2EF' }}>$0</Text>
                </View>
              </View> :
                null
              }
              <View style={styles.picker}>
                <Picker
                  selectedValue={this.state.type}
                  onValueChange={(itemValue, itemIndex) =>
                    this.fetchShopping(itemValue)
                  }>
                  <Picker.Item label={`Active(${this.state.counts.activeOrderCount})`} value="active" />
                  <Picker.Item label={`Late(${this.state.counts.lateOrderCount})`} value="late" />
                  <Picker.Item label={`Delivered(${this.state.counts.deliveredOrderCount})`} value="delivered" />
                  <Picker.Item label={`Completed(${this.state.counts.completedOrderCount})`} value="completed" />
                  <Picker.Item label={`Cancelled(${this.state.counts.canclledOrderCount})`} value="cancelled" />
                </Picker>
              </View>

              {this.state.myShopping && !this.state.myShopping.length > 0 &&
                <>
                  <View style={[styles.cardView, { justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}>
                    <Text style={[styles.transaction_date, { padding: 30, marginTop: 0 }]}>Nothing yet to show !</Text>
                  </View>
                </>
              }

              <View>
                {this.state.myShopping && this.props.type == 0 && this.state.myShopping.map((item, index) => {
                  let total = item.o_amount + item.o_processing_fees
                  return (
                    <>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('OrderDetails', { orderDetails: item }) }}>
                      {
                        this.showCard(item, total)
                      }
                    </TouchableOpacity>
                   
                    </>
                  );
                })}
              </View>
              {!this.state.noMore&&
              <View style={styles.loadMoreView}>
                <TouchableOpacity onPress={() => this.loadMore()} style={styles.loadMoreBT}>
                  <Text style={styles.loadMoreText}>
                    LOAD MORE
                  </Text>
                </TouchableOpacity>
              </View>
              }
              <View>
                {this.state.myShopping && this.state.myShopping.orders && this.props.type == 1 && this.state.myShopping.orders.map((item, index) => {
                  let total = item.o_amount + item.o_processing_fees
                  return (
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('OrderDetails', { orderDetails: item }) }}>
                      <View style={styles.cardView}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10 }}>
                          <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload/profile/' + item.profile }} />
                          <View style={item.is_online == 1 ? styles.isOnline : styles.isOffline}></View>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={{ height: 1, width: Dimensions.get('window').width / 1.2, backgroundColor: '#748F9E', padding: 0 }}></View>
                        <View>
                          <Text style={{ fontSize: 20, color: 'black', paddingLeft: 10 }}>
                            {item.r_title}({item.o_order_id})
                      </Text>
                          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={styles.headText}>
                              Due On:
                      </Text>
                            <Text style={styles.dataText}>
                              {item.due_on}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                            <Text style={styles.headText}>
                              Amount:
                      </Text>
                            <Text style={styles.dataText}>
                              ${total}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })

                }
              </View>
            </>}
          </ScrollView>
        </>
      </DrawerWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    type: state.LoginUser.type
  };
};


const My_shopping = connect(
  mapStateToProps,
  null,
)(MyShopping);
export default My_shopping;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  graph_wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: '#EDF1F4',
  },
  picker: {
    height: 50,
    width: Dimensions.get('window').width / 1.2,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 5
  },
  pickerUp: {
    width: Dimensions.get('window').width / 1.2,
    borderWidth: 1,
    borderColor: '#748F9E',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  clicks_text_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clicks_view_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  click_views_text: {
    padding: 10,
    color: '#748F9E',
  },
  click_views_text_number: {
    color: '#10A2EF',
  },
  dashed_separator: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: '#B2B9D1',
    marginVertical: 5,
  },
  dropdown_selector_wrapper: {
    padding: 5,
    alignItems: 'flex-end',
  },
  dropdown_selector: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 15,
    borderColor: '#E6E6FF',
  },
  selector_text: {
    color: '#748F9E',
  },
  chart_wrapper: {
    flex: 1,
    height: 300,
    marginVertical: 15,
    borderRadius: 15
  },
  button_wrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 35,
    width: '70%',
    marginVertical: 10,
  },
  button_text: {
    textAlign: 'center',
  },
  roots_wrapper: {
    // borderWidth: 1,
    // borderRadius: 10,
    // marginBottom: 50,
    // borderColor: '#EDF1F4',
  },
  root_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 15,
  },
  roots_separator: {
    borderWidth: 1,
    marginVertical: 5,
    borderColor: '#E6E6FF',
  },
  roots_individual_wrapper: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_wrapper: {
    backgroundColor: 'cyan',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  cardView: {
    width: Dimensions.get('window').width / 1.2,
    borderColor: '#748F9E',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10
  },
  headText: {
    fontWeight: 'bold',
    color: '#748f9e'
  },
  headTextUp: {
    color: '#748f9e'
  },
  dataText: {
    color: '#748f9e'
  },
  isOnline: {
    height: 15,
    width: 15,
    position: 'absolute',
    backgroundColor: '#2EC09C',
    zIndex: 100,
    marginTop: 6,
    marginLeft: 40,
    borderRadius: 100
  },
  isOffline: {
    height: 15,
    width: 15,
    marginTop: 6,
    marginLeft: 40,
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 1,
    borderRadius: 100
  },
  loadMoreBT: {
    width: 300,
    height: 40,
    backgroundColor: '#10a2ef',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5
  },
  loadMoreText:{
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  loadMoreView: {
    width: Dimensions.get('window').width / 1.2,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderWidth: 1,
    borderRadius: 10, 
    marginBottom: 10,
    borderColor: '#EDF1F4'
  }
});







// order/shopping-list
// root-generator name
// online status
