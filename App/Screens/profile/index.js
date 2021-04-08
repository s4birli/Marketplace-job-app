import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {profilerequest} from './actions/actions';
import PackageTable from '../../commons/packageTable';
import Header from '../../commons/header';
import ProfileCard from './components/ProfileCard';
import RootCard from './components/RootCard';
import ReviewCard from './components/ReviewCard';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import {my_reviews,awarded_reviews} from '../../services/myReviews'
import {
  other_roots, user_roots
} from '../../services/otherRoots'
import { 
  user_reviews 
} from '../../services/userReviews';
import {
profile_service
} from '../../services/profile';
import { 
  get_conversation 
} from '../../services/getConversation';


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      myReviews:[],
      myRoots:[],
      userReviews : '',
      profileData:'',
      userId: this.props.navigation.getParam('user_id',this.props.user_id) 
    }
  }

  componentDidMount = async () => {
    console.log('newuser',this.props.navigation.getParam('user_id',this.props.user_id))
    this.setState({
      userId:this.props.navigation.getParam('user_id',this.props.user_id)
    })
    let requestData={
      token : this.props.token,
      user_id : this.state.userId
    }
    // props.dispatch(profilerequest(this.props.token,this.state.userId));
    const responseUserData = await profile_service(requestData)
    if(responseUserData.status === 1){
      this.setState({ profileData:responseUserData.data})
    }
    const response = await my_reviews(this.props.token)
    if(response.status === 1){
      this.setState({ myReviews:response.data})
    }
    const roots_response = await user_roots(this.props.token,this.state.userId)
    if(roots_response.status === 1){
      this.setState({ myRoots :roots_response.data})
    }
    requestData = JSON.stringify({
      'user_id' : this.state.userId,
      'type' : this.props.type
    })
    const users_review_response = await user_reviews(this.props.token,requestData)
    if(users_review_response.status === 1){
      this.setState({ userReviews :users_review_response.data})
    }
  };

  getUserProfile = async (token, userId) => {
    const requestData = {
      token,
      user_id: userId
    }
    const response = await profile_service(requestData);
    if (response.status === 1) {
        return response.data
    }
  }

  handleContact = async (username) => {
    const response = await get_conversation(this.props.token, username);
    this.getUserProfile(this.props.token, response.data.opponent.id).then(userProfile =>{
      if (response.status === 1) {
        this.props.navigation.navigate('ChatScreen', { 'user': response.data.opponent, 'user_data': userProfile })
      } else {
        Alert.alert('Error while contact.')
      }
    })
  }

  render(){
  return (
    <DrawerWrapper {...this.props}>
      <ScrollView 
      
      style={styles.profile}>
      { this.state.profileData ?
        <>
        <ProfileCard
          isContact={this.props.user_id !== this.state.userId ? true : false } 
          navigation={this.props.navigation}
          data={this.state.profileData}
          handleContact={this.handleContact}
          socket={global.socket}
        />
          <View style={{ height: 25 }} />
        </>
        :
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#10A2EF" />
        </View>  
      }
      { this.state.myRoots.length > 0 && this.state.profileData?
        <>
        <RootCard 
          navigation={this.props.navigation}
          myRoots={this.state.myRoots}
          data={this.state.profileData}
          userId={this.state.userId}
          position={"profile"}
          token={this.props.token}
        />
        <View style={{ height: 10 }} />
        </>
        :
         null 
      }
      <View>

      </View>
      { this.state.myReviews.length > 0 && this.state.userReviews && this.state.userReviews.reviews.length > 0 && this.state.profileData?
          <>
          <ReviewCard 
            navigation={this.props.navigation}
            myReviews={this.state.myReviews}
            ratings={this.state.userReviews}
            profile={this.state.profileData}
            reviewRating={this.state.profileData.rating}
            reviewCount={this.state.profileData.rating_count}
          />
          <View style={{ height: 150 }} />
          </>
        :
        null
      }
      </ScrollView>
    </DrawerWrapper>
  );
  }
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    user_id : state.LoginUser.user_id,
    type : state.LoginUser.type,
    profileData: state.userProfile.profiledata,
  };
};



const profileScreen = connect(
  mapStateToProps,
)(Profile);

export default profileScreen;

const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

/**
 * 
 * <PackageTable
            {...this.props}
            data={
              {
                'is_online' : 1,
                'r_root_image' : this.state.profileData.profile,
                'name' : this.state.profileData.first_name,
                'r_rating_count' : 5,
                'country' : this.state.profileData.country,
                'response_time' : 50000 ,
                'isPrifilePage' : true ,
                'rootFiles' : [{},{}],
                'profile' : this.state.profileData.profile,
                'type' : this.state.profileData.type,
                'myReviews' : this.state.myReviews,
                'myRoots' : this.state.myRoots,
                'flag' : this.state.profileData.flag,
                'member_since' : this.state.profileData.member_since,
                'local_time' : this.state.profileData.local_time,
                'preffered_language' : this.state.profileData.preffered_language,
                'additional_language' : this.state.profileData.additional_language,
                'skills' : this.state.profileData.skills
              }
             }
          />
 * 
 */
