import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import styles from './index.style';
RootCardHorizontal = props => {
  return (
    <TouchableOpacity 
    onPress={() => props.navigation.navigate('RootPage', {
      isreview:true,
      token: props.token,
      root_id: props.r_id,
      user_id: props.r_user_id
    })}
    >
        <View style={styles.headerViewStyle}>
          <Image style={styles.headerImageStyle} source={{ uri: props.r_root_image }} />
          <Text numberOfLines={3} style={styles.headerTitleStyle}>
            {props.r_title}
          </Text>
        </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};

const roots = connect(
  mapStateToProps,
  null,
)(RootCardHorizontal);

export default roots;
