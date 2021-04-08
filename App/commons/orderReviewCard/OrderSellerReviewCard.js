import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Rating} from 'react-native-ratings';
import {submitRating} from '../../services/order/index'

const OrderSellerReviewCard = (props) => {
  const {submitReview} = props;
  const [textLength, setTextLength] = useState(0);
  const [reviewMeg, setReviewMeg] = useState('');
  const [comRate, setComRate] = useState(0); 
  const [quaRate, setQuaRate] = useState(0); 
  const [recRate, setRecRate] = useState(0); 
  const comratingCompleted = ( rating ) => {
    console.log( `Rating is: ${rating}` );
    setComRate(rating);
    setQuaRate(rating);
    setRecRate(rating);
  }
  return (
    <View style={styles.reviewCard}>
        <View style={styles.subreview}>
            <View style={{flexDirection: 'row'}}>
                <Rating
                    type="star"
                    fractions={1}
                    ratingCount={5}
                    startingValue={0}
                    imageSize={22}
                    onFinishRating={comratingCompleted}
                />
            </View> 
        </View>
        <ScrollView style={styles.inputdesc}>
            <TextInput
                onChangeText={text => {setReviewMeg(text); setTextLength(text.length)}}
                value={reviewMeg}
                placeholder="Help the community by sharing your order experience..."
                minLength={10}
                multiline={true}
            /> 
        </ScrollView>
        <View style={{marginLeft:3}}>
            <Text>{textLength} Characters(Minimum 10 Characters)</Text>
        </View>
        <View style={{alignItems:'center', marginTop: 15}}>
            <TouchableOpacity onPress={() => submitReview(reviewMeg, comRate, quaRate, recRate)} style={styles.loadMoreBT}>
                <Text style={styles.loadMoreText}>
                    Submit Rating
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    profileData: state.userProfile.profiledata,
    userId: state.LoginUser.user_id,
  };
};
const OrderSellerReviewCardScreen = connect(mapStateToProps)(OrderSellerReviewCard);

export default OrderSellerReviewCardScreen;
