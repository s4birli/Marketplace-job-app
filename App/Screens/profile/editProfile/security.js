import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  CheckBox,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import config from '../../../config'
import Icon from "react-native-vector-icons/FontAwesome";

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      new_password: '',
      spin: false,
      passCapital: false,
      passSpecial: false,
      passNumber: false,
      passChar: false,
      checkPassword: false,
      checked: 'first',
      password: '',
      passChecked: false,
      showPassword: false,
      showNewPassword: false
    };
  }

  changeHandler = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onSubmit = async () => {
    if(this.state.passChecked){
      this.setState({spin: true});
      let response = await fetch(config.change_password + '?old_password=' + this.state.old_password + '&password=' + this.state.password, {
        method: 'POST',
        headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': this.props.login.userToken,
        },
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log('Change Password Request', json);
          return json;
        });
  
      if (response.status == 1) {
        this.setState({spin: false});
        ToastAndroid.showWithGravityAndOffset(
          response.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        this.setState({spin: false});
        ToastAndroid.showWithGravityAndOffset(
          response.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }else{ 
      ToastAndroid.showWithGravityAndOffset(
        "Please Enter Correct Password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  checkPassword = (value) => {
    if (!value) {
      this.setState({
        checkPassword: false,
        passCapital: false,
        passChar: false,
        passNumber: false,
        passSpecial: false,
      })
    }
    this.setState({ checkPassword: true, password: value })
    const capitalRegex = RegExp(
      /[A-Z]/m
    )
    const oneNumber = RegExp(
      /\d/gm
    )
    const specialChar = RegExp(
      /[^a-zA-Z0-9]/gm
    )
    const eightChar = RegExp(
      /^[a-zA-Z]\w{8}$/
    )
    if (capitalRegex.test(value)) {
      this.setState({ passCapital: true })
    }
    if (oneNumber.test(value)) {
      this.setState({ passNumber: true })
    }
    if (specialChar.test(value)) {
      this.setState({ passSpecial: true })
    }
    if (value.length >= 8) {
      this.setState({ passChar: true })
    }
    if(this.state.passCapital && this.state.passNumber && this.state.passSpecial && this.state.passChar){
      this.setState({passChecked: true})
    }
  }

  render() {
    return (
      <View>
        {/* <TextInput
          secureTextEntry
          placeholder="Current Password"
          onChangeText={text => {
            this.changeHandler('old_password', text);
          }}
          style={styles.input}
        /> */}
        <View style={[styles.input, { paddingLeft: 2 }]}>
          <TextInput placeholder="Current Password" style={{ flex: 5 }} secureTextEntry={this.state.showPassword ? false : true} onChangeText={(text) => this.changeHandler('old_password', text)}  />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}>
            {!this.state.showPassword ?
              <Icon
                name="eye-slash"
                color='#E0E6EE'
                size={20} /> :
              <Icon
                name="eye"
                color='#E0E6EE'
                size={20} />}
          </TouchableOpacity>
        </View>
        <>
        <View style={[styles.input, { paddingLeft: 2 }]}>
          <TextInput placeholder="New Password" style={{ flex: 5 }} secureTextEntry={this.state.showNewPassword ? false : true} onChangeText={(text) => this.checkPassword(text)} value={this.state.password} />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => { this.setState({ showNewPassword: !this.state.showNewPassword }) }}>
            {!this.state.showNewPassword ?
              <Icon
                name="eye-slash"
                color='#E0E6EE'
                size={20} /> :
              <Icon
                name="eye"
                color='#E0E6EE'
                size={20} />}
          </TouchableOpacity>
        </View>
        </>
        {
          this.state.checkPassword &&
          <>
            <View style={{ flexDirection: 'row' }}>
              {
                this.state.passCapital ?
                  <Icon style={styles.icon} style={styles.icon} name={"check"} size={20} color='green' />
                  :
                  <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
              }

              <Text style={this.state.passCapital ? { color: 'green' } : { color: 'red' }}>At least one capital letter</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {
                this.state.passNumber ?
                  <Icon style={styles.icon} name={"check"} size={20} color='green' />
                  :
                  <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
              }
              <Text style={this.state.passNumber ? { color: 'green' } : { color: 'red' }}>At least one number </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {
                this.state.passSpecial ?
                  <Icon style={styles.icon} name={"check"} size={20} color='green' />
                  :
                  <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
              }
              <Text style={this.state.passSpecial ? { color: 'green' } : { color: 'red' }}>At least one Special Character</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {
                this.state.passChar ?
                  <Icon style={styles.icon} name={"check"} size={20} color='green' />
                  :
                  <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
              }
              <Text style={this.state.passChar ? { color: 'green' } : { color: 'red' }}>Be at least 8 characters</Text>
            </View>
          </>
        }

        <TouchableOpacity
              style={styles.button_wrapper}
              onPress={() => this.onSubmit()}>
              {this.state.spin ? <ActivityIndicator size = "small" color = "#FFF"/> : <Text style={styles.button_text}>Save Changes</Text> }
            </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.LoginUser,
  };
};

const Security_Screen = connect(mapStateToProps, null)(Security);
export default Security_Screen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  button_wrapper: {
    backgroundColor: '#10A2EF',
    padding: 15,
    borderRadius: 8,
    width: '70%',
    alignSelf: 'center',
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5
  },
  input: {
    paddingLeft: 5,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
