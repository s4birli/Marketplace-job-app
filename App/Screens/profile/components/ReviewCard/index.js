import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Picker
} from 'react-native';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import styles from './index.style'
import { Rating, CheckBox, Badge } from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import {my_reviews} from '../../../../services/myReviews'
import {
  user_reviews
} from '../../../../services/userReviews';
import { StackViewTransitionConfigs } from 'react-navigation-stack';

let offsetNum = 2;
const SubReviewList = props => {
    let subrating = Math.round((parseFloat(props.communication_level) + parseFloat(props.quality_of_delivered_work) + parseFloat(props.recommended_for_others))/3*10)/10
      return(
        <View>
          <View style={styles.doshline} />
          <View style={styles.reviewCardUpper}>
            <View style={styles.reviewCardAvatarContainer}>
                <Image style={styles.reviewCardAvatar} source={{uri: props.profile}} />
            </View>
            <View style={{flex:1}}>
              <View style={{marginLeft: 15, flexDirection: 'row', alignContent:'space-between'}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize: 12}}>{props.name}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Rating
                    type="star"
                    fractions={1}
                    startingValue={subrating}
                    readonly
                    imageSize={16}
                    onFinishRating={this.ratingCompleted}
                  />
                  <Text>
                    {JSON.stringify(subrating).length == 1?JSON.stringify(subrating)+'.0':JSON.stringify(subrating)}
                  </Text>
                </View>
              </View>
              <View style={{marginLeft: 15}}>
                <Text style={{textAlign:'left'}}>
                  {props.messages}
                </Text>
                <Text style={{textAlign:'left'}}>
                  {props.or_created_at}
                </Text>
              </View> 
            </View>
          </View>
        </View>
      )
  }
