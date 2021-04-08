
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, AsyncStorage, Switch, Image, TouchableOpacity, Picker, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import { start_vacation } from '../../services/home/index';
import { getUserBalance } from '../../services/home/index';
import {log_out} from '../../services/auth/index';
import { connect } from 'react-redux';
import moment from 'moment';

const LeftDrawer = (props) => {
  
  const [isOnVacation, setIsOnVacation] = useState(false);
  const [vacation, setVacation] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState('awayReason');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState('')
  const [isEnable, setIsEnable] = useState(true);
  console.log("userProfile===============",props.profileData)
  const logout = async () => {
    deviceToken = await AsyncStorage.getItem('device_id');
    let response = await log_out(props.login.userToken, deviceToken)
    if (response.status == 1){ 
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('device_id');
      await AsyncStorage.removeItem('socket_url');
      global.socket.disconnect(true);
      await props.dispatch({ type: 'LOGOUT_REQUEST' });
      await props.navigation.navigate('Auth');  
    } 
  };

  const startVacation = async (reason, date) => {
    let dateTime;
    // let unixTime = moment.unix(date)
    // console.log(")))))))))))", date, unixTime)
    if (isOnVacation){
      response = await start_vacation(props.login.userToken, '', '');
      setIsEnable(true);
    }
    else {
      dateTime = date.getTime()/1000;
      response = await start_vacation(props.login.userToken, reason, dateTime)
      if (response.status == 1){
        setIsEnable(false);
      }
    }
    // let response = await start_vacation(props.login.userToken, reason, dateTime)
    console.log(response);
    if(response.status == 1){
      console.log("ddddddddddd",!setIsOnVacation);
      setIsOnVacation(!isOnVacation)
      if (isOnVacation){
        Alert.alert('Vacation mode deactivated...')
      }
      else {
        Alert.alert('Vacation mode activated...')
      }
      
    }else{
      return(
        Alert.alert('Something went wrong, Please try again later...')
      )
    }
    setIsModalVisible(!isModalVisible);
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShow(false);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const getUserBalanceDetails = async() => {
    let balance = await getUserBalance(props.login.userToken)
    console.log("balance", balance)
    setBalance(balance);
  }

  useEffect(() => {
    getUserBalanceDetails()     
  }, [])

  useEffect(() => {
    if (props.profileData != null){
      if (props.profileData.vacation == 0){

      }
      else{
        setIsOnVacation(true);
        setIsEnable(false);
        setDate(props.profileData.vacation_end);
        if (props.profileData.vacation == 1){
          setReason('1')
        }
        else{
          setReason('2')
        }
      }
    }      
  }, [props.profileData])
  const vacationModal = () => {
    console.log("reason=====",date)
    return (
      <Modal
        isVisible={isModalVisible}
        style={{ margin: 20, padding: 20 }}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
        onBackdropPress={toggleModal}>

        <View style={{ backgroundColor: '#fff', padding: 30, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', width: 200, fontWeight: 'bold' }}>Activate Vacation Mode</Text>
          <View style={styles.cardView}>
            <Picker
              selectedValue={reason}
              enabled={isEnable}
              onValueChange={(itemValue, itemIndex) =>
                setReason(itemValue)
              }>
              <Picker.Item label="Away Reason" value="" />
              <Picker.Item label="I am Overbooked" value="1" />
              <Picker.Item label="I am out of Office" value="2" />
            </Picker>
          </View>
          <View style={styles.cardViewDate}>
            <TouchableOpacity onPress={() => isEnable&&showDatepicker()}>
              {props.profileData.vacation_end == 0?
              <Text style={{marginTop: 8}}>{date.toDateString()}</Text>
              :
              <Text style={{marginTop: 8}}>{props.profileData.vacation_end}</Text>
              }
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              minimumDate={Date.now()}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View>
            <TouchableOpacity style={{ backgroundColor: '#10A2EF', height: 40, width: 250 }} onPress={() => startVacation(reason, date)}>
              {isOnVacation?
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: 10 }}>Deactivate</Text>
              :
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: 10 }}>Activate</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )

  }
  return (
    <View>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 16,
          borderBottomColor: '#E6E6E6',
          borderBottomWidth: 1,
          paddingBottom:10
        }}> 
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                overflow: 'hidden',
              }}>
              {props.profileData !== null&&
              <Image
                style={{ height: null, width: null, flex: 1 }}
                source={props.profileData.profile ? { uri: props.profileData.profile } : require('../../assets/icons/account.png')}
              />
              }
            </View>
            <View style={{ marginLeft: 12, flexDirection: 'column' }}>
              <Text style={{ fontSize: 12 }}>{props.login.name}</Text>
              <Text style={{ color: '#2EC09C', fontSize: 12 }}>${balance.data}</Text>
            </View>
          </View>
        </View>
        {
          props.login.type === 0 ? 
          <>
          {console.log("vacation=========",isOnVacation)}
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Switch
                onResponderStart={() => {
                  toggleModal()
                }}
                onValueChange={() => {
                  setVacation(!vacation)
                }}
                value={isOnVacation}
              />
              <Text>Vacation Mode</Text>
            </View>
            {/*vacation modal*/}
            {
              isModalVisible ? vacationModal() : null
            }
          </>
          :null
        }
       
      </View>
      <View style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
        {/*My Profile*/}
        <View style={styles.border}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/icons/account.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            My Profile
          </Text>
        </TouchableOpacity>
        </View>
        {/*My Roots*/}
        { 
          props.login.type === 0 ?
          <TouchableOpacity
            onPress={() => 
              props.profileData !== null&&
              <>
                {
                  (props.profileData.first_name == '' || props.profileData.last_name == '' || props.profileData.country == ''|| props.profileData.email == ''|| props.profileData.timezone == '' || props.profileData.description == '')?
                  props.navigation.navigate('EditProfile')
                  :
                  props.navigation.navigate('MyRoots')
                }
              </>
            }
            style={styles.drawerIconViewStyle}>
            <Image
              style={styles.drawerIconStyle}
              source={require('../../assets/icons/grid_white.png')}
            />
            <Text
              style={styles.drawerIconTextStyle}
            >
              My Roots
            </Text>
          </TouchableOpacity> :
          null
        }
        {/*My Sales*/}
        {
          props.login.type == 0 ?
            <TouchableOpacity
              onPress={() => props.navigation.navigate('MySales')}
              style={styles.drawerIconViewStyle}>
              <Image
                style={styles.drawerIconStyle}
                source={require('../../assets/icons/bars-graphic.png')}
              />
              <Text
                style={styles.drawerIconTextStyle}>
                My Sales
          </Text>
            </TouchableOpacity>
            :
            null
        }
        {/*My Shopping*/}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MyShopping')}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/icons/purchases.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            My Shopping
          </Text>
        </TouchableOpacity>
        {/*My Reviews*/}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MyReviews')}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/icons/blackStar.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            My Reviews
          </Text>
        </TouchableOpacity>
        {/*My Payments*/}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Payments')}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/icons/protection.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            My Payments
          </Text>
        </TouchableOpacity>
        {/*My Requests*/}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MyRequests')}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/icons/design.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            My Requests
          </Text>
        </TouchableOpacity>
        {/*My Favorites*/}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MyFavorites')}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/images/favourite.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            My Favorites
          </Text>
        </TouchableOpacity>
        {/*My BuyersRequests*/}
        {props.login.type == 0 ?
          <TouchableOpacity
            onPress={() => props.navigation.navigate('BuyersRequests')}
            style={styles.drawerIconViewStyle}>
            <Image
              style={styles.drawerIconStyle}
              source={require('../../assets/images/buyerrequests.png')}
            />
            <Text
              style={styles.drawerIconTextStyle}>
              Buyers Requests
            </Text>
          </TouchableOpacity>
          : null}
        <TouchableOpacity
          onPress={logout}
          style={styles.drawerIconViewStyle}>
          <Image
            style={styles.drawerIconStyle}
            source={require('../../assets/images/logout.png')}
          />
          <Text
            style={styles.drawerIconTextStyle}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    login: state.LoginUser,
    profileData: state.userProfile.profiledata,
  };
};
const leftDrawer = connect(
  mapStateToProps
)(LeftDrawer);

export default leftDrawer;

const styles = StyleSheet.create({
  drawerIconStyle: {
    height: 22,
    width: 22,
  },
  drawerIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  drawerIconTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#748F9E',
    marginLeft: 20,
  },
  cardView: {
    width: 250,
    borderColor: '#748F9E',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10
  },
  cardViewDate: {
    width: 250,
    borderColor: '#748F9E',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center'
  },
});
