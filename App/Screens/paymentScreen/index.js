import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
  NativeModules,
  Linking,
  RefreshControl
} from 'react-native';
import { Button, Fab } from 'native-base';
import styles from './paymentScreen.styles';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import PayPal from 'react-native-paypal-wrapper';
import { orderSuccess } from '../../services/order';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { getUserBalance } from '../../services/home/index'
import { getPaymentHTML, applyCoupon } from '../../services/payments/payments'
import { TouchableOpacity } from 'react-native-gesture-handler';


const PaymentScreen = (props) => {

  console.log('payment screen', props)
  const [couponCode, setCouponCode] = useState('');
  const passedRootDetails = props.navigation.state.params.rootDetails;
  const [hyperPay, setHyperPay] = useState(false);
  const [checkoutId, setCheckoutId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [couponAmount, setCouponAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [html, setHtml] = useState('');

  console.log('passedRootDetails',passedRootDetails)

  const getUserBalanceDetails = async () => {
    let balance = await getUserBalance(props.token)
    setBalance(balance.data);
    setIsLoading(false)
  }

  const getHTML = async () => {
    let html = await getPaymentHTML(
      props.token,
      passedRootDetails.r_user_id,
      passedRootDetails.delivery_days,
      passedRootDetails.final_price,
      passedRootDetails.used_balance,
      passedRootDetails.processing_fees,
      passedRootDetails.r_id,
      passedRootDetails.orderId,
      passedRootDetails.packagePrice
    )
    setHtml(html);
  }

  useEffect(() => {
    setIsLoading(true)
    getUserBalanceDetails()
    getHTML()
  }, []);

  const payWithCashu = () => {

  }
  const payWithPaypal = () => {
    console.log("=====> in paypal integration <=====", passedRootDetails.final_price, props.id)
    PayPal.initialize(PayPal.PRODUCTION, "AaShd2IX_sUUJFV_xxKzTRoVOz9INwriExNxuw_FjpHGA0StTVjRDALySnSzpkTsc3NwxAQzFupRLsGq");
    PayPal.pay({
      price: passedRootDetails.final_price.toString(),
      currency: 'USD',
      description: 'Pay securely with talentsroot',
    }).then(confirm => {
      orderSuccess(
        passedRootDetails.r_user_id,
        props.id,
        passedRootDetails.r_id,
        passedRootDetails.final_price,
        passedRootDetails.used_balance,
        passedRootDetails.processing_fees,
        passedRootDetails.days,
        passedRootDetails.delivery_days,
        passedRootDetails.delivery_price,
        passedRootDetails.revision_days,
        passedRootDetails.revision_price,
        props.token)
        .then((orderSuccess) => {
          return props.navigation.navigate('OrderDetails', {
            orderDetails: {
              o_order_id: orderSuccess.data.order_id,
              o_seller_id: passedRootDetails.r_user_id,
              o_buyer_id: props.id,
              o_amount:parseInt(passedRootDetails.final_price),
              o_processing_fees: passedRootDetails.processing_fees,
              profile: passedRootDetails.profile,
              description: passedRootDetails.r_desc,
              name: passedRootDetails.username
            }
          })
        })
        .catch((err) => {
          return Alert.alert(
            'Payment',
            'Something went wrong please try again later',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed', err) },
            ],
            { cancelable: false },
          );
        })
    })
      .catch(error => console.log(error));
  }

  const checkUrlState = (url) => {
    if (url.includes('https://www.talentsroot.com/order/return')) {
      setHyperPay(false)
      props.navigation.navigate('OrderDetails', { orderDetails: item })
    }
  }

  const apply_Coupon = async() => {
    if (couponCode == ''){
      Alert.alert('Please add your coupon code')
    }
    let data = {
      price: passedRootDetails.total,
      coupon: couponCode
    };
    let response = await applyCoupon(props.token, data)
    console.log("coupon=========",response)
    if (response.status == 1){
      Alert.alert(response.message);
      setCouponAmount(response.data.couponAmount);
      setFinalPrice(response.data.finalprice);
    }
  }
  
  const removeCoupon = async() => {
    setCouponAmount(0);
    setFinalPrice(0);
  }

  const orderNow = async () => {
    console.log(passedRootDetails.r_user_id, props.id, passedRootDetails, props.token)
    let res = await orderSuccess(
      passedRootDetails.r_user_id,
      props.id,
      passedRootDetails.r_id,
      passedRootDetails.final_price,
      passedRootDetails.used_balance,
      passedRootDetails.processing_fees,
      passedRootDetails.days,
      passedRootDetails.delivery_days,
      passedRootDetails.delivery_price,
      passedRootDetails.revision_days,
      passedRootDetails.revision_price,
      props.token)
    console.log("res==========",res)
    if (res.status == 1) {
      Alert.alert('Order created successfully');
      props.navigation.navigate('OrderDetails', {
        orderDetails: {
          o_order_id: res.data.order_id,
          o_seller_id: passedRootDetails.r_user_id,
          o_buyer_id: props.id,
          o_amount:parseInt(passedRootDetails.final_price),
          o_processing_fees: passedRootDetails.processing_fees,
          profile: passedRootDetails.profile,
          description: passedRootDetails.r_desc,
          name: passedRootDetails.username
        }
      })
    } else {
      Alert.alert("Something went wrong Please try again later")
    }
  }


  return (
    <>{
      hyperPay ?
        <WebView
          source={{html: html}}
          injectedJavaScript={`
          const meta = document.createElement('meta'); 
          meta.setAttribute('content', 'width=width, initial-scale=1, maximum-scale=1, user-scalable=2.0'); 
          meta.setAttribute('name', 'viewport'); 
          document.getElementsByTagName('head')[0].appendChild(meta); `}
          onNavigationStateChange={state => checkUrlState(state.url)}
          style={{flex: 1, top:130}}
        />
        :
        <DrawerWrapper {...props}>
          <ScrollView
             refreshControl={ 
              <RefreshControl refreshing={isLoading} />
            }
          >
            {
              !isLoading ? 
              <>
                 <View style={styles.cardStyle}>
                  <View style={styles.ImageViewStyle}>
                    <Image
                      style={styles.ImageStyle}
                      resizeMode={'contain'}
                      source={{uri:passedRootDetails.r_image}}
                    />
                  </View>
                  <View style={{flexDirection: 'row' }}>
                    <View style={{ flex: 4 }}>
                      <Text style={styles.CardTitleStyle}>
                        {passedRootDetails.r_title}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.PriceStyle}>
                        ${passedRootDetails.final_price}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.profileViewStyle} >
                    <View style={styles.profileLeftViewStyle} >
                      <Image
                        style={styles.profileLeftViewImageStyle}
                        source={{ uri: passedRootDetails.profile }}
                      />
                      <Text style={styles.profileLeftViewNameStyle}>
                        {passedRootDetails.username}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.orderIdTextStyle}>
                      Order #{passedRootDetails.orderId}
                  </Text>
                  {passedRootDetails.delivery_price != undefined && passedRootDetails.delivery_price != 0 &&
                  <>
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={styles.tableItemTitle}>Extra Fast Delivery({passedRootDetails.delivery_days} day)</Text>
                    <View style={styles.tableItemRightSide}>
                      <Text style={styles.tableItemRightText}>${passedRootDetails.delivery_price}</Text>
                    </View>
                  </View>
                  </>
                  }
                  {passedRootDetails.extra1Price != undefined && passedRootDetails.extra1Price != ''&&
                  <>
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={styles.tableItemTitle}>{passedRootDetails.extra1Description}({passedRootDetails.extra1Days} day)</Text>
                    <View style={styles.tableItemRightSide}>
                      <Text style={styles.tableItemRightText}>${passedRootDetails.extra1Price}</Text>
                    </View>
                  </View>
                  </>
                  }
                  {passedRootDetails.extra2Price != undefined && passedRootDetails.extra2Price != ''&&
                  <>
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={styles.tableItemTitle}>{passedRootDetails.extra2Description}({passedRootDetails.extra2Days} day)</Text>
                    <View style={styles.tableItemRightSide}>
                      <Text style={styles.tableItemRightText}>${passedRootDetails.extra2Price}</Text>
                    </View>
                  </View>
                  </>
                  }
                  {passedRootDetails.extra3Price != undefined && passedRootDetails.extra3Price != ''&&
                  <>
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={styles.tableItemTitle}>{passedRootDetails.extra3Description}({passedRootDetails.extra3Days} day)</Text>
                    <View style={styles.tableItemRightSide}>
                      <Text style={styles.tableItemRightText}>${passedRootDetails.extra3Price}</Text>
                    </View>
                  </View>
                  </>
                  }
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={styles.tableItemTitle}>Delivery days:</Text>
                    <View style={styles.tableItemRightSide}>
                      <Text style={styles.tableItemRightText}>{passedRootDetails.days} Days</Text>
                    </View>
                  </View>
                  {
                    passedRootDetails.used_balance !== 0 ?
                    <>
                    <View style={styles.doshline} />
                    <View style={styles.tableItem} >
                      <Text style={[styles.tableItemTitle, { fontWeight: 'bold' }]}>Balance:</Text>
                      <View style={styles.tableItemRightSide}>
                        {/* <Text style={styles.tableItemRightText}>${passedRootDetails.used_balance}</Text> */}
                        <Text style={styles.tableItemRightText}>${passedRootDetails.used_balance}</Text>
                      </View>
                    </View>
                    </> : null
                  }
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={styles.tableItemTitle}>Processing Fees (10%):</Text>
                    <View style={styles.tableItemRightSide}>
                      <Text style={styles.tableItemRightText}>${passedRootDetails.processing_fees}</Text>
                    </View>
                  </View>
                  {
                    couponAmount != undefined && couponAmount !== 0 ?
                    <>
                    <View style={styles.doshline} />
                    <View style={styles.tableItem} >
                      <View style={{flexDirection:'row', flex:1}}>
                        <Text style={[styles.tableItemTitle, { fontWeight: 'bold' }]}>Discount Amount(10%):</Text>
                        <TouchableOpacity onPress={() => removeCoupon()} style={styles.textClose}>
                          <Icon name="remove" size={14} color="red"/>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.tableItemRightSide}>
                        <Text style={styles.tableItemRightText}>${couponAmount}</Text>
                      </View>
                    </View>
                    </> : null
                  }
                  <View style={styles.doshline} />
                  <View style={styles.tableItem} >
                    <Text style={[styles.tableItemTitle, { fontWeight: 'bold' }]}>Total:</Text>
                    <View style={styles.tableItemRightSide}>
                      {(finalPrice != undefined && finalPrice !== 0) ?
                      <Text style={styles.totalText}>${finalPrice}</Text>
                      :
                      <Text style={styles.totalText}>${passedRootDetails.total}</Text>}
                    </View>
                  </View>
                </View>
                <View style={styles.couponViewStyle}>
                  <TextInput
                    style={styles.couponTextInputStyle}
                    onChangeText={text => setCouponCode(text)}
                    value={couponCode}
                    placeholder='Enter Discount Code'
                  />
                  <TouchableOpacity onPress={()=>apply_Coupon()} style={styles.button}>
                    <Text style={styles.buttonText}>
                      APPLY CODE
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems:'center'}}>
                  <View style={{alignItems:'center', flexDirection: 'row', marginVertical: 10}}>
                    <Image
                      style={styles.securityImageStyle}
                      resizeMode={'contain'}
                      source={{uri: 'https://cdn.talentsroot.com/image/secure.png'}}
                    />
                    <Text style={{fontSize: 20, fontWeight:'700', marginLeft: 20}}>
                      Secure Payment
                    </Text>
                  </View>
                </View>
                {
                  passedRootDetails.total != 0 ?
                    <View style={{ justifyContent: 'center', display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      <TouchableOpacity success style={styles.paymentsButton} onPress={() => payWithPaypal()}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                          <View style={[styles.cardView]}>
                            <Image resizeMode={'contain'} source={{ uri: "https://cdn.talentsroot.com/image/Paypal.png" }} style={{ height: 20, width: 150, padding: 25 }} />
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity primary style={styles.paymentsButton} onPress={() => { setHyperPay(true) }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                          <View style={[styles.cardView]}>
                            <Image resizeMode={'contain'} source={{ uri: "https://cdn.talentsroot.com/image/paynow.png" }} style={{ height: 20, width: 150, padding: 25 }} />
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity primary style={styles.paymentsButton} onPress={() => payWithCashu()}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                          <View style={[styles.cardView]}>
                            <Image resizeMode={'contain'} source={{ uri: "https://cdn.talentsroot.com/image/CASHU.png" }} style={{ height: 20, width: 150, padding: 25 }} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity onPress={() => orderNow()}>
                      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <View style={[styles.cardView]}>
                          <Text style={[styles.transaction_date, { padding: 15, marginTop: 0, fontSize: 22, textAlign: 'center', color: '#10a2ef' }]}>Order Now</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                }
              </>
              :null
            }
          </ScrollView>
        </DrawerWrapper>
    }</>);
}
const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    id: state.LoginUser.user_id,
    review: state.addRoot,
  };
};



export default connect(mapStateToProps)(PaymentScreen);
