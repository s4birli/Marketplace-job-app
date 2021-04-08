import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import DrawerWrapper from '../../commons/rightDrawerWrapper'
const ProfileRequire = (props) => {
  const [isLoading,setIsLoading] = useState(false)
  useEffect(()=>{
    setIsLoading(true)
    if(props.profileData){
        const ProfileData = props.profileData;
        // change it when edit profile updated
        // if( !ProfileData.preffered_language || !ProfileData.additional_language || !ProfileData.phone || !ProfileData.profile || !ProfileData.description || ProfileData.skills.length === 0 ){
        if(  !ProfileData.phone || !ProfileData.profile || !ProfileData.description || ProfileData.skills.length === 0 ){
          setIsLoading(false)
          props.navigation.navigate('EditProfile')
        }else{
          setIsLoading(false)
          props.navigation.navigate('PostRoot')
        }
      }
  },[props.profileData])
  return(
      <>
      <DrawerWrapper {...props}>
        <View style={{ flex: 1 }}>
          <ScrollView 
          refreshControl={ 
            <RefreshControl refreshing={isLoading} />
          }
        >
          </ScrollView>
        </View>
      </DrawerWrapper>
      </>
  )
}

const mapStateToProps = state => {
  return {
    profileData: state.userProfile.profiledata,
  };
};

const ProfileRequireScreen = connect(mapStateToProps)(ProfileRequire);

export default ProfileRequireScreen;
