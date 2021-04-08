import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
  Share,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import ReportModal from './components/ReportModal';
import SliderModal from './components/SliderModal';
import { Rating, CheckBox, Badge } from 'react-native-elements';
import { Button } from 'native-base';
import { SliderBox } from "react-native-image-slider-box";
import Dash from 'react-native-dash';
import { connect } from 'react-redux';
import Header from '../../commons/header';
import PackageTable from '../../commons/packageTable';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import { profilerequest } from './actions/actions';
import ProfileCard from '../../commons/ProfileCard/index';
import RootCard from '../../commons/OtherRootItem';
import ReviewCard from '../../commons/reviewCard';
import FlexibleCard from '../../commons/flexiableCard'
import SnapCarousel from './components/CustomCarousel/snap_carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../commons/responsive_design';
import {
  root_details,
  review_detail,
  profile_service
} from '../../services/profile';
import { my_reviews } from '../../services/myReviews';
import {
  add_to_favorite,
  check_favorite,
  remove_favorites
} from '../../services/myFavorites';
import {
  get_conversation
} from '../../services/getConversation';
import {
  other_roots
} from '../../services/otherRoots'
import {
  user_reviews
} from '../../services/userReviews';
import { getFinalPriceService } from '../../services/payments/payments'
import styles from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const RootPage = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timePassed, setTimePassed] = useState(false);
  const [rootDetails, setRootDetails] = useState('');
  const [reviewDetails, setReviewDetails] = useState('');
  const [otherRootsDetails, setOtherRootsDetails] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [extraRevision, setExtraRevision] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [isExtra1, setIsExtra1] = useState(false);
  const [isExtra2, setIsExtra2] = useState(false);
  const [isExtra3, setIsExtra3] = useState(false);
  const [extra1Price, setExtra1Price] = useState('');
  const [extra1Days, setExtra1Days] = useState('');
  const [extra2Price, setExtra2Price] = useState('');
  const [extra2Days, setExtra2Days] = useState('');
  const [extra3Price, setExtra3Price] = useState('');
  const [extra3Days, setExtra3Days] = useState('');
  const [extra1Description, setExtra1Description] = useState('');
  const [extra2Description, setExtra2Description] = useState('');
  const [extra3Description, setExtra3Description] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryDay, setDeliveryDay] = useState(0);
  const [maxDays, setMaxDays] = useState(0);
  const [revision, setRevision] = useState(0);
  const [flexiblePrice, setFlexiblePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState('');
  const [description, setDescription] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [isSliderVisible, setSliderVisible] = useState(false);

  useEffect(() => {
    setTimePassed(true);
    return () => {
      setTimePassed(false),
      setRootDetails('');
      setRatings('');
      setUserProfile('');
    }
  }, [])

  const getRootDetails = async (token, rootId) => {
    const response = await root_details(token, rootId);
    if (response.status === 1) {
      setRootDetails(response.data);
    }
  }

  const getOtherRootDetails = async (token, rootId, userId) => {
    const response = await other_roots(token, rootId, userId);
    if (response.status === 1) {
      setOtherRootsDetails(response.data);
    }
  }

  const getUserProfile = async (token, userId) => {
    const requestData = {
      token,
      user_id: userId
    }
    const response = await profile_service(requestData);
    if (response.status === 1) {
      setUserProfile(response.data);
    }
  }

  const getReviewDetails = async (token, id) => {
    const response = await review_detail(token, id)
    if (response.status === 1) {
      setReviewDetails(response.data);
    }
  }

  const getRatings = async (token, id, type) => {
    let requestData = JSON.stringify({
      'user_id': id,
      'type': type
    })
    const users_review_response = await user_reviews(token, requestData)
    if (users_review_response.status === 1) {
      setRatings(users_review_response.data)
    }
  }
  
  const checkFavorite = async (token, rootId) => {
    const response = await check_favorite(token, rootId);
    if (response.status === 1) {
      setFavorite(true)
    }
  }

  const getData = async (token, rootId) => {
    await getRootDetails(token, rootId);
    await getOtherRootDetails(token, rootId, props.navigation.getParam('user_id', ''));
    await getReviewDetails(token, rootId);
    await checkFavorite(token, rootId);
    setTimePassed(false);
  }

  useEffect(() => {
    if (props.navigation.getParam('root_id', '')) {
      const rootId = props.navigation.getParam('root_id', '');
      getData(props.token, rootId)
    }
  }, [props.navigation.getParam('root_id', '')])

  useEffect(() => {
    console.log(rootDetails)
    if (rootDetails){
      setDeliveryDay(rootDetails.r_fiixed_price.max_days);
    }
  }, [rootDetails])

  useEffect(() => {
    if (props.navigation.getParam('user_id', '')) {
      const userId = props.navigation.getParam('user_id', '');
      getUserProfile(props.token, userId)
    }
  }, [props.navigation.getParam('user_id', '')])

  useEffect(() => {
    if (userProfile) {
      getRatings(props.token, props.navigation.getParam('user_id', ''), userProfile.type)
    }
  }, [userProfile])

  useEffect(() => {
    if (rootDetails) {
      setFinalPrice(rootDetails.r_fiixed_price.price)
    }
  }, [rootDetails])

  useEffect(() => {
    if (extraRevision) {
      setFinalPrice(parseInt(finalPrice) + parseInt(rootDetails.r_extra.revision.price))
      setDeliveryDay(parseInt(deliveryDay) - parseInt(rootDetails.r_extra.revision.max_days))
    } else {
      if (rootDetails.r_extra && rootDetails.r_extra.revision && rootDetails.r_extra.revision.price) {
        setFinalPrice(parseInt(finalPrice) - parseInt(rootDetails.r_extra.revision.price))
        setDeliveryDay(parseInt(deliveryDay) + parseInt(rootDetails.r_extra.revision.max_days))
      }
    }
  }, [extraRevision])

  useEffect(() => {
    if (fastDelivery) {
      setFinalPrice(parseInt(finalPrice) + parseInt(rootDetails.r_extra.fast_delivery.price))
      setDeliveryDay(parseInt(deliveryDay) - parseInt(rootDetails.r_extra.fast_delivery.max_days))
    } else {
      if (rootDetails.r_extra && rootDetails.r_extra.fast_delivery && rootDetails.r_extra.fast_delivery.price) {
        setFinalPrice(parseInt(finalPrice) - parseInt(rootDetails.r_extra.fast_delivery.price));
        setDeliveryDay(parseInt(deliveryDay) + parseInt(rootDetails.r_extra.fast_delivery.max_days))
      }
    }
  }, [fastDelivery])

  useEffect(() => {
    if (isExtra1) {
      setFinalPrice(parseInt(finalPrice) + parseInt(rootDetails.r_extra.extra1.price))
      setDeliveryDay(parseInt(deliveryDay) + parseInt(rootDetails.r_extra.extra1.max_days))
      setExtra1Price(rootDetails.r_extra.extra1.price)
      setExtra1Days(rootDetails.r_extra.extra1.max_days)
      setExtra1Description(rootDetails.r_extra.extra1.description)
    } else {
      if (rootDetails.r_extra && rootDetails.r_extra.extra1 && rootDetails.r_extra.extra1.price) {
        setFinalPrice(parseInt(finalPrice) - parseInt(rootDetails.r_extra.extra1.price))
        setDeliveryDay(parseInt(deliveryDay) - parseInt(rootDetails.r_extra.extra1.max_days))
        setExtra1Price('')
        setExtra1Days('')
        setExtra1Description('')
      }
    }
  }, [isExtra1])
  useEffect(() => {
    if (isExtra2) {
      setFinalPrice(parseInt(finalPrice) + parseInt(rootDetails.r_extra.extra2.price))
      setDeliveryDay(parseInt(deliveryDay) + parseInt(rootDetails.r_extra.extra2.max_days))
      setExtra2Price(rootDetails.r_extra.extra2.price)
      setExtra2Days(rootDetails.r_extra.extra2.max_days)
      setExtra2Description(rootDetails.r_extra.extra2.description)
    } else {
      if (rootDetails.r_extra && rootDetails.r_extra.extra2 && rootDetails.r_extra.extra2.price) {
        setFinalPrice(parseInt(finalPrice) - parseInt(rootDetails.r_extra.extra2.price))
        setDeliveryDay(parseInt(deliveryDay) - parseInt(rootDetails.r_extra.extra2.max_days))
        setExtra2Price('')
        setExtra2Days('')
        setExtra2Description('')
      }
    }
  }, [isExtra2])
  useEffect(() => {
    if (isExtra3) {
      setFinalPrice(parseInt(finalPrice) + parseInt(rootDetails.r_extra.extra3.price))
      setDeliveryDay(parseInt(deliveryDay) + parseInt(rootDetails.r_extra.extra3.max_days))
      setExtra3Price(rootDetails.r_extra.extra3.price)
      setExtra3Days(rootDetails.r_extra.extra3.max_days)
      setExtra3Description(rootDetails.r_extra.extra3.description)
    } else {
      if (rootDetails.r_extra && rootDetails.r_extra.extra3 && rootDetails.r_extra.extra3.price) {
        setFinalPrice(parseInt(finalPrice) - parseInt(rootDetails.r_extra.extra3.price))
        setDeliveryDay(parseInt(deliveryDay) - parseInt(rootDetails.r_extra.extra3.max_days))
        setExtra3Price('')
        setExtra3Days('')
        setExtra3Description('')
      }
    }
  }, [isExtra3])
  const handleAddToFavorite = (token, id) => {

    Alert.alert(
      '',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            setIsLoading(true);
            let RESPONSE;
            if (!favorite) {
              RESPONSE = await add_to_favorite(token, id);
            } else {
              RESPONSE = await remove_favorites(token, id);
            }
            if (RESPONSE.status === 1) {
              if (RESPONSE.message === 'Root deleted from favorites') {
                Alert.alert(RESPONSE.message)
                setIsLoading(false)
                setFavorite(false)
              } else {
                setFavorite(true)
                Alert.alert(RESPONSE.message)
                setIsLoading(false)
              }
            } else {
              if (RESPONSE.message === 'Already added!') {
                setFavorite(true)
              }
              setIsLoading(false)
            }
          }
        },
      ]
      );
      
      
    }
    

  const handleBuyNow = async () => {
        let getFinalPrice;
        let REVISION_PRICE = 0;
        let DELIVERY_PRICE = 0;
        let REVISION_DAYS = 0;
        let DELIVERY_DAYS = 0;
        let DAYS = parseInt(rootDetails.r_fiixed_price.max_days);
      if (extraRevision) {
        REVISION_PRICE = rootDetails.r_extra.revision.price;
        REVISION_DAYS = parseInt(rootDetails.r_extra.revision.max_days);
        DAYS += REVISION_DAYS; 
      }
    if (finalPrice){
      getFinalPrice = await getFinalPriceService(props.token, finalPrice);
      console.log("checkout============",getFinalPrice);
      if (fastDelivery) {
        DELIVERY_PRICE = rootDetails.r_extra.fast_delivery.price;
        DELIVERY_DAYS = parseInt(rootDetails.r_extra.fast_delivery.max_days);
        DAYS -= DELIVERY_DAYS
      }
    }
    else {
      getFinalPrice = await getFinalPriceService(props.token, flexiblePrice);
      DELIVERY_PRICE =  flexiblePrice;
      DELIVERY_DAYS =  maxDays;
      DAYS -= DELIVERY_DAYS
    }
    props.navigation.navigate('PaymentScreen', {
      rootDetails: {
        r_image: rootDetails.r_root_image,
        r_title: rootDetails.r_title,
        username: rootDetails.username,
        used_balance: getFinalPrice.data.usedBalance,
        total: getFinalPrice.data.finalprice,
        final_price: finalPrice?rootDetails.r_fiixed_price.price:flexiblePrice,//finalPrice
        processing_fees: getFinalPrice.data.processingPrice,
        r_user_id: rootDetails.r_user_id,
        r_id: rootDetails.r_id,
        days: deliveryDay,
        delivery_price: DELIVERY_PRICE,
        delivery_days: DELIVERY_DAYS,
        revision_days: REVISION_DAYS,
        revision_price: REVISION_PRICE,
        orderId: getFinalPrice.data.orderID,
        packagePrice: getFinalPrice.data.packagePrice,
        extra1Price: extra1Price,
        extra1Days: extra1Days,
        extra2Price: extra2Price,
        extra2Days: extra2Days,
        extra3Price: extra3Price,
        extra3Days: extra3Days,
        extra1Description: extra1Description,
        extra2Description: extra2Description,
        extra3Description: extra3Description,
        profile: rootDetails.profile,
        r_desc: rootDetails.r_desc
      }
    })
  }

  const handleContact = async (username) => {
    console.log("username=======",username)
    const response = await get_conversation(props.token, username);
    console.log("response===========",response)
    if (response.status === 1) {
      props.navigation.navigate('ChatScreen', { 'user': response.data.opponent, 'user_data': userProfile })
    } else {
      Alert.alert('Error while contact.')
    }
  }

  const handleShare = (link) => {
    Share.share(
      {
        message: link
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const toggleSlider = () => {
    setSliderVisible(!isSliderVisible);
  }

  const setflexPrice = (price, max_days, revision) => {
    setFlexiblePrice(price);
    setMaxDays(max_days);
    setRevision(revision);
  }

  const showRootDetails = (data) => {
    return (
      <>
        {
          isLoading && (<ActivityIndicator size="large" color="#10A2EF" />)
        }
        {/*Title & Subtitle Section*/}
        <View style={{ flex: 1 }}>
          <Text
            style={styles.rootTitleTextStyle}>
            {data.r_title}
          </Text>
          <Text
            style={styles.rootSubcategoryTextStyle}>
            {data.subcategory}
          </Text>
        </View>
        {/*Like & Share Section*/}
        <View style={styles.likeAndShareViewStyle}>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <Text style={{ color: '#748f9e', fontWeight: '700', fontSize: 15 }}>
              {rootDetails.orders_in_queue} Orders in queue
            </Text>
            <TouchableWithoutFeedback
              onPress={() => handleAddToFavorite(props.token, data.r_id)}
            >
              <View style={styles.iconViewStyle}>
                <Icon name="heart" size={16} color={favorite ? 'red' : '#ccc'} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleShare(data.r_share_link)}
            >
              <View style={styles.iconViewStyle}>
                <Icon name="share-alt" size={16} color="#ccc" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.ratingViewStyle}>
            {
              data.r_rating !== "0.0" ?
                <>
                  <Rating
                    readonly
                    style={{ paddingHorizontal: 10 }}
                    startingValue={1}
                    ratingCount={1}
                    imageSize={20}
                  />
                  <Text style={styles.ratingTextStyle}>{data.r_rating}</Text>
                  <Text style={{ fontSize: 15, paddingLeft: 5 }}>({data.r_rating_count})</Text>
                </> :
                null
            }
          </View>
        </View>
        {/*Slider Section*/}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableHighlight
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,.5)',
              opacity: 0.8,
              borderRadius: 8,
              padding: 5,
            }}
            onPress={toggleSlider}
          >
            <Icon
              style={{
                zIndex: 10000
              }}
              name="arrows"
              size={18}
              color="white" />
          </TouchableHighlight>

          <SnapCarousel
            items={data.rootFiles}
            handleOnClick={() => console.log('item clicked')}
          />

          {/* <SliderBox
            images={[data.r_root_image]}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
          /> */}
        </View>
        {/*Report This Modal*/}
        <ReportModal
          isVisible={isModalVisible}
          toggle={toggleModal}
          data={data}
          description={description}
          setDescription={setDescription}
          token={props.token}
        />
        {/*Description Section*/}
        <View style={styles.card}>
          <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
            <Text style={styles.description}>Description</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Icon name="clock-o" size={20} color="#10a2ef" />
              <Text style={{ fontSize: 15 }}> 
                {/* {data.r_fiixed_price.max_days} Days */}
                {deliveryDay} Days
              </Text>
            </View>
          </View>
          <View style={styles.doshline} />
          <Text style={{ color: '#748f9e', textAlign: 'justify', padding: 5, marginBottom: 15 }}>
            {data.r_desc}
          </Text>
          {data.r_tags.length > 0 ?
            <View style={styles.tagContainer}>
              {data.r_tags.map((item => {
                return (<TouchableHighlight style={styles.phpButton}>
                  <Text
                    style={styles.rTagsTestStyle} >
                    {item.toUpperCase()}
                  </Text>
                </TouchableHighlight>)
              }))}
            </View>
            : null
          }
          <Text
            onPress={toggleModal}
            style={styles.reportText}>
            Report this
            </Text>
        </View>
        {/*Flexible price card*/}
        {rootDetails.r_price_status == 1 &&
        <FlexibleCard
          rootDetails={rootDetails}
          flexiblePrice={setflexPrice}
        />
        } 
        {/*Additionals Section*/}
        {data.r_user_id != props.userId ? <>{
          data.r_extra.fast_delivery.price != '' && data.r_extra.revision.price != '' && 
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={styles.description}>Additionals</Text>
              </View>
              <View style={styles.doshline} />
              {
                data.r_extra.fast_delivery.price && (
                  <CheckBox
                    title={`Extra Fast Delivary (${data.r_extra.fast_delivery.max_days} days)                   $${data.r_extra.fast_delivery.price}`}
                    checked={fastDelivery}
                    onPress={() => setFastDelivery(!fastDelivery)}
                  />)
              }
              {
                data.r_extra.revision.price && (
                  <CheckBox
                    title={`Extra revision (${data.r_extra.revision.max_days} days)                             $${data.r_extra.revision.price}`}
                    checked={extraRevision}
                    onPress={() => setExtraRevision(!extraRevision)}
                  />)
              }
              {
                data.r_extra.extra1.price && (
                  <View>
                    <View style={styles.doshline} />
                    <CheckBox
                      title={`${data.r_extra.extra1.description}  (${data.r_extra.extra1.max_days} days)`}
                      checked={isExtra1}
                      onPress={() => setIsExtra1(!isExtra1)}
                    />
                    <View>
                      <Text style={{textAlign:'right'}}>
                          ${data.r_extra.extra1.price}
                      </Text>
                    </View>
                  </View>)
              }
              {
                data.r_extra.extra2.price && (
                  <View>
                    <View style={styles.doshline} />
                    <CheckBox
                      title={`${data.r_extra.extra2.description}  (${data.r_extra.extra2.max_days} days)`}
                      checked={isExtra2}
                      onPress={() => setIsExtra2(!isExtra2)}
                    />
                    <View>
                      <Text style={{textAlign:'right'}}>
                          ${data.r_extra.extra2.price}
                      </Text>
                    </View>
                  </View>)
              }
              {
                data.r_extra.extra3.price && (
                  <View>
                    <View style={styles.doshline} />
                    <CheckBox
                      title={`${data.r_extra.extra3.description}  (${data.r_extra.extra3.max_days} days)`}
                      checked={isExtra3}
                      onPress={() => setIsExtra3(!isExtra3)}
                    />
                    <View>
                      <Text style={{textAlign:'right'}}>
                          ${data.r_extra.extra3.price}
                      </Text>
                    </View>
                  </View>)
              }
            </View>          
        }</> : null}

        {data.r_user_id == props.userId && <Button
          disabled={true}
          onPress={handleBuyNow}
          style={[styles.buttons, { backgroundColor: '#555' }]}>
          <Text style={styles.buttonsText}>
            THIS IS YOUR OWN ROOT
          </Text>
        </Button>}
        {/*Buy Now Button*/}
        {data.r_user_id != props.userId &&
        <Button
          onPress={handleBuyNow}
          style={[styles.buttons, { backgroundColor: '#2ec09c' }]}>
          {finalPrice?  
          <Text style={styles.buttonsText}>
            BUY NOW FOR ${finalPrice}
          </Text>
          :
          <Text style={styles.buttonsText}>
            BUY NOW FOR {flexiblePrice != 0 && `$${flexiblePrice}`}
          </Text>
          }
        </Button>}
        {/*Ask Custom Offer Button*/}
        {data.r_user_id != props.userId && <Button
          onPress={() => handleContact(data.name)}
          style={[styles.buttons, { backgroundColor: '#10A2EF' }]}>
          <Text style={styles.buttonsText}>
            ASK FOR CUSTOM OFFER
          </Text>
        </Button>}
        {/*User profile*/}
        <>
          {
            userProfile ?
              <>
                <ProfileCard
                  navigation={props.navigation}
                  data={userProfile}
                  rootId={props.navigation.getParam('root_id', '')}
                  lastPingTime={rootDetails.last_ping_time}
                  socket={global.socket}
                />
                <View style={{ height: 25 }} />
              </> : null
          }
        </>
        {/*Reviews*/}
        { reviewDetails.length>0 && userProfile && ratings && ratings.reviews.length > 0 ?
          <>
            <ReviewCard
              navigation={props.navigation}
              rootId={props.navigation.getParam('root_id', '')}
              reviewRating={data.r_rating}
              reviewCount={data.r_rating_count}
              userProfile={userProfile}
              ratings={ratings}
              reviewData={data}
            />
            <View style={{ height: 20 }} />
          </>
          :
          null
        }
        {data.r_user_id != props.userId && <>{
          otherRootsDetails.length > 0 && userProfile ?
            <>
              <RootCard
                navigation={props.navigation}
                myRoots={otherRootsDetails}
                data={userProfile}
                rootId={props.navigation.getParam('root_id', '')}
                userId={props.navigation.getParam('user_id', '')}
                token= {props.token}
                socket={global.socket}
                position={"rootPage"}
              />
              <View style={{ height: 10 }} />
            </>
            :
            null
        }</>}
      </>
    )
  }

  return (
    <DrawerWrapper {...props}>
      <View>
        <ScrollView style={styles.container}>
          {/* { props.profileData && props.profileData.first_name ? (
            <UserProfileCard {...props} profileData={props.profileData} />
          ) : (
              timePassed && (
                <ActivityIndicator size="small" color="#00ff00" />
              )
            )} */}
          {
            rootDetails != '' ?
              showRootDetails(rootDetails)
              :
              <ActivityIndicator size="small" color="#00ff00" />
          }
          <View style={{ height: 150 }} />
        </ScrollView>
        {
          rootDetails !== '' ?
            <>
              {/*Slider Modal*/}
              <SliderModal
                isVisible={isSliderVisible}
                toggle={toggleSlider}
                data={rootDetails.rootFiles}
              />
            </> : null
        }
      </View>
    </DrawerWrapper>
  );
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    profileData: state.userProfile.profiledata,
    userId: state.LoginUser.user_id,
  };
};

const RootScreen = connect(mapStateToProps)(RootPage);

export default RootScreen;

