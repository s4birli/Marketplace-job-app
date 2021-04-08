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
import { connect } from "react-redux";
import {recentlyBought} from '../actions/actions'
const RECENTLY_BOUGHT = [
    {
      id: 1,
      name: 'I will design a modern, minimalistic logo design.',
      image: require('../../../assets/images/2.png'),
    },
  ];

 class RecentlyBoughtScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            recommendedViewStyle: 'list',
            latestViewStyle: 'grid',
            offset:0
          };
    }

  componentDidMount = () => {
    this.props.callRecent(this.state.offset,this.props.login.userToken)
  };
  render() {
    return (
        <View style={styles.card}>
        <View style={styles.cardUpper}>
          <Text style={styles.cardHeader}>Recently Bought</Text>
        </View>
        <View style={{paddingTop: 20, paddingHorizontal: 20}}>
          <FlatList
            data={RECENTLY_BOUGHT}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.recentlyViewed}>
                <View style={styles.recentImageContainer}>
                  <Image style={styles.recentImage} source={item.image} />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    numberOfLines={2}
                    style={styles.recentlyBoughtText}>
                    {item.name}
                  </Text>
                  <Text style={styles.buyItAgain}>BUY IT AGAIN</Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    login:state.LoginUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callRecent: (offset,token) => {
      dispatch(recentlyBought(offset,token));
    }
  };
};

const RecentlyBought = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentlyBoughtScreen);
export default RecentlyBought;

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
    flex: 1,
    height: null,
    width: null,
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
