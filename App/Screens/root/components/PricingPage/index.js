import React, { Fragment, useState, useRef, createRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  Picker
} from 'react-native';
import Dash from 'react-native-dash';
import { connect } from 'react-redux';
import { rootPricing } from '../../actions/actions';
import styles from './index.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP } from '../../../../commons/responsive_design';
import {
  saveRootPricingData
} from '../../actions/actions';

const days = [
  { id: 0, label: 'I will deliver in (days)' },
  { id: 1, label: '1 Day' },
  { id: 2, label: '2 Days' },
  { id: 3, label: '3 Days' },
  { id: 4, label: '4 Days' },
  { id: 5, label: '5 Days' },
  { id: 6, label: '6 Days' },
  { id: 7, label: '7 Days' },
  { id: 8, label: '8 Days' },
  { id: 9, label: '9 Days' },
  { id: 10, label: '10 Days' },
  { id: 11, label: '11 Days' },
  { id: 12, label: '12 Days' },
  { id: 13, label: '13 Days' },
  { id: 14, label: '14 Days' },
  { id: 15, label: '15 Days' },
  { id: 16, label: '16 Days' },
  { id: 17, label: '17 Days' },
  { id: 18, label: '18 Days' },
  { id: 19, label: '19 Days' },
  { id: 20, label: '20 Days' },
  { id: 21, label: '21 Days' },
  { id: 22, label: '22 Days' },
  { id: 23, label: '23 Days' },
  { id: 24, label: '24 Days' },
  { id: 25, label: '25 Days' },
  { id: 26, label: '26 Days' },
  { id: 27, label: '27 Days' },
  { id: 28, label: '28 Days' },
  { id: 29, label: '29 Days' },
  { id: 30, label: '30 Days' },
]

const revisions = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
  { id: 5, label: '5' },
  { id: 6, label: '6' },
  { id: 7, label: '7' },
  { id: 8, label: '8' },
  { id: 9, label: '9' },
  { id: 10, label: '10' },
  { id: 11, label: 'Unlimited' },
]

