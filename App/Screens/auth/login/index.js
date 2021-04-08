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
  TouchableWithoutFeedback,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import * as RNLocalize from 'react-native-localize';
import Modal from 'react-native-modal';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { Login, LoginWithFacebook, LoginWithGoogle } from './actions/actions';
import config from '../../../config'
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  scale,
  moderateScale
} from '../../../commons/responsive_design';
import {
  forgetPwEmail
} from '../../../services/auth/index'
import TimeZone from 'react-native-timezone';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class LoginScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      password: '',
      device_id: '',
      tz: '',
      remember: false,
      isModalVisible: false,
      forgetEmail: '',
      showToaster: false,
      showPassword: false,
      isLoading:false
    };

  }
  changeHandler = (key, value) => {
    this.setState({
      [key]: value,
      emailError: false,
    });
  };
  onSubmit = async () => {
    if (this.state.email == '') {
      this.setState({
        emailError: true,
      });
    }
    if (this.state.email != '' || this.state.password != '') {
      this.setState({
        showToaster: true,
      });
      await this.props.callLogin(
        this.state.email,
        this.state.password,
        this.state.device_id,
      );
    }
  };

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

  fbCheck = () => {
    const device_id = this.state.device_id
    this.handleFacebookLogin()
      .then(result => {
        this.props.callFbLogin(
          result.id,
          result.name,
          result.email,
          result.first_name,
          result.last_name,
          device_id,
          this.state.tz,
        )
      })
      .catch(error => {
        alert(error)
      })
  }
 
  googleLogin = async() => {
    try {
      const device_id = this.state.device_id
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // await GoogleSignin.revokeAccess();
      console.log('userInfo==', userInfo)
      // this.setState({ userInfo: userInfo, loggedIn: true });
      let user = userInfo.user;
      this.props.callGoogleLogin(
        user.id,
        device_id,
        this.state.tz,
        user.email
      )
     // if 
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
  renderToaster = () => {
    this.setState({
      showToaster: false,
    });
    ToastAndroid.showWithGravityAndOffset(
      'Wrong username/email or password',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  getTimeZone = async() => {
    const timeZone = await TimeZone.getTimeZone().then(zone => zone);
    let realtimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone 
    this.setState({tz:realtimeZone})
    console.log("timezone====",Intl.DateTimeFormat().resolvedOptions().timeZone)
  }
  componentDidMount = () => {
    // console.log('local time', RNLocalize.getTimeZone());
    // this.setState({
    //   tz: RNLocalize.getTimeZone(),
    // });
    this.getTimeZone()
    DeviceInfo.getAndroidId().then(androidId => {
      // androidId here
      console.log('android id', androidId);
      this.setState({ device_id: androidId });
    });
    console.disableYellowBox = true;
    GoogleSignin.configure();
    // GoogleSignin.configure({
    //   webClientId: '1078990166609-8e3s0c2p5ip1si0gu6a463013kgqg2os.apps.googleusercontent.com', 
    //   offlineAccess: true, 
    //   hostedDomain: '', 
    //   forceConsentPrompt: true, 
    // });
    // let id = DeviceInfo.getUniqueID();
    // const socket = this.props.screenProps;
    // socket.on('connect', (value) => { 
    //   console.log("SOCKET DISCONNECTIONNNNNNNNNNNNNNNNN ----------");
    //   setTimeout(() => socket.disconnect(true), 5000);
    // })
  };

  forgetPassword = async () => {
    if (this.state.forgetEmail != '') {
      this.setState({isLoading:true})
      const response = await forgetPwEmail(this.state.forgetEmail);
      if (response.status === 1) {
          this.setState({
            isLoading:false,
            isModalVisible:false,
            password:''
          })
         Alert.alert(response.message)
      }else {
        this.setState({
          isLoading:false
        })
       Alert.alert(response.message)
      }
    }else{
     Alert.alert('Please enter valid email.')
    }
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible , forgetEmail:'' });
  };
  render() {
    {
      this.props.login.loggedin && this.props.navigation.navigate('App');
    }

    return (
      <ScrollView 
        style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo_image.png')}
        />

        <Text style={styles.headerText}>Login</Text>
        <TextInput
          placeholder="Username / Email address"
          style={[styles.usernameInput]}
          onChangeText={text => this.changeHandler('email', text)}
          value={this.state.email}
        />
        {this.state.emailError && (
          <Text style={styles.errorText}>
            Please Enter the valid Email/Username
          </Text>
        )}
        <View style={styles.input}>
          <TextInput
            style={{
              flex: 5
            }}
            placeholder="Password"
            secureTextEntry={this.state.showPassword ? false : true}
            onChangeText={text => this.changeHandler('password', text)}
            value={this.state.password}
          />
          <TouchableOpacity 
            style={{
              flex: 1,
              justifyContent:'center',
              alignItems:'center',
            }}
            onPress={()=>{this.setState({showPassword: !this.state.showPassword})}}>
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
        <View style={styles.checkBox_Wrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              value={this.state.remember}
              onValueChange={() => {
                this.setState({ remember: !this.state.remember });
              }}
              onChange={() => {
                this.setState({ remember: !this.state.remember });
              }}
            />
            <Text style={{ marginLeft: 10 }}>Remember Me</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.toggleModal();
            }}>
            <Text style={styles.forget_password_text}>Forgot Password ?</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isModalVisible}
            style={{ margin: 20, borderRadius: 10 }}
            onBackdropPress={() => this.toggleModal()}>
            <View style={{ backgroundColor: '#fff', padding: 30 }}>
              {
                this.state.isLoading ? 
                <ActivityIndicator 
                 size="large" 
                 color="#10A2EF" /> : null
              }
              <Text
               style={styles.forgotPasswordText}
              >Forgot Password</Text>
              <TextInput
                placeholder="Registered Email Address"
                style={styles.input}
                onChangeText={text => this.changeHandler('forgetEmail', text)}
                value={this.state.forgetEmail}
              />
            </View>
            <TouchableWithoutFeedback 
              onPress={() => { this.forgetPassword() }}>
              <View style={styles.signInButton} >
                <Text style={styles.buttonText}>Reset Password</Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={() => this.onSubmit()}>
          {this.props.login.fetching ? <ActivityIndicator size="small" color="#FFF" /> : 
           <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
        <View style={styles.underline} />
        <View style={{ flexDirection: 'row' , justifyContent: 'space-around' }}>
          <TouchableOpacity 
            style={[styles.socialCard,{backgroundColor: 'white'}]}
            onPress={()=>this.googleLogin()}>
            {this.props.login.googlefetching ? 
            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
              <ActivityIndicator size="small" color="#4267b2" /> 
            </View>
            : 
            <>
            <Image 
              style={styles.socialIcon} 
              resizeMode={'contain'}
              source={require('../../../assets/icons/google.png')} />
            <Text 
             style={[styles.socialText,{color: '#7a7d85'}]} 
            >
              Continue with Google
            </Text>
            </> 
            }
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialCard,{backgroundColor : '#4267b2'}]}
            onPress={() => this.fbCheck()}>
            {this.props.login.fbfetching ? 
              <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="#FFF" /> 
              </View>
              :
              <>
              <Image 
                style={styles.socialIcon} 
                source={require('../../../assets/icons/facebook.jpg')} />
                <Text
                 style={[styles.socialText,{color: 'white'}]} 
                >
                  Continue with Facebook
                </Text>
              </> 
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.noAccount}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.noAccountText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        {this.state.showToaster && this.props.login.error && this.renderToaster()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.LoginUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callLogin: (uname, pw, deviceId) => {
      dispatch(Login(uname, pw, deviceId));
    },
    callFbLogin: (facebook_id, name, email, first_name, last_name, deviceId) => {
      dispatch(LoginWithFacebook(facebook_id, name, email, first_name, last_name, deviceId));
    },
    callGoogleLogin: (google_id, deviceId, tz, email) => {
      dispatch(LoginWithGoogle(google_id, deviceId, tz, email));
    }
  };
};

