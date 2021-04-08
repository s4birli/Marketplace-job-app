import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Picker
} from 'react-native';

import Account from './account';
import Security from './security';
import Payment from './payment';
import Notification from './notification';
import Header from '../../../commons/header';
import DrawerWrapper from '../../../commons/rightDrawerWrapper';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: 'Account',
    };
  }
  renderScreen = () => {
    switch (this.state.screen) {
      case 'Notifications':
        return <Notification />;
      case 'Payments':
        return <Payment />;
      case 'Security':
        return <Security />;
      case 'Account':
        return <Account />;
      default:
        return <Account />;
    }
  };
  render() {
    return (
      <DrawerWrapper {...this.props}>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.picker}>
              <Picker
                selectedValue={this.state.screen}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ screen: itemValue })
                }>
                <Picker.Item label="Account" value="account" />
                <Picker.Item label="Security" value="Security" />
                <Picker.Item label="Withdraw Details" value="Payments" />
              </Picker>
            </View>
            <React.Fragment>{this.renderScreen()}</React.Fragment>
            <View style={{ height: 80 }} />
          </ScrollView>
      </DrawerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingVertical: 10,
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
    width: Dimensions.get('window').width / 1.1,
    borderWidth: 1,
    borderColor: '#7F7F7F',
    borderRadius: 50,
    paddingLeft:10
  }
});

export default EditProfile;
