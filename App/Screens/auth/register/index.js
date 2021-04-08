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
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Linking,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { userRegister, userFacebookRegister, userGoogleRegister } from '../../../services/auth';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  scale,
  moderateScale
} from '../../../commons/responsive_design';
import {
  forgetPwEmail
} from '../../../services/auth/index'
import Icon from "react-native-vector-icons/FontAwesome";
import { RadioButton } from 'react-native-paper';
import Dialog, {SlideAnimation} from 'react-native-popup-dialog';

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      showPassword: false,
      usernameError: false,
      checkUsername: false,
      userNameErrMsg: '',
      userSpecialError: false,
      userSpecialErrorMsg: '',
      email: '',
      emailErrMsg: '',
      emailError: false,
      password: '',
      passwordError: false,
      type: '',
      buyer: false,
      seller: false,
      spaceError: false,
      spaceErrorMsg: '',
      device_id: '',
      spin: false,
      fbspin: false,
      passCapital: false,
      passSpecial: false,
      passNumber: false,
      passChar: false,
      checkPassword: false,
      checked: 'first',
      numberErr: false,
      numberErrMsg: '',
      googleRegisterModal: false,
      result: null
    }
  }
  changeHandler = (key, value, error) => {
    this.setState({
      [key]: value,
      [error]: false,
    })
  }

  checkUserName = (value) => {
    if (!value) {
      this.setState({
        checkUsername: false,
        spaceError: false,
        usernameError: false,
        spaceErrorMsg: '',
        userNameErrMsg: '',
        userSpecialErrorMsg: '',
        userSpecialError: false,
        numberErr: false,
        numberErrMsg: '',
        username: value
      })
      return
    }
    this.setState({ checkUsername: true, username: value })

    const spaceRegex = RegExp(
      /\s/gm
    )

    const specialChar = RegExp(
      /[^a-zA-Z0-9]/gm
    )

    const userNameRegex = RegExp(
      /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$/
    )

    const onlyNumber = RegExp(
      /^\d+$/
    )

    if (specialChar.test(value)) {
      this.setState({ userSpecialError: true, userSpecialErrorMsg: "Don't use a special character" })
    }

    if (spaceRegex.test(value)) {
      this.setState({ spaceError: true, spaceErrorMsg: "Don't use a space" })
    }

    if (onlyNumber.test(value)) {
      this.setState({ numberErr: true, numberErrMsg: "Don't use only number" })
    }

    if (value.length < 6) {
      this.setState({
        usernameError: true,
        userNameErrMsg: 'Username must be atleast 6 characters'
      })
    } else if (value.length > 20) {
      this.setState({
        usernameError: true,
        userNameErrMsg: 'Username can not be more than 20 characters'
      })
    } 
    else{ 
      this.setState({
        usernameError: false,
        userNameErrMsg: ''
      })
    }
  }

  checkGoogleUserName = (value) => {
    if (!value) {
      this.setState({
        googlecheckUsername: false,
        googlespaceError: false,
        googleusernameError: false,
        googlespaceErrorMsg: '',
        googleuserNameErrMsg: '',
        googleuserSpecialErrorMsg: '',
        googleuserSpecialError: false,
        googlenumberErr: false,
        googlenumberErrMsg: '',
        googleusername: value
      })
      return
    }
    this.setState({ googlecheckUsername: true, googleusername: value })

    const spaceRegex = RegExp(
      /\s/gm
    )

    const specialChar = RegExp(
      /[^a-zA-Z0-9]/gm
    )

    const userNameRegex = RegExp(
      /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$/
    )

    const onlyNumber = RegExp(
      /^\d+$/
    )

    if (specialChar.test(value)) {
      this.setState({ googleuserSpecialError: true, googleuserSpecialErrorMsg: "Don't use a special character" })
    }

    if (spaceRegex.test(value)) {
      this.setState({ googlespaceError: true, googlespaceErrorMsg: "Don't use a space" })
    }

    if (onlyNumber.test(value)) {
      this.setState({ googlenumberErr: true, googlenumberErrMsg: "Don't use only number" })
    }

    if (value.length < 6) {
      this.setState({
        googleusernameError: true,
        googleuserNameErrMsg: 'Username must be atleast 6 characters'
      })
    } else if (value.length > 20) {
      this.setState({
        googleusernameError: true,
        googleuserNameErrMsg: 'Username can not be more than 20 characters'
      })
    } 
    else{ 
      this.setState({
        googleusernameError: false,
        googleuserNameErrMsg: ''
      })
    }
  }

  checkPassword = (value) => {
    if (!value) {
      this.setState({
        checkPassword: false,
        passCapital: false,
        passChar: false,
        passNumber: false,
        passSpecial: false
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
  }
  googlecheckPassword = (value) => {
    if (!value) {
      this.setState({
        googlecheckPassword: false,
        googlepassCapital: false,
        googlepassChar: false,
        googlepassNumber: false,
        googlepassSpecial: false
      })
    }
    this.setState({ googlecheckPassword: true, googlepassword: value })
    const capitalRegex = RegExp(
      /[A-Z]/m
    )
    const oneNumber = RegExp(
      /\d/gm
    )
    const specialChar = RegExp(
      /[^a-zA-Z0-9]/gm
    )

    if (capitalRegex.test(value)) {
      this.setState({ googlepassCapital: true })
    }
    if (oneNumber.test(value)) {
      this.setState({ googlepassNumber: true })
    }
    if (specialChar.test(value)) {
      this.setState({ googlepassSpecial: true })
    }
    if (value.length >= 8) {
      this.setState({ googlepassChar: true })
    }
  }

  onSubmit = async () => {
    if (this.state.username.length < 6) {
      this.setState({
        usernameError: true,
        userNameErrMsg: 'Username must be at least 6 characters'
      })
      return;
    }
    const emailRegex = RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        emailError: true,
        emailErrMsg: 'Invalid Email Address'
      });
      return;
    }
    if (!this.state.passCapital || !this.state.passNumber || !this.state.passSpecial || !this.state.passChar) {
      ToastAndroid.showWithGravityAndOffset(
        "Please enter correct password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    };

    this.setState({ spin: true })
    let response = await userRegister(this.state.username, this.state.email, this.state.password, this.state.type)
    if (response.status == 1) {
      this.setState({ spin: false })
      Alert.alert(response.message)
      this.props.navigation.navigate('Login')
    } else {
      this.setState({ spin: false })
      Alert.alert(response.message)
    }
  }
  onGoogleSubmit = async() => {
    const device_id = this.state.device_id
    const type = this.state.googletype;
    const {result, googleusername, googlepassword} = this.state;
    if (this.state.googleusername.length < 6) {
      this.setState({
        googleusernameError: true,
        googleuserNameErrMsg: 'Username must be at least 6 characters'
      })
      return;
    }
    if (!this.state.googlepassCapital || !this.state.googlepassNumber || !this.state.googlepassSpecial || !this.state.googlepassChar) {
      ToastAndroid.showWithGravityAndOffset(
        "Please enter correct password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    };

    this.setState({ googlespin: true })
    let response = await userGoogleRegister(result, googleusername, googlepassword, device_id, type)
    if (response.status == 1) {
      this.setState({ spin: false,googleRegisterModal:false, googleusername: '', googlepassword: '', googletype:'' })
      Alert.alert(response.message)
      this.props.navigation.navigate('Login')
    } else {
      this.setState({ googlespin: false })
      Alert.alert(response.message)
    }
  }
  handleFacebookLogin = () => {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function (result) {
          if (result.isCancelled) {
            reject('Login cancelled')
          } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                const token = data.accessToken;
                console.log(token)
                const PROFILE_REQUEST_PARAMS = {
                  fields: {
                    string: 'id, name,  first_name, last_name, email',
                  },
                };
                const profileRequest = new GraphRequest(
                  '/me',
                  { token, parameters: PROFILE_REQUEST_PARAMS },
                  (error, result) => {
                    if (error) {
                      reject('login info has error: ' + error);
                    } else {
                      resolve(result)
                    }
                  },
                );
                new GraphRequestManager().addRequest(profileRequest).start();
              }
            )
          }
        },
        function (error) {
          reject('Login fail with error: ' + error)
        }
      )
    })
  }
  googleRegister = async() => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await GoogleSignin.revokeAccess();
      console.log('userInfo==', userInfo)
      // this.setState({ userInfo: userInfo, loggedIn: true });
      let result = userInfo.user;
      if (result.email !== undefined){
        this.setState({googleRegisterModal: true, result: result})
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  onFacebookRegister = () => {
    const device_id = this.state.device_id
    const type = this.state.type;
    this.handleFacebookLogin()
      .then(result => {
        (async () => {
          this.setState({ fbspin: true })
          let response = await userFacebookRegister(result, device_id, type)
          console.log(response)
          if (response.status == 1) {
            this.setState({ fbspin: false })
            ToastAndroid.showWithGravityAndOffset(
              response.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            this.props.navigation.navigate('Login')
          } else {
            this.setState({ fbspin: false })
            ToastAndroid.showWithGravityAndOffset(
              response.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );

          }
        })();
      })
      .catch(error => {
        alert(error)
      })
  }
  closeModal = () => {
    this.setState({googleRegisterModal: false})
  }
  componentDidMount = () => {
    DeviceInfo.getAndroidId().then(androidId => {
      // androidId here
      
      this.setState({ device_id: androidId });
    });
    console.disableYellowBox = true;
    GoogleSignin.configure({
      webClientId: '1078990166609-8e3s0c2p5ip1si0gu6a463013kgqg2os.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    });
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo_image.png')}
        />
        <View style={styles.header_wrapper}>
          <Text style={styles.header_text}>Register</Text>
        </View>
        <TextInput placeholder="User Name" style={styles.input} onChangeText={(text) => this.checkUserName(text)} value={this.state.username} />
        {this.state.checkUsername &&
          <>{this.state.spaceError ? (
            <Text style={styles.errorText}>
              {this.state.spaceErrorMsg}
            </Text>
          ) : null}
            {this.state.userSpecialError ? (
              <Text style={styles.errorText}>
                {this.state.userSpecialErrorMsg}
              </Text>
            ) : null}
            {this.state.numberErr ? (
              <Text style={styles.errorText}>
                {this.state.numberErrMsg}
              </Text>
            ) : null}
            {this.state.usernameError ? (
              <Text style={styles.errorText}>
                {this.state.userNameErrMsg}
              </Text>
            ) : null}</>
        }
        <TextInput placeholder="Email" style={styles.input} onChangeText={(text) => this.changeHandler('email', text, 'emailError')} value={this.state.email} />
        {this.state.emailError && (
          <Text style={styles.errorText}>
            {this.state.emailErrMsg}
          </Text>
        )}

        {this.state.passwordError && (
          <Text style={styles.errorText}>
            Please enter the password greater than 8 digits
        </Text>
        )}
        <View style={[styles.input, { paddingLeft: 2 }]}>
          <TextInput placeholder="Password" style={{ flex: 5 }} secureTextEntry={this.state.showPassword ? false : true} onChangeText={(text) => this.checkPassword(text)} value={this.state.password} />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}>
            {this.state.showPassword ?
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

        <View style={styles.checkbox_wrapper}>
          <View style={styles.checbox_seller}>
            <CheckBox
              value={this.state.seller}
              onValueChange={() => this.setState({ 
                seller: true, 
                buyer: false, 
                type: 0 
              })}
            />
            <Text style={styles.checkbox_text}>Seller</Text>
          </View>
          <View style={styles.checkbox_buyer}>
            <CheckBox
              value={this.state.buyer}
              onValueChange={() => this.setState({ 
                buyer: true, 
                seller: false , 
                type: 1  
              })}
            />
            <Text style={styles.checkbox_text}>Buyer</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={this.onSubmit}>
          {this.state.spin ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Register</Text>}
        </TouchableOpacity>
        <View style={styles.policyText}>
          <Text style={styles.policy_text}>
            By registering you accept
            <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.talentsroot.com/terms-of-service')}> Terms of Services</Text> <Text> and</Text>
            <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.talentsroot.com/privacy-policy')}> Privacy Policy</Text>
          </Text>
        </View>

        <View style={styles.underline} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={[styles.socialCard, { backgroundColor: 'white' }]}
            onPress={()=>this.googleRegister()}>
            <Image
              style={styles.socialIcon}
              resizeMode={'contain'}
              source={require('../../../assets/icons/google.png')} />
            <Text
              style={[styles.socialText, { color: '#7a7d85' }]}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialCard, { backgroundColor: '#4267b2' }]}
            onPress={() => this.fbCheck()}>
            <>
              <Image
                style={styles.socialIcon}
                resizeMode={'contain'}
                source={require('../../../assets/icons/facebook.jpg')} />
              <Text
                style={[styles.socialText, { color: 'white' }]}
              >
                Continue with Facebook
                </Text>
            </>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bottom_text_wrapper} onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.bottom_text}>Are you already registered?</Text>
        </TouchableOpacity>
        <Dialog
          visible={this.state.googleRegisterModal}
          onTouchOutside={this.closeModal}>
          <View style={{width: 350, height: 350, padding: 30}}>
           <TextInput placeholder="User Name" style={styles.input} onChangeText={(text) => this.checkGoogleUserName(text)} value={this.state.googleusername} />
            {this.state.googlecheckUsername &&
              <>{this.state.googlespaceError ? (
                <Text style={styles.errorText}>
                  {this.state.googlespaceErrorMsg}
                </Text>
              ) : null}
                {this.state.googleuserSpecialError ? (
                  <Text style={styles.errorText}>
                    {this.state.googleuserSpecialErrorMsg}
                  </Text>
                ) : null}
                {this.state.googlenumberErr ? (
                  <Text style={styles.errorText}>
                    {this.state.googlenumberErrMsg}
                  </Text>
                ) : null}
                {this.state.googleusernameError ? (
                  <Text style={styles.errorText}>
                    {this.state.googleuserNameErrMsg}
                  </Text>
                ) : null}</>
            }
            {this.state.googlepasswordError && (
            <Text style={styles.errorText}>
              Please enter the password greater than 8 digits
            </Text>
            )}
            <View style={[styles.input, { paddingLeft: 2 }]}>
              <TextInput placeholder="Password" style={{ flex: 5 }} secureTextEntry={this.state.googleshowPassword ? false : true} onChangeText={(text) => this.googlecheckPassword(text)} value={this.state.googlepassword} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => { this.setState({ googleshowPassword: !this.state.googleshowPassword }) }}>
                {this.state.googleshowPassword ?
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
            
            {
            this.state.googlecheckPassword &&
            <>
              <View style={{ flexDirection: 'row' }}>
                {
                  this.state.googlepassCapital ?
                    <Icon style={styles.icon} style={styles.icon} name={"check"} size={20} color='green' />
                    :
                    <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
                }

                <Text style={this.state.googlepassCapital ? { color: 'green' } : { color: 'red' }}>At least one capital letter</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {
                  this.state.googlepassNumber ?
                    <Icon style={styles.icon} name={"check"} size={20} color='green' />
                    :
                    <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
                }
                <Text style={this.state.googlepassNumber ? { color: 'green' } : { color: 'red' }}>At least one number </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {
                  this.state.googlepassSpecial ?
                    <Icon style={styles.icon} name={"check"} size={20} color='green' />
                    :
                    <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
                }
                <Text style={this.state.googlepassSpecial ? { color: 'green' } : { color: 'red' }}>At least one Special Character</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {
                  this.state.googlepassChar ?
                    <Icon style={styles.icon} name={"check"} size={20} color='green' />
                    :
                    <Icon style={styles.icon} name={'window-close'} size={20} color='red' />
                }
                <Text style={this.state.googlepassChar ? { color: 'green' } : { color: 'red' }}>Be at least 8 characters</Text>
              </View>
            </>
            }
            <View style={styles.checkbox_wrapper}>
              <View style={styles.checbox_seller}>
                <CheckBox
                  value={this.state.googleseller}
                  onValueChange={() => this.setState({ 
                    googleseller: true, 
                    googlebuyer: false, 
                    googletype: 0 
                  })}
                />
                <Text style={styles.checkbox_text}>Seller</Text>
              </View>
              <View style={styles.checkbox_buyer}>
                <CheckBox
                  value={this.state.googlebuyer}
                  onValueChange={() => this.setState({ 
                    googlebuyer: true, 
                    googleseller: false , 
                    googletype: 1  
                  })}
                />
                <Text style={styles.checkbox_text}>Buyer</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={this.onGoogleSubmit}>
              {this.state.googlespin ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Register</Text>}
            </TouchableOpacity>
          </View>
        </Dialog>
      </ScrollView>
    );
  }
};