const ReviewCard = props => {
    const {profile, myReviews, reviewRating, reviewCount} = props;
    const [data, setData] = useState('');
    const [rating, setRating] = useState('');
    const [userType, setUserType] = useState(0);
    const getRatings = async (token, id, type) => {
        const users_review_response = await review_detail(token, props.rootId, 0)
        if (users_review_response.status === 1) {
        setData(users_review_response.data)
        // setReview(users_review_response.data)
        }
    }
    const getMyreview = async() => {
      console.log("usertype============",userType)
        let requestData = JSON.stringify({
            'user_id': profile.id,
            'type': userType,
            'offset': 0
          })
        const users_review_response = await user_reviews(props.token, requestData)
        console.log("user====================",users_review_response)
        if (users_review_response.status === 1) {
            setData(users_review_response.data.reviews)
            setRating(users_review_response.data)
        }
    }
    useEffect(() => {
        getMyreview();
    },[]) 
    useEffect(() => {
      getMyreview();
    },[userType]) 
    loadMore = async() => {
        let requestData = JSON.stringify({
            'user_id': profile.id,
            'type': userType,
            'offset': offsetNum
        })
        const users_review_response = await user_reviews(props.token, requestData)
        console.log("users_review_response=========",...users_review_response.data.reviews)
        if (users_review_response.status === 1) {
          offsetNum = offsetNum+2;
          setData([...data,...users_review_response.data.reviews])
          // setReview(users_review_response.data)
        }
    }
    useEffect(() => {
    // if (profile) {
    //     getRatings(props.token, userProfile.id, userProfile.type)
    // }
    }, [profile])
    return (
        <View style={styles.reviewCard}>
            {console.log("userreviewwwwwwwwwwww", rating.reviews)}
            {(data != undefined && data.length>0) ?
            <>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.description}>Reviews</Text>
                <View style={{color:'#212529', borderWidth: 1,borderColor: '#E0E6EE',borderRadius: 4, width: 135, height: 30, justifyContent:'center', marginHorizontal: 10  }}>
                    <Picker
                        // style={{fontSize:6}}
                        selectedValue={userType}
                        activeItemTextStyle={{fontSize: 6, fontWeight: 'bold'}}
                        onValueChange={(itemValue, itemIndex) =>{
                            setUserType(itemValue);
                            getMyreview();
                        }
                        }
                        mode="dropdown"
                    >
                        <Picker.Item style={{ fontSize: 6 }} label="As Seller" value="0" />
                        <Picker.Item style={{ fontSize: 6 }} label="As Buyer" value="1" />
                    </Picker>
                </View>
                <Rating
                  type="star"
                  fractions={1}
                  ratingCount={1}
                  startingValue={Math.round((reviewRating)*10)/10}
                  readonly
                  imageSize={20}
                  onFinishRating={this.ratingCompleted}
                />
                <Text style={styles.ratingTextStyle}>{reviewRating}</Text>
                <Text style={{ color : '#212529' , fontSize : 14 , fontWeight : 'bold'}}>({reviewCount})</Text>
            </View>
            <View style={styles.subreview}>
                <View style={styles.subreviewItem}>
                <Text style={styles.subreviewTextStyle}>
                    COMMUNICATION LEVEL
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {rating.communication_level != '' &&
                    <Rating
                    type="star"
                    fractions={1}
                    startingValue={Math.round(parseInt(rating.communication_level)/2)}
                    readonly
                    imageSize={16}
                    onFinishRating={this.ratingCompleted}
                    />
                    }
                    <Text style={styles.ratingTextStyle}>{parseInt(rating.communication_level)/2}</Text>
                </View>
                </View>
                <View style={styles.subreviewItem}>
                <Text style={styles.subreviewTextStyle}>
                    QUALITY OF WORK
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {rating.quality_of_delivered_work != 0 &&
                    <Rating
                    type="star"
                    fractions={1}
                    startingValue={Math.round(parseInt(rating.quality_of_delivered_work)/2)}
                    readonly
                    imageSize={16}
                    onFinishRating={this.ratingCompleted}
                    />
                    }
                    <Text style={styles.ratingTextStyle}>{parseInt(rating.quality_of_delivered_work)/2}</Text>
                </View>
                </View>
                <View style={styles.subreviewItem}>
                <Text style={styles.subreviewTextStyle}>
                    RECOMMEND TO OTHERS
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {rating.recommended_for_others != 0 &&
                    <Rating
                    type="star"
                    fractions={1}
                    startingValue={Math.round(parseInt(rating.recommended_for_others)/2)}
                    readonly
                    imageSize={16}
                    onFinishRating={this.ratingCompleted}
                    />
                    }
                    <Text style={styles.ratingTextStyle}>{parseInt(rating.recommended_for_others)/2}</Text>
                </View>
                </View>
            </View>
            {data.length > 0 &&
                <FlatList
                data={data}
                removeClippedSubviews={true}
                renderItem={({ item }) => (
                    <SubReviewList {...item} navigation={props.navigation}/>
                )}
                keyExtractor={(item, index) => index.toString()}
                />
            }
            <View style={{alignItems:'center', marginTop: 20}}>
                <TouchableOpacity onPress={loadMore} style={styles.loadMoreBT}>
                <Text style={styles.loadMoreText}>
                    Load More
                </Text>
                </TouchableOpacity>
            </View>
            </>
            :
            <>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.description}>Reviews</Text>
                <View style={{color:'#212529', borderWidth: 1,borderColor: '#E0E6EE',borderRadius: 4, width: 135, height: 30, justifyContent:'center'  }}>
                    <Picker
                        // style={{fontSize:6}}
                        selectedValue={userType}
                        activeItemTextStyle={{fontSize: 6, fontWeight: 'bold'}}
                        onValueChange={(itemValue, itemIndex) =>{
                            setUserType(itemValue);
                            getMyreview();
                        }
                        }
                        mode="dropdown"
                    >
                        <Picker.Item style={{ fontSize: 6 }} label="As Seller" value="0" />
                        <Picker.Item style={{ fontSize: 6 }} label="As Buyer" value="1" />
                    </Picker>
                </View>
              </View>
              <View style={{marginLeft: 20, marginTop: 30}}>
                <Text style={{fontSize:18}}>
                  Nothing yet to show!
                </Text>
              </View>
              </>
            }
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
  
const ProfileReviewCardScreen = connect(mapStateToProps)(ReviewCard);
export default ProfileReviewCardScreen;
