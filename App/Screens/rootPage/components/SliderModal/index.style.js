import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../commons/responsive_design';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor : 'white',
        borderRadius : 10,
    },
    containerHeaderTextStyle : { 
        fontSize: 19,  
        fontWeight: '600', 
        padding : 20
    },
    line : {
        borderWidth : 0.5,
        borderColor : '#dee2e6',
    },
    titleText : { 
        fontSize: 14,
        paddingLeft : 20, 
        fontWeight: '600', 
        fontFamily : 'roboto',
    },
    bold : {
        fontWeight : '700'
    },
    padding : {
        paddingTop : 20
    },
    textInputLable : { 
        fontSize: 15, 
        fontWeight: '600', 
        paddingLeft : 20 ,
        paddingBottom : 10
    },
    descriptionTextInput : {
        paddingHorizontal : 20,
        paddingTop : 5,
        marginHorizontal : 20,
        marginBottom : 20,
        borderRadius : 5 ,
        borderWidth : 1,
        borderColor : '#dee2e6',
        overflow: 'hidden'
    },
    buttonViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-end',
        paddingRight : widthPercentageToDP(4),
        margin : 10
    },
   confirmButton : {
        borderRadius : 5,
        width : width / 5,
        height : heightPercentageToDP(4),
        justifyContent : 'center',
        textAlign : 'center',
        padding : 15,
        marginLeft: 5
    },
    buttonTextStyle : {
        color: 'white',
        fontSize : 11
    },
});