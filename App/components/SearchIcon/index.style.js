import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    inputView:{
        marginHorizontal: 30,
        borderRadius: 25,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color:'black',
        backgroundColor:'white',
        paddingLeft: 25,
        paddingRight:7,
        paddingVertical:2,
    }

});