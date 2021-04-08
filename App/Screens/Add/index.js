import React, { Component, useEffect } from 'react';
import { Animated, View, Text } from "react-native";
import {
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import{
    Button
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import {
    widthPercentageToDP as wp, heightPercentageToDP,
} from '../../commons/responsive_design';

const AddButton = (props) => {
    const mode = new Animated.Value(0);
    const toggleView = () => {
        if(props.LoginUser.type === 1){
            props.navigation.navigate('AddRequest');
        } else{
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                duration: 300
            }).start();
        }
    };

    const firstY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -60]
    });
  
    const opacity = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    return (
        <View style={{
            position: 'absolute',
            alignItems: 'center',
        }}>
            <Animated.View style={{
                position: 'absolute',
                borderWidth:1,
                borderRadius:3,
                borderColor:'#DDD',
                top: firstY,
                opacity
            }}
            >
                <View
                style={{
                    display:'flex',
                    flexDirection:'row'
                }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            toggleView()
                            props.profileData !== null&&
                            <>
                                {
                                (props.LoginUser.type == 0 && (props.profileData.first_name == '' || props.profileData.last_name == '' || props.profileData.country == ''|| props.profileData.email == ''|| props.profileData.timezone == '' || props.profileData.description == ''))?
                                props.navigation.navigate('EditProfile')
                                :
                                props.navigation.navigate('PostRoot')
                                }
                            </>
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            backgroundColor: 'white',
                            width: wp(40),
                            padding: 10,
                            zIndex : 1
                        }}
                    >
                        <Text 
                        style={{ 
                            fontSize: 12, 
                            color: '#10a2ef', 
                            fontWeight: '600' 
                        }}>
                            POST ROOT
                    </Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            toggleView()
                            props.navigation.navigate('AddRequest')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            backgroundColor: 'white',
                            width: wp(40),
                            padding: 10,
                            zIndex: 1
                        }}
                    >
                        <Text style={{ fontSize: 12, color: '#10a2ef', fontWeight: '600' }}>
                            REQUEST OFFERS
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </Animated.View>
            <Animated.View>
                <Icon
                onPress={toggleView}
                name="plus-circle" 
                size={27} 
                color="#10a2ef" />
            </Animated.View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        LoginUser: state.LoginUser,
        profileData: state.userProfile.profiledata,
    };
};
  
const AddScreen = connect(mapStateToProps)(AddButton);

export default AddScreen;

