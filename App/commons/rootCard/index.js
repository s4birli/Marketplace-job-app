import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import styles from './index.style';

RootCard = props => {
  const [online, setOnline] = useState( props.is_online == 1 ? true : false)
  useEffect(() => {
    const socket = global.socket
    socket.on('user_message', (data) => {
      const userMessage = JSON.parse(data)
      if (userMessage.type == "user_login") {
        if (props.r_user_id == userMessage.data.user_id) {
          console.log("in root card socket connection use online...............", data)
          setOnline(true)
        }
      } else if (userMessage.type == "user_logout") {
        if (props.r_user_id == userMessage.data.user_id) {
          console.log("in root card socket connection use offline...............", data)
          setOnline(false)
        }
      }
    })
  }, [])

  


  return (
    <View >
      <View style={[styles.cardView, styles.shadow]}>
        <View
          style={styles.headerViewStyle}>
          <>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('RootPage', {
                isreview: true,
                token: props.token,
                root_id: props.r_id,
                user_id: props.r_user_id
              })}
            >
              <Image
                style={styles.headerImageStyle}
                resizeMode={'contain'}
                source={{ uri: props.r_root_image }}
              />
            </TouchableOpacity>
            <Text
              onPress={() => props.navigation.navigate('RootPage', {
                isreview: true,
                token: props.token,
                root_id: props.r_id,
                user_id: props.r_user_id
              })}
              numberOfLines={3}
              style={styles.headerTitleStyle}>
              {props.r_title}
            </Text>
          </>
        </View>
        <View style={styles.doshline} />
        <View style={{ flexDirection: 'row', marginTop: 10, padding: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Profile', {
                user_id: props.r_user_id,
                root_id: props.r_id
              })
            }}
            style={{ flexDirection: 'row' }}>
            <>
              <View>
                <View
                  style={online ?
                    styles.isOnline :
                    styles.isOffline} />
                <Image style={{ height: 40, width: 40, borderRadius: 40 }} source={{ uri: props.profile }} />
              </View>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>{props.name}</Text>
            </>
          </TouchableOpacity>
          <View
            style={{ flexDirection: 'column', padding: 5 }}>
            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
              {
                props.r_rating_count !== 0 ?
                  <>
                    <Rating
                      imageSize={18}
                      readonly
                      startingValue={1}
                      ratingCount={1}
                      style={{ marginLeft: 5 }}
                    />
                    <Text
                      style={
                        styles.starRatingText
                      }>
                      {`${props.r_rating}`}
                    </Text>
                    <Text
                      style={{ fontSize: 13, color: '#748f9e' }}>
                      ({props.r_rating_count})
                  </Text>
                  </> :
                  <Text
                    style={{ fontSize: 13, color: 'gray' }}>
                    New Root
                </Text>
              }
            </View>
            {props.c_title&&
            <Text
              onPress={() => {
                console.log('Open', props.c_parent_id, props.c_id)
                props.navigation.navigate('AdvanceSearch', { 'c_id': props.c_parent_id, 'sub_c_id': props.c_id })
              }}
              style={{ fontSize: 12, color: '#748f9e' }}>
              {`${(props.c_title).toUpperCase()}`}
            </Text>
            }
          </View>
        </View>
        <View style={styles.doshline} />
        <View style={{
          flex: 1,
          alignItems: 'center',
          alignContent: 'center',
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          {
            props.r_price_status ?
              <Text
                style={styles.startingAtText}
              >
                STARTING AT
              </Text> : null
          }
          <Text
            style={styles.startingPrice}
          >${props.r_minimum_price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    userId: state.LoginUser.user_id,
  };
};

const roots = connect(
  mapStateToProps,
  null,
)(RootCard);

export default roots;
