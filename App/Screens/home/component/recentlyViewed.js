import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Recently_viewed} from '../../../services/home'
import {recentlyViewed} from '../actions/actions'
const RECENTLY_VIEWED = [
  {
    id: 1,
    name: 'I will design a modern, minimalistic logo design.',
    image: require('../../../assets/images/1.png'),
  },

  {
    id: 2,
    name: 'I will create a Social Logo',
    image: require('../../../assets/images/2.png'),
  },

  {
    id: 3,
    name: 'Send bulk whats app to any country.',
    image: require('../../../assets/images/3.png'),
  },
];

 class RecentlyViewed extends Component {
    constructor(props){
        super(props);
        this.recent = []
    }

    

  // componentDidMount = async() => {
  //   this.props.callUserRecent(0,this.props.token)
  //   // const  recents = await Recently_viewed(this.props.token)
  //   // this.recent = await recents
  //   // if(response.status == 1){
  //   //   this.recent = response.data.recent_viewed
  //   // }
  //   // console.log("recently viewed response",response)
  // };
  render() {
    console.log("Recent roots props",this.props.recentRoots)
    const {recentRoots} = this.props
    if(recentRoots.length>0){
    return (
      <View style={styles.card}>
        
        <View style={styles.cardUpper}>
          <Text style={styles.cardHeader}>Recently Viewed</Text>
        </View>
        <View style={{paddingTop: 20, paddingHorizontal: 20}}>
        {recentRoots.recent  &&
          <FlatList
            data={recentRoots.recent}
            renderItem={({item}) => (
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('RootPage',{
                isreview:true,
                token:this.props.token,
                root_id:item.r_id,
                user_id:item.r_user_id
              })}
              style={styles.recentlyViewed}>
                <View style={styles.recentImageContainer}>
                  <Image resizeMethod= "resize" style={styles.recentImage} source={{uri:item.r_root_image}} />
                </View>
                <Text numberOfLines={2} style={styles.recentText}>
                  {item.r_title}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
            }
        </View>
  
      </View>
    )}
    else{
      return <View />
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    recentRoots:state.recentViewRoots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callUserRecent: (offset,token) => {
      dispatch(recentlyViewed(offset,token));
    },
  };
};

const recent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentlyViewed);

export default recent;

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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEF1',
  },
  cardHeader: {
    fontSize: 16,
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
  popularCatogery: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#D5EBF6',
    marginVertical: 4,
    marginHorizontal: 6,
  },
  popularCatogeryText: {fontSize: 8, textAlign: 'center', color: '#10A2EF'},
  recentlyViewed: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  recentImageContainer: {
    height: 60,
    width: 86,
    borderRadius: 6,
    overflow: 'hidden',
  },
  recentImage: {
    
    height: 60,
    width: 86,
  },
  recentText: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
    color: '#748F9E',
    fontWeight: 'bold',
  },
  recentlyBoughtText: {
    fontSize: 12,
    flex: 1,
    flexShrink: 1,
    marginLeft: 10,
    color: '#748F9E',
    fontWeight: 'bold',
  },
  buyItAgain: {
    fontSize: 10,
    color: '#10A2EF',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  feedCard: {
    // paddingHorizontal: 20
  },
  feedCardUpper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedImageContainer: {
    marginTop: 25,
    height: 200,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
  },
  feedImage: {flex: 1, height: null, width: null},
  feedName: {
    marginVertical: 20,
    fontSize: 12,
    color: '#748F9E',
    fontWeight: 'bold',
  },
  feedDetailsTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  feedDetailsTopLeft: {flexDirection: 'row', justifyContent: 'space-between'},
  feedDetailsTopRight: {flexDirection: 'row', alignItems: 'center'},
  feedAvatarContainer: {
    height: 32,
    width: 32,
    overflow: 'hidden',
    borderRadius: 16,
  },
  feedAvatar: {flex: 1, height: null, width: null},
  feedCategory: {fontSize: 10, fontWeight: 'bold', color: '#748F9E'},
  feedBadgeText: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2EC09C',
  },
  feedDetailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starRatingText: {marginLeft: 10, color: '#FCB059', fontSize: 10},
  startingPrice: {fontSize: 12, fontWeight: 'bold', color: '#2EC09C'},
  feedListCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
  },
  feedListImageContainer: {height: 65, width: 90, overflow: 'hidden'},
  feedListImage: {flex: 1, height: null, width: null},
  feedListRight: {
    flex: 1,
    marginHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  feedListName: {
    fontSize: 12,
    color: '#748F9E',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  loadMoreContainer: {
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 40,
    borderRadius: 6,
    backgroundColor: '#10A2EF',
    paddingVertical: 10,
  },
  loadMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
