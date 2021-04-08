import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        display:'flex',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#f5c6cb',
        textAlign:'center',
        justifyContent:'center',
        padding:15,
        margin:5,
        backgroundColor:'#f8d7da'
    },
    titleText:{
        color:'#721c24',
        fontSize:13
    },
    link:{
        color:'blue',
        fontSize:13
    }
});