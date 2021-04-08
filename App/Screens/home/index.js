import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Header from '../../commons/header';
import styles from './index.style';
import RootCard from '../../commons/rootCard';
import RootCardHorizontal from '../../commons/RootCardHorizontal';
import RootCardList from '../../commons/rootCardList';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import Greeting from './component/greeting';
import PopularCategory from './component/popularCategory';
import RecentlyViewed from './component/recentlyViewed';
import RecentlyBought from './component/recentlyBought';
import { get_roots } from '../../services/getRoots';
import { registerDevice } from '../../services/home/index'
import SocketIOClient from 'socket.io-client/dist/socket.io';
import firebase  from 'react-native-firebase';

import {
  rootsRequest,
  getCategories,
  getRegex,
} from './actions/actions';
import { profilerequest } from '../profile/actions/actions';

const Home = (props) => {
  const [allRoots, setAllRoots] = useState('');
  const [latestRoots, setLatestRoots] = useState([]);
  const [topRatedRoots, setTopRatedRoots] = useState([]);
  const [popularRoots, setPopularRoots] = useState([]);
  const [recentlyViewedRoots, setRecentlyViewedRoots] = useState([]);
  const [latestRootsOffset, setLatestRootsOffset] = useState([]);
  const [topRatedRootsOffset, setTopRatedRootsOffset] = useState([]);
  const [popularRootsOffset, setPopularRootsOffset] = useState([]);
  const [recentlyBoughtRoots, setRecentlyBoughtRoots] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  //refresh function
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  console.disableYellowBox = true;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    props.dispatch(rootsRequest(props.login.userToken, 'all'))
    props.dispatch(getCategories(props.login.userToken))
    props.dispatch(profilerequest(props.login.userToken, props.login.user_id))

    // props.dispatch(getRegex(props.login.userToken))
    wait(4000).then(() => setRefreshing(false));
  }, [refreshing]);

  getTokens = async () => {
    fcmToken = await AsyncStorage.getItem('fcmToken');
    deviceToken = await AsyncStorage.getItem('device_id');
    console.log("fcmToken , deviceId", fcmToken, deviceToken);
    let register = await registerDevice(props.token, fcmToken, deviceToken)
    console.log("********************", register)
  }

  useEffect(() => {
    let socket = SocketIOClient(`https://${global.socketURL}?user_id=` + props.userId);
    global.socket = socket;
    socket.on('disconnect', (res, err) => console.log("result======>",res, err))
    if (props.userId){
      socket.on('connect', () => {
          console.log('connected in app at socket.tribital.ml?user_id=' + props.userId)
      });
      socket.on('connect_error', (err) => { console.log("SOCKET CONNECTION ERR ----", err) })
    }
    getTokens();
  }, []);
  
  // useEffect(() => {
  //   console.log('bbbbbbbbbbbbbbbbbbb', url)
  //   if (url != ''){
  //     let socket = SocketIOClient(`https://${url}?user_id=` + props.userId);
  //     global.socket = socket;
  //     console.log("socketttttttttttttttt",global.socket)
  //     socket.on('disconnect', (res, err) => console.log("result======>",res, err))
  //     if (props.userId){
  //       socket.on('connect', () => {
  //           console.log('connected in app at socket.tribital.ml?user_id=' + props.userId)
  //       });
  //       socket.on('connect_error', (err) => { console.log("SOCKET CONNECTION ERR ----", err) })
  //     }
  //   }   
  //   }, [url])

  useEffect(() => {
    props.dispatch(rootsRequest(props.login.userToken, 'all'))
    props.dispatch(getCategories(props.login.userToken))
    props.dispatch(profilerequest(props.login.userToken, props.login.user_id))
  }, [])

  useEffect(() => {
    console.log('props.getRoots', props.getRoots)
    if (!props.getRoots.error) {
      setAllRoots(props.getRoots.all);
    } else if (props.getRoots.error) {
      Alert.alert('Error while getting roots')
    }
  }, [props.getRoots])

  useEffect(() => {
    console.log("allRoots=======", allRoots)
    if (allRoots) {
      if (allRoots.latest) {
        setLatestRoots(allRoots.latest);
        setLatestRootsOffset(allRoots.latest_offset);
      }
      if (allRoots.top) {
        setTopRatedRoots(allRoots.top);
        setTopRatedRootsOffset(allRoots.top_offset)
      }
      if (allRoots.popular) {
        setPopularRoots(allRoots.popular);
        setPopularRootsOffset(allRoots.popular_offset);
      }
      if (allRoots.recent_viewed) {
        setRecentlyViewedRoots(allRoots.recent_viewed);
      }
      if (allRoots.recent_bought) {
        setRecentlyBoughtRoots(allRoots.recent_bought);
      }
    }
  }, [allRoots])

  handleLoadMore = async key => {
    if (key === 'latest') {
      setIsLoading(true)
      const data = {
        'type': 'latest',
        'offset': latestRootsOffset,
        'limit': 9
      }
      const response = await get_roots(props.login.userToken, data);
      setIsLoading(false)
      if (response.status === 1) {
        const newData = [...response.data.latest, ...latestRoots]
        setLatestRoots(newData);
        setLatestRootsOffset(newData.latest_offset);
      }
    }
    if (key === 'top') {
      setIsLoading(true)
      const data = {
        'type': 'top',
        'offset': topRatedRootsOffset,
        'limit': 9
      }
      const response = await get_roots(props.login.userToken, data);
      setIsLoading(false)
      if (response.status === 1) {
        const newData = [...response.data.top, ...topRatedRoots]
        setTopRatedRoots(newData);
        setTopRatedRootsOffset(newData.top_offset)
      }
    }
    if (key === 'popular') {
      setIsLoading(true)
      const data = {
        'type': 'popular',
        'offset': popularRootsOffset,
        'limit': 9
      }
      const response = await get_roots(props.login.userToken, data);
      setIsLoading(false)
      if (response.status === 1) {
        const newData = [...response.data.popular, ...popularRoots]
        setPopularRoots(newData);
        setPopularRootsOffset(newData.popular_offset);
      }
    }
  };
  console.log("recentlyViewedRoots====>",topRatedRoots)
  return (
    <DrawerWrapper {...props}>
      <View style={styles.home}>
        {props.profileData !== null&&
        <>
          {
            (props.login.type == 0 && (props.profileData.first_name == '' || props.profileData.last_name == '' || props.profileData.country == ''|| props.profileData.email == ''|| props.profileData.timezone == '' || props.profileData.description == ''))&&
            <View style={styles.redbarStyle}>
              <Text style={styles.redbartextStyle}>
                Please complete your profile to post a new root
              </Text>
            </View>
          }
        </>
        }
        <ScrollView style={styles.homeContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing || isLoading ? true : false} onRefresh={onRefresh} />
          }
        >
          {/* Greeting Card */}
          <Greeting {...props} navigation={props.navigation} />
          {/* Home page image */}
          <View style={styles.mainBannerStyle}>
            <Image
              style={styles.mainBannerImageStyle}
              source={require('../../assets/images/home-user-banner.jpg')} />
          </View>
          {/* Top Rated Roots */}
          <View>
            <View style={styles.feedCard}>
              <Text style={styles.cardHeaderTitle}>
                Top Rated Roots
              </Text>
              <Text style={styles.cardHeaderSubtitle}>
                -  Best Sellers
                </Text>
            </View>
            {/* Cards */}
            {
              topRatedRoots.length > 0 ? (<>
                <FlatList
                  data={topRatedRoots}
                  renderItem={({ item }) => (
                    <RootCard {...item} navigation={props.navigation} socket={global.socket} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  style={styles.loadMoreContainer}
                  onPress={() => {
                    handleLoadMore('top');
                  }}>
                  <Text style={styles.loadMoreText}>LOAD MORE</Text>
                </TouchableOpacity>
              </>
              ) : (
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#10A2EF" />
                  </View>
                )
            }
          </View>
          {/* Popular Roots */}
          <View>
            <View style={styles.feedCard}>
              <Text style={styles.cardHeaderTitle}>
                Popular Roots
              </Text>
              <Text style={styles.cardHeaderSubtitle}>
                -  Trendy Services
              </Text>
            </View>
            {/* Cards */}
            {
              popularRoots.length > 0 ? (<>
                <FlatList
                  data={popularRoots}
                  renderItem={({ item }) => (
                    <RootCard {...item} navigation={props.navigation} socket={global.socket}/>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  style={styles.loadMoreContainer}
                  onPress={() => {
                    handleLoadMore('popular');
                  }}>
                  <Text style={styles.loadMoreText}>LOAD MORE</Text>
                </TouchableOpacity>
              </>
              ) : (
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#10A2EF" />
                  </View>
                )
            }
          </View>
          {/* Latest Roots */}
          <View>
            <View style={styles.feedCard}>
              <Text style={styles.cardHeaderTitle}>
                Latest Roots
                  </Text>
              <Text style={styles.cardHeaderSubtitle}>
                -  New arrivals
                </Text>
            </View>
            {/* Cards */}
            {
              latestRoots.length > 0 ? (<>
                <FlatList
                  data={latestRoots}
                  renderItem={({ item }) => (
                    <RootCard {...item} navigation={props.navigation} socket={global.socket} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  style={styles.loadMoreContainer}
                  onPress={() => {
                    handleLoadMore('latest');
                  }}>
                  <Text style={styles.loadMoreText}>LOAD MORE</Text>
                </TouchableOpacity>
              </>
              ) : (
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#10A2EF" />
                  </View>
                )
            }
          </View>
          {/* Recently Viewd */}
          <View style={styles.cardView}>
            <View style={styles.headerViewStyle}>
              <Text style={styles.cardHeaderTitle}>
                Recently Viewed
              </Text>
            </View>
            <View style={styles.doshline} />
            {/* Cards */}
            {
              recentlyViewedRoots.length > 0 ? (<>
                <FlatList
                  horizontal
                  data={recentlyViewedRoots}
                  renderItem={({ item }) => (
                    <RootCardHorizontal {...item} navigation={props.navigation} socket={global.socket}/>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
              ) : (
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#10A2EF" />
                  </View>
                )
            }
          </View>
          <View style={styles.cardView}>
            <View style={styles.headerViewStyle}>
              <Text style={styles.cardHeaderTitle}>
                Recently Bought
              </Text>
            </View>
            <View style={styles.doshline} />
            {/* Cards */}
            {
              recentlyBoughtRoots.length > 0 ? (<>
                <FlatList
                  horizontal
                  data={recentlyBoughtRoots}
                  renderItem={({ item }) => (
                    <RootCardHorizontal {...item} navigation={props.navigation} socket={global.socket}/>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
              ) : (
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#10A2EF" />
                  </View>
                )
            }
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </DrawerWrapper>
  );
}

const mapStateToProps = state => {
  return {
    login: state.LoginUser,
    getRoots: state.getRoots,
    token: state.LoginUser.userToken,
    profileData: state.userProfile.profiledata,
    userId: state.LoginUser.user_id,
  };
};
const Main = connect(mapStateToProps)(Home);

export default Main;

