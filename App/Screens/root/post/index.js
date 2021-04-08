import React, { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Picker,
  Dimensions,
  Alert,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import styles from './index.style';
import Header from '../../../commons/header';
import DrawerWrapper from '../../../commons/rightDrawerWrapper';
import TitlePage from '../components/TitlePage';
import DetailsPage from '../components/DetailPage';
import PricingPage from '../components/PricingPage';
import ReviewPage from '../components/ReviewPage';
import {postRoot} from '../../../services/root/post';
import {
  clearRootData,
  saveRootData
} from '../actions/actions'

const PostRoot = (props) => {

  const [screen,setScreen] = useState('Title');
  const [isLoading,setIsLoading] = useState(false);
  //Title Page
  const [isTitlePageComplete,setIsTitlePageComplete] = useState(false);
  const [showTitlePageError,setShowTitlePageError] = useState(false);
  //Price Page
  const [isPricePageComplete,setIsPricePageComplete] = useState(false);
  const [showPricePageError,setShowPricePageError] = useState(false);
  //Details Page
  const [isDetailsPageComplete,setIsDetailsPageComplete] = useState(false);
  const [showDetailsPageError,setShowDetailsPageError] = useState(false);
  {/*set new screen*/}
  const nextScreen = (screen) => setScreen(screen);

  useEffect(()=>{
    return()=>{
      props.dispatch(clearRootData())
    }
  },[])

  useEffect(()=>{
    if(props.navigation.getParam('requestData')){
      console.log('props.navigation',props.navigation.getParam('requestData'));
      props.dispatch(saveRootData(props.navigation.getParam('requestData')))
    }
  },[props.navigation.getParam('requestData')])
  
  const showScreen = () => {

    //handle save as draft / post new root
    const handlePostRoot = async (data) => {
      setIsLoading(true)
      console.log('data',data)
      const response = await postRoot(props.token,data);
      console.log('post root',response)
      if (response.status === 1) {
        setIsLoading(false);
        Alert.alert(response.message);
        props.navigation.replace('MyRoots');
      }else if(response.status === 0){
        setIsLoading(false);
        Alert.alert(response.message);
      }   
    }

    return(
      <>
        {
          screen === 'Title' ? 
          <TitlePage
          nextScreen={nextScreen}
          handlePostRoot={handlePostRoot}
          showTitlePageError={showTitlePageError}
          setIsTitlePageComplete={setIsTitlePageComplete}
          {...props}
          /> : null
        }
        {
          screen === 'Pricing' ? 
          <PricingPage
          handlePostRoot={handlePostRoot}
          nextScreen={nextScreen}
          showPricePageError={showPricePageError}
          setIsPricePageComplete={setIsPricePageComplete}
          {...props}
          /> : null
        }
        {
          screen === 'Details' ? 
          <DetailsPage
          handlePostRoot={handlePostRoot}
          nextScreen={nextScreen}
          showDetailsPageError={showDetailsPageError}
          setIsDetailsPageComplete={setIsDetailsPageComplete}
          {...props}
          /> : null
        }
         {
          screen === 'Review' ? 
          <ReviewPage
          handlePostRoot={handlePostRoot}
          nextScreen={nextScreen}
          {...props}
          /> : null
        }
      </>
    )
  }

  return (
    <DrawerWrapper {...props}>
      <View style={{ flex: 1 }}>
        <ScrollView 
         refreshControl={ 
          <RefreshControl refreshing={isLoading}/>
        }
        style={styles.container}>
          <View>
            <Text 
            style={styles.titleText}
            >Post New Root</Text>
          </View>
          <View 
            style={{ 
              borderWidth: 1, 
              borderRadius: 50, 
              marginTop: 20, 
              borderColor: '#DDD',
              paddingLeft:15
            }}>
            <Picker
              selectedValue={screen}
              style={{ height: 50, width: Dimensions.get('window').width / 1.2,  }}
              onValueChange={(itemValue, itemIndex) =>{
                if(screen === 'Title'){
                  if(!isTitlePageComplete) return setShowTitlePageError(true);
                }
                // if(isTitlePageComplete) setShowTitlePageError(false);
                // if(isPricePageComplete) setShowPricePageError(false);
                if(itemValue !== 'Title' && screen === 'Pricing') {
                  if(!isPricePageComplete) return setShowPricePageError(true);
                }
                if(itemValue === 'Review' && screen === 'Details') {
                  if(!isDetailsPageComplete) return setShowDetailsPageError(true);
                }
                setScreen(itemValue)
              }}>
              <Picker.Item label="Title" value="Title" />
              <Picker.Item label="Pricing" value="Pricing" />
              <Picker.Item label="Details" value="Details" />
              <Picker.Item label="Review" value="Review" />
            </Picker>
          </View>
          <View style={{ height: 15 }} />
          {showScreen()}
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </DrawerWrapper>
  );
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};

const PostRootScreen = connect(
  mapStateToProps,
)(PostRoot);

export default PostRootScreen;
