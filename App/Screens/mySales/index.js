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
  ActivityIndicator,
  I18nManager
} from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { connect } from "react-redux";
import DrawerWrapper from '../../commons/rightDrawerWrapper'
import { getUserBalance } from '../../services/home/index'

import { my_sales } from '../../services/mySales'
let offsetNum = 5;
class MySales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'active',
      mySales: [],
      counts: [],
      balance: '',
      loader: true,
      noMore: false
    }
  }


  componentDidMount = async () => {
    console.disableYellowBox = true;
    let balance = await getUserBalance(this.props.token)
    const response = await my_sales(this.props.token, 'active')
    console.log("balance", balance)
    this.setState({ balance: balance })
    console.log('Responseeeeee====================', response.data)
    this.setState({ counts: response.data, loader: false })
    this.setState({ mySales: response.data.orders }, () => {
      if (this.state.mySales.length<5){
        this.setState({noMore:true})
      }
      else{
        this.setState({noMore:false})
      }
    })
  }

  fetchsales = async (type) => {
    this.setState({ type: type })
    console.log("typeeeeeeeeeeeee", type)
    const response = await my_sales(this.props.token, type)
    console.log("=======>>>>>>>>", response)
    this.setState({ mySales: response.data.orders }, () => {
      if (this.state.mySales.length<5){
        this.setState({noMore:true})
      }
      else{
        this.setState({noMore:false})
      }
    })
  }

  loadMore = async() => {
    if (this.state.message == "no data") {
      console.log(this.state.message)
      this.setState({noMore:true})
      return;
    }
    else{
      const response = await my_sales(this.props.token, this.state.type, offsetNum)
      console.log('llllllllllllllllllll0', response)
      this.setState({ counts: response.data, loader: false, message:response.message})
      if (response.status == 1){
        offsetNum = offsetNum+5;
        this.setState(prevState => ({
          mySales: [...prevState.mySales, ...response.data.orders]
        }))
      }
    }
  }

  showCard = (item) => {
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
              ${item.o_amount}
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
              ${item.o_amount}
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
              ${item.o_amount}
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
              ${item.o_amount}
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
              ${item.o_amount}
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
          <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', paddingVertical: 15 }}>
          {this.state.loader ? (<ActivityIndicator size="large" color="#10A2EF" />) : <>
            {this.state.counts &&
              <View style={styles.pickerUp}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>EARNED</Text>
                  <Text style={{ color: '#10A2EF' }}>${this.state.counts.earned}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>WITHDRAWALS</Text>
                  <Text style={{ color: '#10A2EF' }}>${!this.state.counts.withdrawals ? "0" : this.state.counts.withdrawals}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>USED FOR ORDERS</Text>
                  <Text style={{ color: '#10A2EF' }}>${this.state.counts.usedForOrders}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>PENDING CLEARANCE</Text>
                  <Text style={{ color: '#10A2EF' }}>${this.state.counts.pendingClerance}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.headTextUp}>AVAILABLE FUNDS</Text>
                  <Text style={{ color: '#10A2EF' }}>${this.state.balance.data}</Text>
                </View>
              </View>}

            <View style={styles.picker}>
              <Picker
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) =>
                  this.fetchsales(itemValue)
                }>
                <Picker.Item label={`Active(${this.state.counts.activeOrderCount})`} value="active" />
                <Picker.Item label={`Late(${this.state.counts.lateOrderCount})`} value="late" />
                <Picker.Item label={`Delivered(${this.state.counts.deliveredOrderCount})`} value="delivered" />
                <Picker.Item label={`Completed(${this.state.counts.completedOrderCount})`} value="completed" />
                <Picker.Item label={`Cancelled(${this.state.counts.canclledOrderCount})`} value="cancelled" />
              </Picker>
            </View>

            {this.state.mySales && !this.state.mySales.length > 0 &&
              <>
                <View style={[styles.cardView, { justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}>
                  <Text style={[styles.transaction_date, { padding: 30, marginTop: 0 }]}>Nothing yet to show !</Text>
                </View>
              </>
            }

            {this.state.mySales && this.state.mySales.map((item, index) => {
              return (
                <>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('OrderDetails', { orderDetails: item, from: 'sales' }) }}>
                  {
                    this.showCard(item)
                  }
                </TouchableOpacity>
                </>
              );
            })}
            </>}
            {!this.state.noMore &&
            <View style={styles.loadMoreView}>
              <TouchableOpacity onPress={() => this.loadMore()} style={styles.loadMoreBT}>
                <Text style={styles.loadMoreText}>
                  LOAD MORE
                </Text>
              </TouchableOpacity>
            </View>
            }
          </ScrollView>
        </>
      </DrawerWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};


const My_sales = connect(
  mapStateToProps,
  null,
)(MySales);
export default My_sales;


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  graph_wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: '#EDF1F4',
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
  click_views_text_number: {
    color: '#10A2EF',
  },
  pickerUp: {
    width: Dimensions.get('window').width / 1.2,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
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
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 50,
    borderColor: '#EDF1F4',
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
    borderColor: '#DDD',
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
