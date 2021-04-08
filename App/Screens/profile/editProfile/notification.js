import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  Switch
} from 'react-native';

class Payment extends React.Component {
  state = {
    categories:false,
    siteNotification:false,
    emailNotification:false
  }
  render(){
  return (
    <View style={{paddingVertical:10}}>
      <View style={styles.categories_notice_wrapper}>
        <Text style={styles.categories_notice_wrapper_text}>
          Select categories to be notified once a buyer post a request
        </Text>
        <View style={styles.categires_wrapper}>
          <CheckBox
          value={this.state.categories}
          onValueChange={() => {
            this.setState({categories: !this.state.categories});
          }}
          onChange={() => {
            this.setState({categories: !this.state.categories});
          }}
          />
          <Text style={styles.checbox_text}>All categories</Text>
        </View>
      </View>
      <View style={styles.site_notification_wrapper}>
      <Switch 
       value={this.state.siteNotification}
       onValueChange={() => {
         this.setState({siteNotification: !this.state.siteNotification});
       }}
       onChange={() => {
         this.setState({remember: !this.state.remember});
       }}/>
      <Text style={styles.site_notification_text}>Enable site notifications</Text>
      </View>
      <View style={styles.message_notification_wrapper}>
      <Switch
       value={this.state.emailNotification}
       onValueChange={() => {
         this.setState({emailNotification: !this.state.emailNotification});
       }}
       onChange={() => {
         this.setState({emailNotification: !this.state.emailNotification});
       }} />
      <Text style={styles.message_notification_text}>Enable Email notifications</Text>
      </View>
      <View style={styles.button_wrapper}>
          <Text style={styles.button_text}>Save Changes</Text>
      </View>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  categories_notice_wrapper: {
      borderWidth:1,
      padding:10,
      borderRadius:10,
      borderColor:'#E0E3EB'
  },
  categories_notice_wrapper_text:{
    color:'#8895B4'
  },
  categires_wrapper:{
      flexDirection:'row',
      alignItems:'center'
  },
  checbox_text:{
      color:'#3C4043'
  },
  site_notification_wrapper:{
      flexDirection:'row',
      alignItems:'center',
      padding:8
  },
  site_notification_text:{
      color:'#000000'
  },
  message_notification_wrapper:{
    flexDirection:'row',
    alignItems:'center',
    padding:8
  },
  message_notification_text:{
      color:'#000000'
  },
  button_wrapper:{
    backgroundColor:'#10A2EF',
    padding:15,
    borderRadius:8,
    width:'70%',
    alignSelf:'center'
},
button_text:{
    color:'#fff',
    textAlign:'center'
}
});
export default Payment;
