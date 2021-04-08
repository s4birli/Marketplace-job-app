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
  TouchableOpacity,
  Picker,
  Dimensions
} from 'react-native';
import Header from '../../commons/header';
import Transaction from './transaction';
import Withdraw from './withdraw';
import Payments from './payments';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import { getUserBalance } from '../../services/home/index'
import { connect } from 'react-redux';

class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: 'Payments',
      balance: ''
    };
  }
  
  componentDidMount = async () => {
    console.disableYellowBox = true;
    let balance = await getUserBalance(this.props.token)
    console.log("balance", balance)
    this.setState({ balance: balance })
  };

  screen = () => {
    if (this.state.screen == 'Transaction') {
      return <Transaction {...this.props}/>;
    } else if (this.state.screen == 'Withdraw') {
      return <Withdraw />;
    } else {
      return <Payments />;
    }
  };

  render() {
    return (
      <DrawerWrapper {...this.props}>
        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', padding: 10 }}>
          <ScrollView style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>My Payments</Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#2ec09c', marginTop: 5, textAlign: 'right' }}>
                Current Balance: ${this.state.balance.data}</Text>
            </View>
            <View style={styles.picker}>
              <Picker
                selectedValue={this.state.screen}
                style={{ height: 50, width: Dimensions.get('window').width / 1.2, }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ screen: itemValue })
                }>
                <Picker.Item label="Payments" value="Payments" />
                <Picker.Item label="Transaction" value="Transaction" />
                <Picker.Item label="Withdraw" value="Withdraw" />
              </Picker>
            </View>
            <React.Fragment>{this.screen()}</React.Fragment>
          </ScrollView>
        </View>
      </DrawerWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    profileData: state.userProfile.profiledata,
  };
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header_wrapper: {
    padding: 20,
  },
  header_text: {
    textAlign: 'center',
    color: '#2EC09C',
    fontSize: 18,
  },
  button: {
    padding: 15,
    backgroundColor: '#10A2EF',
    borderRadius: 50,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  picker: {
    height: 50,
    width: Dimensions.get('window').width / 1.2,
    borderWidth: 1,
    borderColor: '#748F9E',
    borderRadius: 50
  },
});
export default connect(mapStateToProps)(Payment);
