/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";

import { payments, paymentClearance } from '../../services/payments/payments'
import moment from 'moment';


class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      clearance: []
    }
  }
  componentDidMount = async () => {
    console.disableYellowBox = true;
    const clearanceResponse = await paymentClearance(this.props.token)
    this.setState({ clearance: clearanceResponse.data })
    console.log("payment clearance: ", clearanceResponse)

    const response = await payments(this.props.token)
    this.setState({ payments: response.data })
    console.log('Responseeeeee', response)
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>Pending Clearance</Text>
        {
          this.state.clearance.length > 0 ? this.state.clearance.map((item, index) => {
            return (
              <View>
                <View style={styles.cardView}>
                  <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                      <Text style={styles.headText}>
                        Buyer:
                      </Text>
                      <Text style={styles.dataText}>
                        {' ' + item.buyer}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                      <Text style={styles.headText}>
                        Order:
                      </Text>
                      <Text style={styles.dataTextTitle}>
                        {' ' + item.r_title}(#{item.o_order_id})
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                      <Text style={styles.headText}>
                        Completed On:
                      </Text>
                      <Text style={styles.dataText}>
                        {' ' + item.completed}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                      <Text style={styles.headText}>
                        Clearance:
                      </Text>
                      <Text style={styles.dataText}>
                        {' ' + item.clearance}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                      <Text style={styles.headText}>
                        Amount:
                      </Text>
                      <Text style={styles.dataText}>
                        {' ' + item.o_amount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          }) :
            (
              <View style={[styles.cardView, { justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}>
                <Text style={[styles.transaction_date, { padding: 30, marginTop: 0 }]}>Nothing yet to show !</Text>
              </View>
            )
        }

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pending Withdrawal</Text>
        {this.state.payments.length > 0 ? this.state.payments.map((item, index) => {
          console.log(new Date(moment.unix(item.w_created_at)))
          let fullDate = new Date(moment.unix(item.w_created_at));
          let realDate = moment(fullDate).format('lll')
          return (
            <View>
              <View style={styles.cardView}>
                <View style={{ padding: 10 }}>
                  <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <Text style={styles.headText}>
                      Date:
                      </Text>
                    <Text style={styles.dataText}>
                      {/* {' ' + item.w_updated_at} */}
                      {' '+ realDate}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <Text style={styles.headText}>
                      Amount:
                      </Text>
                    <Text style={styles.dataText}>
                      {'+$' + item.w_amount}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <Text style={styles.headText}>
                      Type Of Payment:
                      </Text>
                    <Text style={styles.dataText}>
                      {' ' + item.type}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <Text style={styles.headText}>
                      Status:
                      </Text>
                    <Text style={styles.dataText}>
                      {' ' + item.w_status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }) : (
            <View style={[styles.cardView, { justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}>
              <Text style={[styles.transaction_date, { padding: 30, marginTop: 0 }]}>Nothing yet to show !</Text>
            </View>
          )}

      </ScrollView>
    );
  }

};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};


const Payments_Screen = connect(
  mapStateToProps,
  null,
)(Payments);
export default Payments_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardView: {
    width: Dimensions.get('window').width / 1.2,
    borderColor: '#748F9E',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10
  },
  transaction_wrapper: {
    height: 150,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: '#EDF1F4',
    marginVertical: 1
  },
  transaction_date: {
    color: '#AEAEAE',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20
  },
  headText: {
    fontWeight: 'bold',
    color: '#748f9e'
  },
  dataText: {
    color: '#748f9e',
  },
  dataTextTitle: {
    color: '#748f9e',
    width: 200
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
});
