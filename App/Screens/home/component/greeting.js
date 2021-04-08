import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
class GreetingScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      recommendedViewStyle: 'list',
      latestViewStyle: 'grid',
    };
  }


  componentDidMount = () => {
  };
  render() {
    console.log('login user data',this.props.profileData)
    return (
      <View style={styles.card}>
        <View style={styles.cardUpper}>
          <Text style={styles.cardHeader}>Hello {this.props.login.name}</Text>
        </View>
        <View style={styles.doshline} />
        <View style={{ padding: 20 }}>
          {
            this.props.login.type == 1 ?
              <>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('EditProfile');
                  }}
                  style={[
                    styles.helloCardButton,
                    { backgroundColor: '#2EC09C', marginBottom: 20 },
                  ]}>
                  <Text style={styles.helloCardButtonText}>BECOME A SELLER?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EditRequest')}
                  style={[styles.helloCardButton, { backgroundColor: '#10A2EF' }]}>
                  <Text style={styles.helloCardButtonText}>
                    REQUEST OFFER FROM SELLERS
                  </Text>
                </TouchableOpacity>
              </>
              : <>
              
                <TouchableOpacity
                  onPress={() => {
                    this.props.profileData !== null&&
                      <>
                        {
                          (this.props.login.type == 0 && (this.props.profileData.first_name == '' || this.props.profileData.last_name == '' || this.props.profileData.country == ''|| this.props.profileData.email == ''|| this.props.profileData.timezone == '' || this.props.profileData.description == ''))?
                          this.props.navigation.navigate('EditProfile')
                          :
                          this.props.navigation.navigate('PostRoot')
                        }
                      </>
                  }}
                  style={[
                    styles.helloCardButton,
                    { backgroundColor: '#2EC09C', marginBottom: 20 },
                  ]}>
                  <Text style={styles.helloCardButtonText}>POST NEW ROOT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('BuyersRequests')}
                  style={[styles.helloCardButton, { backgroundColor: '#10A2EF' }]}>
                  <Text style={styles.helloCardButtonText}>
                    SUBMIT OFFER
                  </Text>
                </TouchableOpacity>
              </>
          }
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    login: state.LoginUser,
    profileData: state.userProfile.profiledata,
  };
};
const greeting = connect(
  mapStateToProps,
  null,
)(GreetingScreen);
export default greeting;
const styles = StyleSheet.create({
  homeContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    marginBottom: 25,
  },
  cardUpper: {
    padding: 15,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight:'bold'
  },
  helloCardButton: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  helloCardButtonText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  doshline: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderStyle: 'dashed'
  },
});
