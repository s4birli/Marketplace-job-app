import { StyleSheet, Platform } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp , 
    moderateScale , 
    verticalScale,
    scale,
    screenWidth,
    screenHeight
} from '../../../../commons/responsive_design';

const IS_IOS = Platform.OS === 'ios';

export default StyleSheet.create({
    backgroundImageView : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 5,
      borderWidth:1,
      borderColor:'#DDD'
    },
    backgroundImage: {
        flex : 1,
        width: 200,
        aspectRatio : 1,
      },
      circleDiv: {
        position: "absolute",
        bottom : verticalScale(20),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: scale(10),
      },
      inActiveCircle: {
        width: scale(6),
        height: scale(6),
        borderRadius: moderateScale(3),
        margin: scale(3),
        backgroundColor: "darkgray",
        opacity : 0.5
      },
      activeCircle : {
        width: scale(10),
        height: scale(6),
        borderRadius: moderateScale(3),
        margin: scale(3),
        backgroundColor: "darkgray",
        opacity : 1
      }
});




