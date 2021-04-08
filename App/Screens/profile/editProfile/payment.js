import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  editEmail
} from '../../../services/profile'
import { connect } from 'react-redux';

const Payment = (props) => {

  const [payPal, setPayPal] = useState('')
  const [cashu, setCashu] = useState('')
  console.log("profileData", props.profileData)

  setValues = async() => {
    let res = await editEmail(props.token, payPal, cashu)
    console.log(res)
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={props.profileData.paypal_id ? props.profileData.paypal_id : 'paypal id'}
        onValueChange={(text) => setPayPal(text)}
        editable={props.profileData.paypal_id ? false : true}
      />
      <TextInput
        placeholder={props.profileData.cashu ? props.profileData.cashu : 'cashu id'}
        style={styles.input}
        onValueChange={(text) => setCashu(text)}
        editable={props.profileData.paypal_id ? false : true}
      />
      <TouchableOpacity onPress = {()=>setValues()}> 
        <View style={styles.button_wrapper}>
          <Text style={styles.button_text}>Save Changes</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
    alignSelf: 'center'
  },
  button_text: {
    color: '#fff',
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    profileData: state.userProfile.profiledata,
  };
};

export default connect (mapStateToProps)(Payment);
