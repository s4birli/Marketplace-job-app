import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const RootCardList = props => {
  return (
    <TouchableOpacity onPress={()=>props.navigation.navigate('RootPage',{
      isreview:true,
      token:props.token,
      root_id:props.r_id,
      user_id:props.r_user_id
    })}>
    {/* <View style={styles.feedListCard}>
      <View style={styles.feedListImageContainer}>
        <Image style={styles.feedListImage} source={{uri:props.r_root_image}} />
      </View>
      <View style={styles.feedListRight}>
        <Text numberOfLines={1} style={styles.feedListName}>
          {props.r_title}
        </Text>
        <Text style={{marginTop: 10, fontSize: 10}}>
          STARTING AT{'      '}
          <Text style={{fontWeight: 'bold', color: '#2EC09C'}}>
           $ {props.r_minimum_price}
          </Text>
        </Text>
      </View>
    </View> */}
    <View style={styles.cardView}>
      <View style={{flexDirection: 'row'}}>
      <Image style={{height: 50, width: 50, borderRadius: 15}} source={{uri:props.r_root_image}} />
      <View style={{flex: 1, marginLeft: 15}}>
        <Text style={{flex: 1, flexWrap: 'wrap'}}>
          {props.r_title}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
      <Image style={styles.feedListImage} source={{uri:props.r_root_image}} />
      </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default RootCardList;

const styles = StyleSheet.create({
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
  feedListImage: {flex: 1, height: 50, width: 50},
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
  cardView: {
    flexDirection: 'row',
    height: null,
    width:null,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'column'
  }
});
