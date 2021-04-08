import React, { Fragment, useState, useEffect } from 'react';
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
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withdrawMoney } from '../../services/payments/payments'
import { connect } from 'react-redux';

const Withdraw = (props) => {

  const [email, setemail] = useState(props.profileData.email ? props.profileData.email : '')
  const [amount, setAmount] = useState('');
  const [payPal, setPayPal] = useState(false);
  const [payoneer, setPayoneer] = useState(false);
  const [cashu, setCashu] = useState(false);
  const [editable, setEditable] = useState(props.profileData.email ? false: true);
  const country = props.profileData.country
  useEffect(() => {
    console.log("profileData==========",props.profileData)
  }, [])

  useEffect(() => {
    if (payPal){
      setCashu(false);
      setPayoneer(false);
      setEditable(false);
    }
  }, [payPal])

  useEffect(() => {
    if (cashu){
      setPayPal(false);
      setPayoneer(false);
      setEditable(true);
    }
  }, [cashu])

  useEffect(() => {
    if (payoneer){
      setCashu(false);
      setPayPal(false);
      setEditable(true);
    }
  }, [payoneer])

  const withdraw = async() => {
    if(email == ''){
      Alert.alert("Please enter Email Address")

    }else{
      let gateway;
      if (payPal){
        gateway = 1
      }
      else if (cashu) {
        gateway = 2
      }
      else if (payoneer) {
        gateway = 3
      }
      let response = await withdrawMoney(props.token, gateway, email, amount)
      console.log("result===============", response)
      return Alert.alert(
        '',
        response.message,
        [
            { text: 'OK', onPress: () => console.log("") },
        ],
        { cancelable: false },
    );
    }
  }


  return (
    <ScrollView style={styles.container}>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize:16, fontWeight:'700'}}>
          Where do you want to transfer the payment?
        </Text>
      </View>
      <View style={styles.button}>
        <CheckBox
        value={payPal}
        onValueChange={() => {setPayPal(!payPal)}} />
        <View style={{alignItems:'center', marginLeft: 70}}>
          <Image style={{ marginLeft: 30, height: 30, width: 60 }} source={require('../../assets/icons/paypal.png')} />
        </View>
      </View>
      {(country == 'India' || country == 'Pakistan' || country == 'Egypt')&&
      <View style={styles.button}>
        <CheckBox
        value={payoneer}
        onValueChange={() => setPayoneer(!payoneer)} />
        <View style={{alignItems:'center', marginLeft: 70}}>
          <Image style={{ marginLeft: 30, height: 30, width: 60 }} source={require('../../assets/icons/payoneer.png')} />
        </View>
      </View>
      }
      {(country == 'Palestine' || country == 'Lebanon' || country == 'Egypt'|| country == 'Iraq'|| country == 'Turkey'|| country == 'Algeria'|| country == 'Egypt'|| country == 'Morocco'|| country == 'Tunis'|| country == 'Libya')&&
      <View style={styles.button}>
        <CheckBox 
        value={cashu}
        onValueChange={() => setCashu(!cashu)}/>
        <View style={{alignItems:'center', marginLeft: 70}}>
          <Image style={{ marginLeft: 30, height: 30, width: 60 }} 
            resizeMode={'contain'} 
            source={require('../../assets/icons/cashu.png')} />
        </View>
      </View>
      }
      <TextInput
        style={styles.textInput}
        placeholder={payoneer?'Payoneer Email':cashu?'CASHU Email/Username/Account number':email}
        value={(payoneer || cashu)?null:email}
        editable={editable}
        onChangeText={(text) => { setemail(text) }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Amount"
        onChangeText={(text) => { setAmount(text) }}
      />
      <TouchableOpacity onPress={()=>withdraw()}>
      <View style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Withdraw</Text>
      </View>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    profileData: state.userProfile.profiledata,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    borderWidth: 1,
    borderColor: '#E8EEF1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10
  },
  buttonText: {
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8EEF1',
    padding: 15,
    marginVertical: 10
  },
  withdrawButton: {
    backgroundColor: '#10A2EF',
    padding: 15,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10
  },
  withdrawText: {
    color: '#fff',
    textAlign: 'center'
  }
});
export default connect (mapStateToProps)(Withdraw)