const Pricing = (props) => {

  //fixed price 
  const [price, setPrice] = useState('');

  //days for delivery
  const [deliveryDays, setDeliveryDays] = useState(0);


  const [isPriceFlexible, setIsPriceFlexible] = useState(false);
  const [extraFastDelivery, setExtraFastDelivery] = useState('');
  const [revision, setRevision] = useState('');

  //ExtraFastDelivery
  const [isExtraFastDelivery, setIsExtraFastDelivery] = useState(false);
  const [fastDeliveryPrice, setFastDeliveryPrice] = useState('');
  const [fastDeliveryDays, setFastDeliveryDays] = useState('');

  const [minNumber, setMinNumber] = useState(0);

  //Revision
  const [isRevision, setIsRevision] = useState(false);
  const [revisionPrice, setRevisionPrice] = useState('');
  const [revisionDays, setRevisionDays] = useState('');

  //Extra1
  const [isExtra1, setIsExtra1] = useState(false);
  const [extra1Description, setExtra1Description] = useState('');
  const [extra1Price, setExtra1Price] = useState('');
  const [extra1Days, setExtra1Days] = useState('');

  //Extra2
  const [isExtra2, setIsExtra2] = useState(false);
  const [extra2Description, setExtra2Description] = useState('');
  const [extra2Price, setExtra2Price] = useState('');
  const [extra2Days, setExtra2Days] = useState('');

  //Extra3
  const [isExtra3, setIsExtra3] = useState(false);
  const [extra3Description, setExtra3Description] = useState('');
  const [extra3Price, setExtra3Price] = useState('');
  const [extra3Days, setExtra3Days] = useState('');

  const [addNewExtraCount, setAddNewExtraCount] = useState(0);

  ///flexible price
  //Basic
  const [basicName, setBasicName] = useState('');
  const [basicDescription, setBasicDescription] = useState('');
  const [basicMaxDays, setBasicMaxDays] = useState(0);
  const [basicRevision, setBasicRevision] = useState('');
  const [basicPrice, setBasicPrice] = useState('');

  //Standard
  const [standardName, setStandardName] = useState('');
  const [standardDescription, setStandardDescription] = useState('');
  const [standardMaxDays, setStandardMaxDays] = useState(0);
  const [standardRevision, setStandardRevision] = useState('');
  const [standardPrice, setStandardPrice] = useState('');

  //Premium
  const [premiumName, setPremiumName] = useState('');
  const [premiumDescription, setPremiumDescription] = useState('');
  const [premiumMaxDays, setPremiumMaxDays] = useState(0);
  const [premiumRevision, setPremiumRevision] = useState('');
  const [premiumPrice, setPremiumPrice] = useState('');

  /**
   * errors [{ id: '' , error: ''}]
   * 
   * 0 : price
   * 1 : deliveryDays
   * 2 : fastDeliveryPrice
   * 3 : fastDeliveryDays
   * 4 : revisionPrice
   * 5 : revisionDays
   * 6 : extra1Description
   * 7 : extra1Price
   * 8 : extra1Days
   * 9 : extra2Description
   * 10 : extra2Price
   * 11 : extra2Days
   * 12 : extra3Description
   * 13 : extra3Price
   * 14 : extra3Days
   * 15 : basicName
   * 16 : standardName
   * 17 : premiumName
   * 18 : basicDescription
   * 19 : standardDescription
   * 20 : premiumDescription
   * 21 : basicPrice
   * 22 : standardPrice
   * 23 : premiumPrice
   */

  const [errors, setErros] = useState([
    { error: '' },//price : 0 
    { error: '' },//deliveryDays : 1
    { error: '' },//fastDeliveryPrice : 2
    { error: '' },//fastDeliveryDays : 3
    { error: '' },//revisionPrice : 4
    { error: '' },//revisionDays : 5
    { error: '' },//extra1Description : 6
    { error: '' },//extra1Price : 7
    { error: '' },//extra1Days : 8
    { error: '' },//extra2Description : 9
    { error: '' },//extra2Price : 10
    { error: '' },//extra2Days : 11
    { error: '' },//extra3Description : 12
    { error: '' },//extra3Price : 13
    { error: '' },//extra3Days : 14
    { error: '' },//basicName : 15
    { error: '' },//standardName : 16
    { error: '' },//premiumName : 17
    { error: '' },//basicDescription : 18
    { error: '' },//standardDescription : 19
    { error: '' },//premiumDescription : 20
    { error: '' },//basicPrice : 21
    { error: '' },//standardPrice : 22
    { error: '' },//premiumPrice : 23
    // { error: '' },//basicMaxDays : 24
    // { error: '' },//basicRevision : 25
    // { error: '' },//standardMaxDays : 26
    // { error: '' },//standardRevision : 27
    // { error: '' },//premiumMaxDays : 28
    // { error: '' },//premiumRevision : 29
  ]);

  //scroll
  const refScroll = createRef();
  const [scrollCount, setScrollCount] = useState(0);
  useEffect(() => {
    if (scrollCount === 1) refScroll.current.scrollTo({ x: widthPercentageToDP(25) })
    if (scrollCount === 2) refScroll.current.scrollTo({ x: widthPercentageToDP(100) })
    if (scrollCount === 3) refScroll.current.scrollTo({ x: widthPercentageToDP(165) })
    if (scrollCount > 3) {
      setScrollCount(0)
      refScroll.current.scrollTo({ x: widthPercentageToDP(0) })
    }
  }, [scrollCount])

  //handle minNumber
  useEffect(()=>{
    setMinNumber(Math.min(basicMaxDays,standardMaxDays,premiumMaxDays))
  },[basicMaxDays,standardMaxDays,premiumMaxDays])

  //handle price page complete or not
  useEffect(()=>{
    if(props.showPricePageError) handlePricePageNext()
  },[props.showPricePageError])

  //handle data from reducer
  useEffect(()=>{
    if(props.root){
      console.log('props.root===============>',props.root)
      if(props.root.isPriceFlexible) setIsPriceFlexible(props.root.isPriceFlexible === 1 ? true : false );
      if(props.root.price) setPrice(props.root.price);
      if(props.root.isExtraFastDelivery) setIsExtraFastDelivery(props.root.isExtraFastDelivery)
      if(props.root.isRevision) setIsRevision(props.root.isRevision)
      if(props.root.isExtra1) setIsExtra1(props.root.isExtra1)
      if(props.root.isExtra2) setIsExtra2(props.root.isExtra2)
      if(props.root.isExtra3) setIsExtra3(props.root.isExtra3)
      if(props.root.deliveryDays) setDeliveryDays(props.root.deliveryDays);
      if(props.root.fastDeliveryPrice) setFastDeliveryPrice(props.root.fastDeliveryPrice);
      if(props.root.fastDeliveryDays) setFastDeliveryDays(props.root.fastDeliveryDays);
      if(props.root.revisionPrice) setRevisionPrice(props.root.revisionPrice);
      if(props.root.revisionDays) setRevisionDays(props.root.revisionDays);
      if(props.root.extra1Description) setExtra1Description(props.root.extra1Description);
      if(props.root.extra1Price) setExtra1Price(props.root.extra1Price);
      if(props.root.extra1Days) setExtra1Days(props.root.extra1Days);
      if(props.root.extra2Description) setExtra2Description(props.root.extra2Description);
      if(props.root.extra2Price) setExtra2Price(props.root.extra2Price);
      if(props.root.extra2Days) setExtra2Days(props.root.extra2Days);
      if(props.root.extra3Description) setExtra3Description(props.root.extra3Description);
      if(props.root.extra3Price) setExtra3Price(props.root.extra3Price);
      if(props.root.extra3Days) setExtra3Days(props.root.extra3Days);
      if(props.root.basicName) setBasicName(props.root.basicName);
      if(props.root.standardName) setStandardName(props.root.standardName);
      if(props.root.premiumName) setPremiumName(props.root.premiumName);
      if(props.root.basicDescription) setBasicDescription(props.root.basicDescription);
      if(props.root.standardDescription) setStandardDescription(props.root.standardDescription);
      if(props.root.premiumDescription) setPremiumDescription(props.root.premiumDescription);
      if(props.root.basicMaxDays) setBasicMaxDays(props.root.basicMaxDays);
      if(props.root.standardMaxDays) setStandardMaxDays(props.root.standardMaxDays);
      if(props.root.premiumMaxDays) setPremiumMaxDays(props.root.premiumMaxDays);
      if(props.root.basicPrice) setBasicPrice(props.root.basicPrice);
      if(props.root.standardPrice) setStandardPrice(props.root.standardPrice);
      if(props.root.premiumPrice) setPremiumPrice(props.root.premiumPrice);
      if(props.root.basicRevision) setBasicRevision(props.root.basicRevision);
      if(props.root.standardRevision) setStandardRevision(props.root.standardRevision);
      if(props.root.premiumRevision) setPremiumRevision(props.root.premiumRevision);
    }
  },[props.root])


  const handlePricingSaveAsDraft = () => {
    const formData = new FormData();

    //data from title screen
    formData.append('r_title',props.root.rootTitle);
    formData.append('r_category_id',props.root.category); 
    formData.append('r_subcategory_ids',props.root.subCategory);

    if(!isPriceFlexible){
      //fixed price
      formData.append('r_price_status',0);//0 = Fixed,1=Flexibel
      formData.append('r_fiixed_price[price]',price);
      formData.append('r_fiixed_price[max_days]',deliveryDays);
      formData.append('r_minimum_price',price);
    }else{
      //flexible price
      formData.append('r_minimum_price',Math.min(basicPrice,standardPrice,premiumPrice));
      formData.append('r_price_status',1);//0 = Fixed,1=Flexibel
      formData.append('r_flexible_price[basic][name]',basicName);
      formData.append('r_flexible_price[standard][name]',standardName);
      formData.append('r_flexible_price[premium][name]',premiumName);
      formData.append('r_flexible_price[basic][description]',basicDescription);
      formData.append('r_flexible_price[standard][description]',standardDescription);
      formData.append('r_flexible_price[premium][description]',premiumDescription);
      formData.append('r_flexible_price[basic][max_days]',basicMaxDays);
      formData.append('r_flexible_price[standard][max_days]',standardMaxDays);
      formData.append('r_flexible_price[premium][max_days]',premiumMaxDays);
      formData.append('r_flexible_price[basic][price]',basicPrice);
      formData.append('r_flexible_price[standard][price]',standardPrice);
      formData.append('r_flexible_price[premium][price]',premiumPrice);
      formData.append('r_flexible_price[basic][revision]',basicRevision);
      formData.append('r_flexible_price[standard][revision]',standardRevision);
      formData.append('r_flexible_price[premium][revision]',premiumRevision);
    } 
    if(isExtraFastDelivery){
      //extra fast delivery
      formData.append('r_extra[fast_delivery][price]',fastDeliveryPrice);
      formData.append('r_extra[fast_delivery][max_days]',fastDeliveryDays);
    }
    if(isRevision){
      //revision
      formData.append('r_extra[revision][price]',revisionPrice);
      formData.append('r_extra[revision][max_days]',revisionDays);
    }
    if(isExtra1){
      //extra1
      formData.append('r_extra[extra1][description]',extra1Description);
      formData.append('r_extra[extra1][price]',extra1Price);
      formData.append('r_extra[extra1][max_days]',extra1Days);
    }
    if(isExtra2){
      //extra2
      formData.append('r_extra[extra2][description]',extra2Description);
      formData.append('r_extra[extra2][price]',extra2Price);
      formData.append('r_extra[extra2][max_days]',extra2Days);
    }
    if(isExtra3){
      //extra3
      formData.append('r_extra[extra3][description]',extra3Description);
      formData.append('r_extra[extra3][price]',extra3Price);
      formData.append('r_extra[extra3][max_days]',extra3Days);
    }

    formData.append('r_type',1);//draft 
    props.handlePostRoot(formData)
  }

  //handlePricePageNext
  const handlePricePageNext = () => {

    let ERRORS = [
      { error: '' },//price : 0 
      { error: '' },//deliveryDays : 1
      { error: '' },//fastDeliveryPrice : 2
      { error: '' },//fastDeliveryDays : 3
      { error: '' },//revisionPrice : 4
      { error: '' },//revisionDays : 5
      { error: '' },//extra1Description : 6
      { error: '' },//extra1Price : 7
      { error: '' },//extra1Days : 8
      { error: '' },//extra2Description : 9
      { error: '' },//extra2Price : 10
      { error: '' },//extra2Days : 11
      { error: '' },//extra3Description : 12
      { error: '' },//extra3Price : 13
      { error: '' },//extra3Days : 14
      { error: '' },//basicName : 15
      { error: '' },//standardName : 16
      { error: '' },//premiumName : 17
      { error: '' },//basicD  escription : 18
      { error: '' },//standardDescription : 19
      { error: '' },//premiumDescription : 20
      { error: '' },//basicPrice : 21
      { error: '' },//standardPrice : 22
      { error: '' },//premiumPrice : 23
      // { error: '' },//basicMaxDays : 24
      // { error: '' },//basicRevision : 25
      // { error: '' },//standardMaxDays : 26
      // { error: '' },//standardRevision : 27
      // { error: '' },//premiumMaxDays : 28
      // { error: '' },//premiumRevision : 29
    ];

    // for fixed price 
    if (!isPriceFlexible) {
      if (!price) {
        ERRORS[0].error = 'Root price can not be blank!';
      }
      if (!deliveryDays) {
        ERRORS[1].error = 'Days for delivery can not be blank!'
      }
    }

    // for flexible price 
    if (isPriceFlexible) {
      if(!basicName)  ERRORS[15].error = 'basic name can not be blank!!';
      if(!standardName) ERRORS[16].error = 'standard name can not be blank!!';
      if(!premiumName) ERRORS[17].error = 'premium name can not be blank!!';
      if(!basicDescription) ERRORS[18].error = 'basic  Description can not be blank!!';
      if(!standardDescription) ERRORS[19].error = 'standard  Description can not be blank!!';
      if(!premiumDescription) ERRORS[20].error = 'premium  Description can not be blank!!';
      if(!basicPrice) ERRORS[21].error = 'basic price can not be blank!!';
      if(!standardPrice) ERRORS[22].error = 'standard price can not be blank!!';
      if(!premiumPrice) ERRORS[23].error = 'premium price can not be blank!!';
    }

    //for extra fast delivery
    if (isExtraFastDelivery) {
      if (!fastDeliveryPrice) {
        ERRORS[2].error = 'Extra fast delivery price can not be blank!!';
      }
      if (!fastDeliveryDays) {
        ERRORS[3].error = 'Extra fast delivery days can not be blank!!'
      }
    }

    //for revision
    if (isRevision) {
      if (!revisionPrice) {
        ERRORS[4].error = 'Extra revision price can not be blank!!';
      }
      if (!revisionDays) {
        ERRORS[5].error = "Extra revision days for delivery can't be blank!!"
      }
    }

    //for extra1
    if (isExtra1) {
      if (!extra1Description) {
        ERRORS[6].error = 'Extra1 description can not be blank!!';
      }
      if (!extra1Price) {
        ERRORS[7].error = "Extra1 price can not be blank!!"
      }
      if (!extra1Days) {
        ERRORS[8].error = "Extra1 Days for delivery for extra can not be blank!!"
      }
    }

    //for extra2
    if (isExtra2) {
      if (!extra2Description) {
        ERRORS[9].error = 'Extra2 description can not be blank!!';
      }
      if (!extra2Price) {
        ERRORS[10].error = "Extra2 price can not be blank!!"
      }
      if (!extra2Days) {
        ERRORS[11].error = "Extra2 Days for delivery for extra can not be blank!!"
      }
    }

    //for extra3
    if (isExtra3) {
      if (!extra3Description) {
        ERRORS[12].error = 'Extra3 description can not be blank!!';
      }
      if (!extra3Price) {
        ERRORS[13].error = "Extra3 price can not be blank!!"
      }
      if (!extra3Days) {
        ERRORS[14].error = "Extra3 Days for delivery for extra can not be blank!!"
      }
    }

    // props.setIsTitlePageComplete(true)
    setErros(ERRORS)

    if (!isPriceFlexible) {
      if (!price || !deliveryDays) return
    }
    if(isPriceFlexible){
      if (!basicName || !basicDescription || !basicMaxDays || !basicRevision || !basicPrice) return
      if (!standardName || !standardDescription || !standardMaxDays || !standardRevision || !standardPrice) return
      if (!premiumName || !premiumDescription || !premiumMaxDays || !premiumRevision || !premiumPrice) return
    }
    if (isExtraFastDelivery) {
      if (!fastDeliveryPrice || !fastDeliveryDays) return
    }
    if (isRevision) {
      if (!revisionPrice || !revisionDays) return
    }
    if (isExtra1) {
      if (!extra1Description || !extra1Price || !extra1Days) return
    }
    if (isExtra2) {
      if (!extra2Description || !extra2Price || !extra2Days) return
    }
    if (isExtra3) {
      if (!extra3Description || !extra3Price || !extra3Days) return
    }

    let rootData = {
      isPriceFlexible,
      price,
      deliveryDays,
      isExtraFastDelivery,
      isRevision,
      isExtra1,
      isExtra2,
      isExtra3,
      fastDeliveryPrice ,
      fastDeliveryDays,
      revisionPrice,
      revisionDays,
      extra1Description,
      extra1Price,
      extra1Days,
      extra2Description,
      extra2Price,
      extra2Days,
      extra3Description,
      extra3Price,
      extra3Days,
      basicName,
      standardName,
      premiumName,
      basicDescription,
      standardDescription,
      premiumDescription,
      basicMaxDays,
      standardMaxDays,
      premiumMaxDays,
      basicPrice,
      standardPrice,
      premiumPrice,
      basicRevision,
      standardRevision,
      premiumRevision,
    }

    props.dispatch(saveRootPricingData(rootData))
    props.setIsPricePageComplete(true)
    props.nextScreen('Details')
  }

  //handleBackPage
  const handleBackPage = () => {
    let rootData = {
      isPriceFlexible,
      price,
      deliveryDays,
      isExtraFastDelivery,
      isRevision,
      isExtra1,
      isExtra2,
      isExtra3,
      fastDeliveryPrice ,
      fastDeliveryDays,
      revisionPrice,
      revisionDays,
      extra1Description,
      extra1Price,
      extra1Days,
      extra2Description,
      extra2Price,
      extra2Days,
      extra3Description,
      extra3Price,
      extra3Days,
      basicName,
      standardName,
      premiumName,
      basicDescription,
      standardDescription,
      premiumDescription,
      basicMaxDays,
      standardMaxDays,
      premiumMaxDays,
      basicPrice,
      standardPrice,
      premiumPrice,
      basicRevision,
      standardRevision,
      premiumRevision,
    }

    props.dispatch(saveRootPricingData(rootData))
    props.nextScreen('Title')
  }

  //handlePrice
  const handlePrice = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[0].error = 'Root price can not be blank!';
    } else if (value < 5) {
      ERRORS[0].error = 'Please enter a value greater than or equal to  5 for Fixed Price';
    } else {
      ERRORS[0].error = '';
    }
    setErros(ERRORS)
    setPrice(value)
  }

  //handleDeliveryDays
  const handleDeliveryDays = (text) => {
    let ERRORS = errors;
    if (text.length === 0 || text === 0) {
      ERRORS[1].error = 'Days for delivery can not be blank!';
    } else {
      ERRORS[1].error = '';
    }
    setErros(ERRORS)
    console.log('delivery days',text)
    console.log('fastDeliveryDays',fastDeliveryDays)
    if(fastDeliveryDays > text) setFastDeliveryDays('')
    setDeliveryDays(text)
  }

  //handleFastDeliveryPrice
  const handleFastDeliveryPrice = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[2].error = 'Extra fast delivery price can not be blank!!';
    } else if (value < 5) {
      ERRORS[2].error = 'Please enter a value greater than or equal to  5 for Extra fast delivery price';
    } else {
      ERRORS[2].error = '';
    }
    setErros(ERRORS)
    setFastDeliveryPrice(value)
  }

  //handleFastDeliveryDays
  const handleFastDeliveryDays = (text) => {
    console.log('handleFastDeliveryDays')
    let ERRORS = errors;
    if (text.length === 0 || text === 0) {
      ERRORS[3].error = 'Extra fast delivery days can not be blank!!';
    } else {
      ERRORS[3].error = '';
    }
    setErros(ERRORS)
    setFastDeliveryDays(text)
  }

  //handleRevisionPrice
  const handleRevisionPrice = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[4].error = 'Extra revision price can not be blank!!';
    } else if (value < 5) {
      ERRORS[4].error = "Please enter a value greater than or equal to  5 for Extra revision price";
    } else {
      ERRORS[4].error = '';
    }
    setErros(ERRORS);
    setRevisionPrice(value);
  }

  //handleRevisionDays
  const handleRevisionDays = (text) => {
    let ERRORS = errors;
    if (text.length === 0 || text === 0) {
      ERRORS[5].error = "Extra revision days for delivery can't be blank!!";
    } else {
      ERRORS[5].error = '';
    }
    setErros(ERRORS);
    setRevisionDays(text);
  }

  //handleExtra1Description
  const handleExtra1Description = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[6].error = 'Extra1 description can not be blank!!';
    } else {
      ERRORS[6].error = '';
    }
    setErros(ERRORS);
    setExtra1Description(value);
  }

  //handleExtra1Price
  const handleExtra1Price = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[7].error = 'Extra1 price can not be blank!!';
    } else if (value < 5) {
      ERRORS[7].error = "Please enter a value greater than or equal to  5 for Extra1 Price";
    } else {
      ERRORS[7].error = '';
    }
    setErros(ERRORS);
    setExtra1Price(value);
  }

  //handleExtra1Days
  const handleExtra1Days = (text) => {
    let ERRORS = errors;
    if (text.length === 0 || text === 0) {
      ERRORS[8].error = "Extra1 Days for delivery for extra can not be blank!!";
    } else {
      ERRORS[8].error = '';
    }
    setErros(ERRORS);
    setExtra1Days(text);
  }

  //handleExtra2Description
  const handleExtra2Description = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[9].error = 'Extra2 description can not be blank!!';
    } else {
      ERRORS[9].error = '';
    }
    setErros(ERRORS);
    setExtra2Description(value);
  }

  //handleExtra2Price
  const handleExtra2Price = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[10].error = 'Extra2 price can not be blank!!';
    } else if (value < 5) {
      ERRORS[10].error = "Please enter a value greater than or equal to  5 for Extra2 Price";
    } else {
      ERRORS[10].error = '';
    }
    setErros(ERRORS);
    setExtra2Price(value);
  }

  //handleExtra2Days
  const handleExtra2Days = (text) => {
    let ERRORS = errors;
    if (text.length === 0 || text === 0) {
      ERRORS[11].error = "Extra2 Days for delivery for extra can not be blank!!";
    } else {
      ERRORS[11].error = '';
    }
    setErros(ERRORS);
    setExtra2Days(text);
  }

  //handleExtra3Description
  const handleExtra3Description = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[12].error = 'Extra3 description can not be blank!!';
    } else {
      ERRORS[12].error = '';
    }
    setErros(ERRORS);
    setExtra3Description(value);
  }

  //handleExtra3Price
  const handleExtra3Price = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[13].error = 'Extra3 price can not be blank!!';
    } else if (value < 5) {
      ERRORS[13].error = "Please enter a value greater than or equal to  5 for Extra3 Price";
    } else {
      ERRORS[13].error = '';
    }
    setErros(ERRORS);
    setExtra3Price(value);
  }

  //handleExtra3Days
  const handleExtra3Days = (text) => {
    let ERRORS = errors;
    if (text.length === 0 || text === 0) {
      ERRORS[14].error = "Extra3 Days for delivery for extra can not be blank!!";
    } else {
      ERRORS[14].error = '';
    }
    setErros(ERRORS);
    setExtra3Days(text);
  }

  //handleBasicName
  const handleBasicName = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[15].error = 'basic name can not be blank!!';
    } else {
      ERRORS[15].error = '';
    }
    setErros(ERRORS);
    setBasicName(value);
  }

  //handleStandardName
  const handleStandardName = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[16].error = 'standard name can not be blank!!';
    } else {
      ERRORS[16].error = '';
    }
    setErros(ERRORS);
    setStandardName(value);
  }

  //handlePremiumName
  const handlePremiumName = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[17].error = 'premium name can not be blank!!';
    } else {
      ERRORS[17].error = '';
    }
    setErros(ERRORS);
    setPremiumName(value);
  }

  //handleBasicDescription
  const handleBasicDescription = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[18].error = 'basic  Description can not be blank!!';
    } else {
      ERRORS[18].error = '';
    }
    setErros(ERRORS);
    setBasicDescription(value);
  }
  
  //handleStandardDescription
  const handleStandardDescription = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[19].error = 'standard  Description can not be blank!!';
    } else {
      ERRORS[19].error = '';
    }
    setErros(ERRORS);
    setStandardDescription(value);
  }

  //handlePremiumDescription
  const handlePremiumDescription = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[20].error = 'premium  Description can not be blank!!';
    } else {
      ERRORS[20].error = '';
    }
    setErros(ERRORS);
    setPremiumDescription(value);
  }

  //handleBasicPrice
  const handleBasicPrice = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[21].error = 'basic price can not be blank!!';
    } else if (value < 5) {
      ERRORS[21].error = 'Please enter a value greater than or equal to  5  for basic Price';
    } else {
      ERRORS[21].error = '';
    }
    setErros(ERRORS)
    setBasicPrice(value)
  }

  //handleStandardPrice
  const handleStandardPrice = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[22].error = 'standard price can not be blank!!';
    } else if (value < 5) {
      ERRORS[22].error = 'Please enter a value greater than or equal to  5  for standard Price';
    } else {
      ERRORS[22].error = '';
    }
    setErros(ERRORS)
    setStandardPrice(value)
  }
  
  //handlePremiumPrice
  const handlePremiumPrice = (value) => {
    let ERRORS = errors;
    if (value.length === 0) {
      ERRORS[23].error = 'premium price can not be blank!!';
    } else if (value < 5) {
      ERRORS[23].error = 'Please enter a value greater than or equal to  5  for premium Price';
    } else {
      ERRORS[23].error = '';
    }
    setErros(ERRORS)
    setPremiumPrice(value)
  }
  console.log('delivery out ========',deliveryDays)
  console.log('fastDeliveryDays out==========',fastDeliveryDays)
  return (
    <>
      {
        errors.map((item, index) => {
          if (item.error) {
            return (
              <View key={index} style={styles.errorContainer}>
                <Text style={styles.error}>
                  {item.error}
                </Text>
              </View>
            )
          }
        })
      }
      <View style={styles.container}>
        <View style={styles.price_wrapper}>
          <Text style={styles.fixedText}>Fixed Price</Text>
          <Switch
            value={isPriceFlexible}
            style={{ marginHorizontal: 10 }}
            onChange={() => setIsPriceFlexible(!isPriceFlexible)}
          />
          <Text style={styles.fixedText}>Flexible Price</Text>
        </View>
        {
          isPriceFlexible ?
            <>
              {/* Flexible Price */}
              <View style={styles.flexibleView} >
                {/*Scroll Icon*/}
                <Icon
                  name="chevron-right"
                  size={20}
                  color="black"
                  style={styles.scrollIcon}
                  onPress={() => setScrollCount(scrollCount + 1)}
                />
                <ScrollView
                  ref={refScroll}
                  horizontal={true}
                >
                  {/*First Column View*/}
                  <View style={styles.tableFirstColumn}>
                    <View style={styles.tableHeaderFirstColumnItem} />
                    <View style={styles.tableFirstColumnItem}>
                      <Text style={styles.firstColumnText}>Name</Text>
                    </View>
                    <View style={styles.tableFirstColumnDescriptionItem}>
                      <Text style={styles.firstColumnText}>Description</Text>
                    </View>
                    <View style={styles.tableFirstColumnItem}>
                      <Text style={styles.firstColumnText}>I will deliver in</Text>
                    </View>
                    <View style={styles.tableFirstColumnItem}>
                      <Text style={styles.firstColumnText}>Revisions</Text>
                    </View>
                    <View style={styles.tableFirstColumnItem}>
                      <Text style={styles.firstColumnText}>Price</Text>
                    </View>
                  </View>
                  {/*Second Column / Basic View*/}
                  <View style={styles.tableSecondColumn}>
                    <View style={styles.tableHeaderItem}>
                      <Text style={styles.headerText}>Basic</Text>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <TextInput
                        style={styles.input}
                        onChangeText={value => handleBasicName(value)}
                        placeholder="Package name"
                        value={basicName}
                      />
                    </View>
                    <View style={styles.tableDescriptionItem}>
                      <TextInput
                        style={[styles.input]}
                        numberOfLines={5}
                        onChangeText={value => handleBasicDescription(value)}
                        placeholder="Package description"
                        value={basicDescription}
                      />
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <View
                        style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                      >
                        <Picker
                          style={styles.pickerStyle}
                          selectedValue={basicMaxDays ? basicMaxDays : 0}
                          onValueChange={text => setBasicMaxDays(text)}
                        >
                          {days.map((item) => {
                            if (item.id > 0) {
                              return (
                                <Picker.Item key={item.label} label={item.label} value={item.id} />
                              )
                            }
                          })}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <View
                        style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                      >
                        <Picker
                          style={styles.pickerStyle}
                          selectedValue={basicRevision ? basicRevision : 0}
                          onValueChange={text => setBasicRevision(text)}
                        >
                          {revisions.map((item) => (
                            <Picker.Item key={item.label} label={item.label} value={item.id} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <TextInput
                        style={[styles.input]}
                        onChangeText={value => handleBasicPrice(value)}
                        placeholder="Package price ($)"
                        value={basicPrice}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  {/*Thired Column / Standard View*/}
                  <View style={styles.tableSecondColumn}>
                    <View style={styles.tableHeaderItem}>
                      <Text style={styles.headerText}>Standard</Text>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <TextInput
                        style={styles.input}
                        onChangeText={value => handleStandardName(value)}
                        placeholder="Package name"
                        value={standardName}
                      />
                    </View>
                    <View style={styles.tableDescriptionItem}>
                      <TextInput
                        style={[styles.input]}
                        numberOfLines={5}
                        onChangeText={value => handleStandardDescription(value)}
                        placeholder="Package description"
                        value={standardDescription}
                      />
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <View
                        style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                      >
                        <Picker
                          style={styles.pickerStyle}
                          selectedValue={standardMaxDays ? standardMaxDays : 0}
                          onValueChange={text => setStandardMaxDays(text)}
                        >
                          {days.map((item) => {
                            if (item.id > 0) {
                              return (
                                <Picker.Item key={item.label} label={item.label} value={item.id} />
                              )
                            }
                          })}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <View
                        style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                      >
                        <Picker
                          style={styles.pickerStyle}
                          selectedValue={standardRevision ? standardRevision : 0}
                          onValueChange={text => setStandardRevision(text)}
                        >
                          {revisions.map((item) => (
                            <Picker.Item key={item.label} label={item.label} value={item.id} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <TextInput
                        style={[styles.input]}
                        onChangeText={value => handleStandardPrice(value)}
                        placeholder="Package price ($)"
                        value={standardPrice}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  {/*Fourth Column / Premium View*/}
                  <View style={styles.tableSecondColumn}>
                    <View style={styles.tableHeaderItem}>
                      <Text style={styles.headerText}>Premium</Text>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <TextInput
                        style={styles.input}
                        onChangeText={value => handlePremiumName(value)}
                        placeholder="Package name"
                        value={premiumName}
                      />
                    </View>
                    <View style={styles.tableDescriptionItem}>
                      <TextInput
                        style={[styles.input]}
                        numberOfLines={5}
                        onChangeText={value => handlePremiumDescription(value)}
                        placeholder="Package description"
                        value={premiumDescription}
                      />
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <View
                        style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                      >
                        <Picker
                          style={styles.pickerStyle}
                          selectedValue={premiumMaxDays ? premiumMaxDays : 0}
                          onValueChange={text => setPremiumMaxDays(text)}
                        >
                          {days.map((item) => {
                            if (item.id > 0) {
                              return (
                                <Picker.Item key={item.label} label={item.label} value={item.id} />
                              )
                            }
                          })}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <View
                        style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                      >
                        <Picker
                          style={styles.pickerStyle}
                          selectedValue={premiumRevision ? premiumRevision : 0}
                          onValueChange={text => setPremiumRevision(text)}
                        >
                          {revisions.map((item) => (
                            <Picker.Item key={item.label} label={item.label} value={item.id} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.tableSecondColumnItem}>
                      <TextInput
                        style={[styles.input]}
                        onChangeText={value => handlePremiumPrice(value)}
                        placeholder="Package price ($)"
                        value={premiumPrice}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </>
            :
            <>
              {/* Fixed Price */}
              <View style={styles.input_wrapper}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 5 }]}
                  onChangeText={value => {
                    handlePrice(value)
                  }}
                  placeholder="Price ($)"
                  value={price}
                  keyboardType="number-pad"
                />
                <View
                  style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                >
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={deliveryDays ? deliveryDays : 0}
                    onValueChange={text => {
                      handleDeliveryDays(text)
                    }}
                  >
                    {days.map((item) => (
                      <Picker.Item key={item.label} label={item.label} value={item.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            </>
        }
        {/* Extra Delivery and Revision */}
        <View style={styles.extra_wrapper}>
          {/* Extra Delivery*/}
          <View style={styles.fast_delivery_wrapper}>
            <View style={styles.fast_delivery_checkbox}>
              <CheckBox
                value={isExtraFastDelivery}
                onValueChange={() => setIsExtraFastDelivery(!isExtraFastDelivery)}
              />
              <Text style={styles.extraText} >Extra fast delivery</Text>
            </View>
            {
              isExtraFastDelivery ?
                <View style={styles.input_wrapper}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                    onChangeText={value => handleFastDeliveryPrice(value)}
                    placeholder="For extra ($)"
                    value={fastDeliveryPrice}
                    keyboardType="number-pad"
                  />
                  <View
                    style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                  >
                    <Picker
                      style={styles.pickerStyle}
                      selectedValue={fastDeliveryDays ? fastDeliveryDays : 0}
                      onValueChange={text => handleFastDeliveryDays(text)}
                    >

                      {/* {
                        deliveryDays === 0 ? 
                        <Picker.Item
                          key={'key'}
                          label={'Delivery will decrease (days)'}
                          value={0}
                        /> 
                        : null

                      } */}

                      {days.map((item) => {
                        //fixed price 
                        if(!isPriceFlexible){
                          if (item.id < deliveryDays) {
                            return (
                              <Picker.Item
                                key={item.label}
                                label={item.id === 0 ? 'Delivery will decrease (days)' : item.label}
                                value={item.id}
                              />
                            )
                          }
                        }else if(isPriceFlexible){
                          //flexible price
                          if (item.id < minNumber) {
                            return (
                              <Picker.Item
                                key={item.label}
                                label={item.id === 0 ? 'Delivery will decrease (days)' : item.label}
                                value={item.id}
                              />
                            )
                          }
                        }
                    
                      })}
                    </Picker>
                  </View>
                </View> : null
            }
          </View>
          <Dash dashColor="#E8EEF1" style={{ width: '100%', height: 1 }} />
          {/* Extra Revision */}
          <View style={styles.fast_delivery_wrapper}>
            <View style={styles.fast_delivery_checkbox}>
              <CheckBox value={isRevision}
                onValueChange={() => setIsRevision(!isRevision)}
              />
              <Text style={styles.extraText} >Extra Revision</Text>
            </View>
            {
              isRevision ?
                <View style={styles.input_wrapper}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                    onChangeText={value => handleRevisionPrice(value)}
                    placeholder="For extra ($)"
                    value={revisionPrice}
                    keyboardType="number-pad"
                  />
                  <View
                    style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                  >
                    <Picker
                      style={styles.pickerStyle}
                      selectedValue={ revisionDays ? revisionDays : 0}
                      onValueChange={text => handleRevisionDays(text)}
                    >
                      {days.map((item) => (
                        <Picker.Item
                          key={item.label}
                          label={item.id === 0 ? 'Delivery will increase (days)' : item.label}
                          value={item.id} />
                      ))}
                    </Picker>
                  </View>
                </View> : null
            }
          </View>
        </View>
        {/* Extra1 , Extra2 , Extra3 */}
        <>
          {
            addNewExtraCount > 0 ?
              <>
                <View style={styles.extra_wrapper}>
                  {
                    addNewExtraCount >= 1 ?
                      <>
                        {/* Extra1 */}
                        <View style={styles.fast_delivery_wrapper}>
                          <View style={styles.fast_delivery_checkbox}>
                            <CheckBox
                              value={isExtra1}
                              onValueChange={() => setIsExtra1(!isExtra1)}
                            />
                            <Text style={styles.extraText} >Extra1</Text>
                          </View>
                          {
                            isExtra1 ?
                              <View style={styles.extraView}>
                                <TextInput
                                  style={[styles.input]}
                                  numberOfLines={3}
                                  onChangeText={value => handleExtra1Description(value)}
                                  placeholder="Description"
                                  value={extra1Description}
                                />
                                <View style={styles.input_wrapper}>
                                  <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                                    onChangeText={value => handleExtra1Price(value)}
                                    placeholder="For extra ($)"
                                    value={extra1Price}
                                    keyboardType="number-pad"
                                  />
                                  <View
                                    style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                                  >
                                    <Picker
                                      style={styles.pickerStyle}
                                      selectedValue={extra1Days ? extra1Days : 0}
                                      onValueChange={text => handleExtra1Days(text)}
                                    >
                                      {days.map((item) => (
                                        <Picker.Item
                                          key={item.label}
                                          label={item.id === 0 ? 'Delivery will increase (days)' : item.label}
                                          value={item.id} />
                                      ))}
                                    </Picker>
                                  </View>
                                </View>
                              </View>
                              : null
                          }
                        </View>
                      </>
                      : null
                  }
                  {
                    addNewExtraCount >= 2 ?
                      <>
                        <Dash dashColor="#E8EEF1" style={{ width: '100%', height: 1 }} />
                        {/* Extra2*/}
                        <View style={styles.fast_delivery_wrapper}>
                          <View style={styles.fast_delivery_checkbox}>
                            <CheckBox
                              value={isExtra2}
                              onValueChange={() => setIsExtra2(!isExtra2)}
                            />
                            <Text style={styles.extraText} >Extra2</Text>
                          </View>
                          {
                            isExtra2 ?
                              <View style={styles.extraView}>
                                <TextInput
                                  style={[styles.input]}
                                  numberOfLines={3}
                                  onChangeText={value => handleExtra2Description(value)}
                                  placeholder="Description"
                                  value={extra2Description}
                                />
                                <View style={styles.input_wrapper}>
                                  <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                                    onChangeText={value => handleExtra2Price(value)}
                                    placeholder="For extra ($)"
                                    value={extra2Price}
                                    keyboardType="number-pad"
                                  />
                                  <View
                                    style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                                  >
                                    <Picker
                                      style={styles.pickerStyle}
                                      selectedValue={extra2Days ? extra2Days : 0}
                                      onValueChange={text => handleExtra2Days(text)}
                                    >
                                      {days.map((item) => (
                                        <Picker.Item
                                          key={item.label}
                                          label={item.id === 0 ? 'Delivery will increase (days)' : item.label}
                                          value={item.id} />
                                      ))}
                                    </Picker>
                                  </View>
                                </View>
                              </View>
                              : null
                          }
                        </View>
                      </> : null

                  }
                  {
                    addNewExtraCount >= 3 ?
                      <>
                        <Dash dashColor="#E8EEF1" style={{ width: '100%', height: 1 }} />
                        {/* Extra3*/}
                        <View style={styles.fast_delivery_wrapper}>
                          <View style={styles.fast_delivery_checkbox}>
                            <CheckBox
                              value={isExtra3}
                              onValueChange={() => setIsExtra3(!isExtra3)}
                            />
                            <Text style={styles.extraText} >Extra3</Text>
                          </View>
                          {
                            isExtra3 ?
                              <View style={styles.extraView}>
                                <TextInput
                                  style={[styles.input]}
                                  numberOfLines={3}
                                  onChangeText={value => handleExtra3Description(value)}
                                  placeholder="Description"
                                  value={extra3Description}
                                />
                                <View style={styles.input_wrapper}>
                                  <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                                    onChangeText={value => handleExtra3Price(value)}
                                    placeholder="For extra ($)"
                                    value={extra3Price}
                                    keyboardType="number-pad"
                                  />
                                  <View
                                    style={[styles.pickerViewStyle, { marginLeft: 5 }]}
                                  >
                                    <Picker
                                      style={styles.pickerStyle}
                                      selectedValue={extra3Days ? extra3Days : 0}
                                      onValueChange={text => handleExtra3Days(text)}
                                    >
                                      {days.map((item) => (
                                        <Picker.Item
                                          key={item.label}
                                          label={item.id === 0 ? 'Delivery will increase (days)' : item.label}
                                          value={item.id} />
                                      ))}
                                    </Picker>
                                  </View>
                                </View>
                              </View>
                              : null
                          }
                        </View>
                      </> : null
                  }
                </View>
              </>
              : null
          }
        </>
        {/* + Add extra */}
        <>
          {
            addNewExtraCount < 3 ?
              <Text
                onPress={() => setAddNewExtraCount(addNewExtraCount + 1)}
                style={styles.addNewExtraText}>
                + Add New Extra
          </Text>
              : null
          }
        </>
        {/* Buttons */}
        <View
          style={styles.buttonsContainer}
        >
          <TouchableOpacity
            style={[styles.button_wrapper, { backgroundColor: '#748f9e' }]}
            onPress={handleBackPage}>
            <Text style={styles.button_text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button_wrapper, { backgroundColor: '#10a2ef' }]}
            onPress={handlePricingSaveAsDraft}>
            <Text style={styles.button_text}>Save as Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button_wrapper, { backgroundColor: '#2ec09c' }]}
            onPress={handlePricePageNext}>
            <Text style={styles.button_text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = state => {
  return {
    login: state.LoginUser,
    root: state.addRoot,
  };
};


const PricingScreen = connect(mapStateToProps)(Pricing);
export default PricingScreen;
