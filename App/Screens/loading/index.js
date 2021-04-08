import React, {Fragment, Component, useEffect} from 'react';
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
} from 'react-native';
import {connect} from 'react-redux';
import {Login} from '../auth/login/actions/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = (props) => {
 
  console.log(' props.login', props.login);
  const { error , loggedin , fetching } = props.login;
  useEffect(() => {
    authChecker()
  },[])

  authChecker = async() => {
    const username =await AsyncStorage.getItem('username');
    const password =await AsyncStorage.getItem('password');
    const device_id =await AsyncStorage.getItem('device_id');
    props.dispatch(Login( username, password , device_id ));
  };

  useEffect(() => {
    
    if(!fetching && error && !loggedin){
      props.navigation.navigate('Auth');
    }
    if(!fetching && !error && loggedin){
      console.log('goto app',props.navigation)

      props.navigation.navigate('App');
    }
  },[fetching,error,loggedin])

    return (
      <Fragment>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo_image.png')}
          />
        </View>
      </Fragment>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10A2EF',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 118,
    width: 118
  },
});

const mapStateToProps = state => {
  return {
    login : state.LoginUser,
  };
};

const LoadingScreen = connect(mapStateToProps)(Loading);
export default LoadingScreen;