const logging = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default logging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: '5%',
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  headerText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 28,
  },
  input: {
    paddingLeft: 5,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  usernameInput : {
    paddingLeft: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  errorText: {
    color: '#ff0000',
  },
  checkBox_Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '2%',
  },
  forget_password_text: {
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#10A2EF',
    padding: '4%',
    borderRadius: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  underline: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: '7%',
    marginTop: '7%',
    alignSelf: 'center',
    width: '100%',
    borderColor: '#748F9E',
  },
  facebookButton: {
    backgroundColor: '#4968B4',
    padding: '4%',
    borderRadius: 2,
    height: 50,
    width: 150
  },
  googleButton: {
    backgroundColor: '#EE6924',
    padding: '4%',
    borderRadius: 2,
    height: 50,
    width: 150,
    marginLeft: 10
  },
  noAccount: {
    padding: '4%',
  },
  noAccountText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  socialCard : {
    flex : 1,
    flexDirection : 'row',
    height : hp(8),
    margin : scale(5),
    padding : scale(10),
    borderRadius : 10,
    borderColor:'#DDD',
    borderWidth:1
  },
  socialIcon: { 
    height : null,
    flex : 1
  },
  socialText: {
    fontSize : moderateScale(11),
    flex : 3,
    paddingHorizontal : scale(10),
    textAlign : 'center'
  },
  forgotPasswordText:{
    fontWeight:'bold',
    fontSize:22,
    alignSelf:'center'
  }
});
