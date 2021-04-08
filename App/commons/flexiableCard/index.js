import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
// import styles from './index.style';

flexible = props => {
  const {rootDetails, flexiblePrice} = props
  const [basicClick, setBasicClick] = useState(false);
  const [standardClick, setStandardClick] = useState(false);
  const [premiumClick, setPremiumClick] = useState(false);
  console.log('props===', rootDetails)
  useEffect(() => {
    
  }, [])

  


  return (
    <ScrollView style={styles.card} horizontal={true}>
      <View style={{ display: 'flex', width: 150}}>
        <View style={[styles.horizantaldoshline, {marginTop:40}]} />
        <View style={{height:100, justifyContent:'center'}}>
          <Text style={styles.leftTitle}>Name</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:400, justifyContent:'center'}}>
          <Text style={styles.leftTitle}>Description</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, justifyContent:'center'}}>
          <Text style={styles.leftTitle}>Delivery Time</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, justifyContent:'center'}}>
          <Text style={styles.leftTitle}>Revisions</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, justifyContent:'center'}}>
          <Text style={styles.leftTitle}>Price</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:80, justifyContent:'center'}}>
          <Text style={styles.leftTitle}>Order</Text>
        </View>
      </View>
      <View style={styles.verticaldoshline} />
      <View style={{ display: 'flex', width: 150}}>
        <View style={{height:40, justifyContent: 'center', alignItems:'center'}}>
          <Text style={styles.headerTitle}>
            BASIC
          </Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:100, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.basic.name}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:400, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.basic.description}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.basic.max_days} Days</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.basic.revision}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>$ {rootDetails.r_flexible_price.basic.price}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:80, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity 
              style={[styles.orderButton, {backgroundColor: basicClick?'#10a2ef':'#fff'}]} 
              onPress={() => {
                setBasicClick(true); 
                setStandardClick(false); 
                setPremiumClick(false); 
                flexiblePrice(rootDetails.r_flexible_price.basic.price, rootDetails.r_flexible_price.basic.max_days, rootDetails.r_flexible_price.basic.revision)}} 
          >
             <Text style={{fontSize: 15, color: '#000', textAlign:'center', fontWeight: '500'}}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.verticaldoshline} />
      <View style={{ display: 'flex', width: 150}}>
        <View style={{height:40, justifyContent: 'center', alignItems:'center'}}>
          <Text style={styles.headerTitle}>
            STANDARD
          </Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:100, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.standard.name}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:400, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.standard.description}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.standard.max_days} Days</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.standard.revision}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>$ {rootDetails.r_flexible_price.standard.price}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:80, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity 
            style={[styles.orderButton, {backgroundColor: standardClick?'#10a2ef':'#fff'}]} 
            onPress={() => {
              setBasicClick(false); 
              setStandardClick(true); 
              setPremiumClick(false); 
              flexiblePrice(rootDetails.r_flexible_price.standard.price, rootDetails.r_flexible_price.standard.max_days, rootDetails.r_flexible_price.standard.revision)}} 
          >
             <Text style={{fontSize: 15, color: '#000', textAlign:'center', fontWeight: '500'}}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.verticaldoshline} />
      <View style={{ display: 'flex', width: 150}}>
        <View style={{height:40, justifyContent: 'center', alignItems:'center'}}>
          <Text style={styles.headerTitle}>
            PREMIUM
          </Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:100, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.premium.name}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:400, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.premium.description}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15,  justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.premium.max_days} Days</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>{rootDetails.r_flexible_price.premium.revision}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:50, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.bodyTitle}>$ {rootDetails.r_flexible_price.premium.price}</Text>
        </View>
        <View style={styles.horizantaldoshline} />
        <View style={{height:80, paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity 
            style={[styles.orderButton, {backgroundColor: premiumClick?'#10a2ef':'#fff'}]} 
            onPress={() => {
              setBasicClick(false); 
              setStandardClick(false); 
              setPremiumClick(true); 
              flexiblePrice(rootDetails.r_flexible_price.premium.price, rootDetails.r_flexible_price.premium.max_days, rootDetails.r_flexible_price.premium.revision)}} 
          >
             <Text style={{fontSize: 15, color: '#000', textAlign:'center', fontWeight: '500'}}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    userId: state.LoginUser.user_id,
  };
};

const flexibleCard = connect(
  mapStateToProps,
  null,
)(flexible);

export default flexibleCard;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 3,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#e7e7e7',
  },
  verticaldoshline: {
    width: 1,
    height: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed'
  },
  horizantaldoshline: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed'
  },
  headerTitle: {
    fontSize:16, 
    color: '#10a2ef', 
    textAlign: 'center',
    fontWeight: '700'
  },
  leftTitle: {
    fontSize:16,
    color: '#748f9e',
    marginLeft: 25
  },
  bodyTitle:{
    fontSize:14, 
    textAlign:'center', 
    color: '#000',
    fontWeight: '500'
  },
  orderButton: {
    width:70, 
    height:30, 
    alignItems:'center', 
    justifyContent:'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#10a2ef'
  }
});