import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  View,
  TextInput,
} from 'react-native';
import { connect } from "react-redux";
import { RectButton } from 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Header from '../../commons/header';
import RightDrawer from '../../Screens/rightDrawer';
import LeftDrawer from '../../Screens/leftDrawer';
import ProfileDataRequire from '../../components/ProfileDataRequire';
const TYPES = ['front', 'back', 'back', 'slide'];
const PARALLAX = [false, false, true, true];

class DrawerWrapper extends Component {
  state = { 
    fromLeft: false, 
    type: 3,
    isProfileRequire:false,  
  };

  renderParallaxDrawer = progressValue => {
    const parallax = progressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.fromLeft ? -50 : 50, 0],
    });
    const animatedStyles = {
      transform: [{ translateX: parallax }],
    };
    return (
      <Animated.View style={[styles.drawerContainer, animatedStyles]}>
        <RightDrawer {...this.props}/>
      </Animated.View>
    );
  };

  static getDerivedStateFromProps(props, state){
    if(props.profileData){
      const ProfileData = props.profileData;
      // change it when edit profile updated
      // if( !ProfileData.preffered_language || !ProfileData.additional_language || !ProfileData.phone || !ProfileData.profile || !ProfileData.description || ProfileData.skills.length === 0 ){
      if(ProfileData.type === 0){
        if(  !ProfileData.phone || !ProfileData.profile || !ProfileData.description ){
          return { isProfileRequire:true  }
        }
      }  
    }
  }

  render() {
    const drawerType = TYPES[this.state.type];
    const parallax = PARALLAX[this.state.type];
    return (
      <View style={styles.container}>
        <DrawerLayout
          ref={drawer => {
            this.drawer = drawer;
          }}
          drawerWidth={250}
          keyboardDismissMode="on-drag"
          drawerPosition={
            this.state.fromLeft
              ? DrawerLayout.positions.Left
              : DrawerLayout.positions.Right
          }
          drawerType={drawerType}
          drawerBackgroundColor="#FFF"
          overlayColor={drawerType === 'front' ? 'black' : '#00000000'}
          renderNavigationView={
            parallax ? this.renderParallaxDrawer : this.renderDrawer
          }
          contentContainerStyle={
            // careful; don't elevate the child container
            // over top of the drawer when the drawer is supposed
            // to be in front - you won't be able to see/open it.
            drawerType === 'front'
              ? {}
              : Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 60,
                  },
                  android: {
                    backgroundColor: '#fff',
                  },
                })
          }
          >
        <Header {...this.props} drawer = {() => this.drawer.openDrawer()} />
          {/* {
            this.state.isProfileRequire ? 
            <ProfileDataRequire {...this.props} /> 
            : null
          } */}
          {this.props.children}
        </DrawerLayout>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileData: state.userProfile.profiledata,
  };
};

const DrawerWrapperComponent = connect(
  mapStateToProps,
)(DrawerWrapper);

export default DrawerWrapperComponent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'gray',
  },
  pageText: {
    fontSize: 21,
    color: 'white',
  },
  rectButton: {
    height: 60,
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'white',
  },
  rectButtonText: {
    backgroundColor: 'transparent',
  },
  drawerContainer: {
    flex: 1,
  },
  pageInput: {
    height: 60,
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#eee',
  },
  drawerText: {
    margin: 10,
    fontSize: 15,
    textAlign: 'left',
  },
});