export default RegisterScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: '2%',
    height: 44,
    width: 44,
    alignSelf: 'center',
  },
  header_wrapper: {
    padding: '3%',
  },
  header_text: {
    textAlign: 'center',
    fontSize: 28,
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
  errorText: {
    color: '#ff0000',
  },
  checkbox_wrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  checbox_seller: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  checkbox_buyer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox_text: {
    color: '#3C4043',
  },
  registerButton: {
    backgroundColor: '#10A2EF',
    padding: '4%',
    borderRadius: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  policyText: {
    flexDirection: 'row',
    display: 'flex',
    padding: 5,
    // width: 250
  },
  policy_text: {
    color: '#3C4043'
  },
  underline: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: '3.5%',
    alignSelf: 'center',
    width: '70%',
    borderColor: '#748F9E'
  },
  facebookButton: {
    backgroundColor: '#4968B4',
    padding: '4%',
    marginVertical: '2%',
    borderRadius: 2,
  },
  googleButton: {
    backgroundColor: '#EE6924',
    padding: '4%',
    marginVertical: '2%',
    borderRadius: 2,
  },
  bottom_text_wrapper: {
    padding: '2%',
    marginBottom: 30,
  },
  bottom_text: {
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  socialCard: {
    flex: 1,
    flexDirection: 'row',
    height: hp(8),
    margin: scale(5),
    padding: scale(10),
    borderRadius: 10,
    borderColor:'#DDD',
    borderWidth:1
  },
  socialIcon: {
    height: null,
    flex: 1,
  },
  socialText: {
    fontSize: moderateScale(11),
    flex: 3,
    paddingHorizontal: scale(10),
    textAlign: 'center'
  },
  icon: {
    marginRight: 5
  }
});
