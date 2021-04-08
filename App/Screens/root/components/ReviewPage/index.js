import React, {Fragment, useEffect} from 'react';
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
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './index.style';
import {connect} from 'react-redux';


const Review = (props) => {

    const {root} = props;
    useEffect(() => {
      
    }, [])
    const handlePostRoot = () => {
      const formData = new FormData();

      //data from title screen
      formData.append('r_title',props.root.rootTitle);
      formData.append('r_category_id',props.root.category); 
      formData.append('r_subcategory_ids',props.root.subCategory);
      let image = {
        uri: props.root.image.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      }
      console.log("image=========",image)
      formData.append('r_root_file[]',image);
  
      //data from price screen
      if(!props.root.isPriceFlexible){
        //fixed price
        formData.append('r_price_status',props.root.isPriceFlexible ? 1 : 0);//0 = Fixed,1=Flexibel
        formData.append('r_fiixed_price[price]',parseInt(props.root.price));
        formData.append('r_fiixed_price[max_days]',props.root.deliveryDays);
        formData.append('r_minimum_price',parseInt(props.root.price));
      }else{
        //flexible price
        formData.append('r_minimum_price',Math.min(props.root.basicPrice,props.root.standardPrice,props.root.premiumPrice));
        formData.append('r_price_status',props.root.isPriceFlexible ? 1 : 0);//0 = Fixed,1=Flexibel
        formData.append('r_flexible_price[basic][name]',props.root.basicName);
        formData.append('r_flexible_price[standard][name]',props.root.standardName);
        formData.append('r_flexible_price[premium][name]',props.root.premiumName);
        formData.append('r_flexible_price[basic][description]',props.root.basicDescription);
        formData.append('r_flexible_price[standard][description]',props.root.standardDescription);
        formData.append('r_flexible_price[premium][description]',props.root.premiumDescription);
        formData.append('r_flexible_price[basic][max_days]',props.root.basicMaxDays);
        formData.append('r_flexible_price[standard][max_days]',props.root.standardMaxDays);
        formData.append('r_flexible_price[premium][max_days]',props.root.premiumMaxDays);
        formData.append('r_flexible_price[basic][price]',props.root.basicPrice);
        formData.append('r_flexible_price[standard][price]',props.root.standardPrice);
        formData.append('r_flexible_price[premium][price]',props.root.premiumPrice);
        formData.append('r_flexible_price[basic][revision]',props.root.basicRevision);
        formData.append('r_flexible_price[standard][revision]',props.root.standardRevision);
        formData.append('r_flexible_price[premium][revision]',props.root.premiumRevision);
      } 
      if(props.root.isExtraFastDelivery){
        //extra fast delivery
        formData.append('r_extra[fast_delivery][price]',props.root.fastDeliveryPrice);
        formData.append('r_extra[fast_delivery][max_days]',props.root.fastDeliveryDays);
        formData.append('r_extra[fast_delivery][status]', 'checked');
        
      }
      if(props.root.isRevision){
        //revision
        formData.append('r_extra[revision][price]',props.root.revisionPrice);
        formData.append('r_extra[revision][max_days]',props.root.revisionDays);
        formData.append('r_extra[revision][status]','checked');
      }
      if(props.root.isExtra1){
        //extra1
        formData.append('r_extra[extra1][description]',props.root.extra1Description);
        formData.append('r_extra[extra1][price]',props.root.extra1Price);
        formData.append('r_extra[extra1][max_days]',props.root.extra1Days);
        formData.append('r_extra[extra1][status]','checked');
      }
      if(props.root.isExtra2){
        //extra2
        formData.append('r_extra[extra2][description]',props.root.extra2Description);
        formData.append('r_extra[extra2][price]',props.root.extra2Price);
        formData.append('r_extra[extra2][max_days]',props.root.extra2Days);
        formData.append('r_extra[extra2][status]','checked');
      }
      if(props.root.isExtra3){
        //extra3
        formData.append('r_extra[extra3][description]',props.root.extra3Description);
        formData.append('r_extra[extra3][price]',props.root.extra3Price);
        formData.append('r_extra[extra3][max_days]',props.root.extra3Days);
        formData.append('r_extra[extra3][status]','checked');
      }
      //data from detail screen
      formData.append('r_desc',props.root.description);
      formData.append('r_instruction_to_buyer',props.root.instruction);
      let video = [];
      props.root.videos.map(item=>{
        if (item != ""){
          video.push(item);
        }
      })
      formData.append('r_video_link[]',video.join());
      if(props.root.rootId){
        formData.append('r_id',props.root.rootId);
      } 
      //tags and files 
     
      // let tags = props.root.tags.tagsArray;
      // console.log(tags)
      formData.append('r_tags',props.root.tags.tagsArray.join());

      //post root
      formData.append('r_type',0);// 0 : post 
      console.log("formdata=============",formData)
      props.handlePostRoot(formData)
    }

    return (
      <View style={styles.container}>
        <View style={styles.banner_wrapper}>
          <Image
            style={{height: null, width: null, flex: 1}}
            source={root.image}
          />
        </View>
        <View style={styles.about_root_wrapper}>
          <View style={styles.about_root_text_wrapper}>
            <Text>Root Title</Text>
            <Text>{root.rootTitle}</Text>
          </View>
          <View style={styles.about_root_text_wrapper}>
            <Text>Category</Text>
            <Text>{root.category}</Text>
          </View>
          <View style={styles.about_root_text_wrapper}>
            <Text>Sub Category</Text>
            <Text>{root.subcategory}</Text>
          </View>
          <View style={styles.about_root_text_wrapper}>
            <Text>Price($)</Text>
            <Text>{root.price && root.price + " USD"}</Text>
          </View>
          <View style={styles.about_root_text_wrapper}>
            <Text>Delivery(days)</Text>
            <Text>{root.deliveryDays!="" && root.deliveryDays}</Text>
          </View>
          {root.isExtraFastDelivery&&
          <View style={styles.about_root_text_wrapper}>
            <Text>Extra Delivery(days)</Text>
            <Text>{root.fastDeliveryDays!="" && root.fastDeliveryDays}</Text>
          </View>
          }
          {root.isExtraFastDelivery&&
          <View style={styles.about_root_text_wrapper}>
            <Text>Extra Delivery Price($)</Text>
            <Text>{root.fastDeliveryPrice!="" && root.fastDeliveryPrice}</Text>
          </View>
          }
        </View>
        <View style={styles.dotted_underline} />
        <View style={styles.description_wrapper}>
          <Text style={styles.description_title}>Description</Text>
          <Text style={styles.description_body}>{root.description}</Text>
        </View>
        <View style={styles.description_wrapper}>
          <Text style={styles.description_title}>Intruction to Buyer</Text>
          <Text style={styles.description_body}>{root.instruction}</Text>
        </View>
        <View style={styles.description_wrapper}>
          <Text style={styles.description_title}>Search Tags</Text>
        </View>
        <View style={styles.dotted_underline} />
        <View style={{flexDirection:'row'}}>
          <Text style={styles.description_body}>
          {root.tags.tagsArray.join()}
          </Text>
        </View>  
        <View 
        style={styles.buttonsContainer}
        >
          <TouchableOpacity
            style={[styles.button_wrapper,{backgroundColor: '#10a2ef'}]}
            onPress={() => props.nextScreen('Details')}>
            <Text style={styles.button_text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button_wrapper,{backgroundColor: '#2ec09c'}]}
              onPress={() => handlePostRoot()}>
            <Text style={styles.button_text}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.privacy_text_wrapper}>
          <Text style={styles.privacy_text}>
            By Clicking Post Root you Accept Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    );
  }

const mapStateToProps = state => {
  return {
    root: state.addRoot,
    token: state.LoginUser.userToken,
  };
};

const ReviewScreen = connect(mapStateToProps)(Review);
export default ReviewScreen;

