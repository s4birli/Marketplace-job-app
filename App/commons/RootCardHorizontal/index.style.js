import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
      headerViewStyle : { 
        flexDirection: 'column' , 
        padding : 10 ,
        justifyContent : 'center',
        width : width / 3,
        marginVertical : 20,
        marginHorizontal : 10
      },
      headerImageStyle :{ 
        height: 70, 
        width: 100, 
        borderRadius: 15 
      },
      headerTitleStyle : { 
        flex: 1, 
        flexWrap: 'wrap' , 
        color : '#748f9e' , 
        fontSize : 14 ,
        marginLeft : 3
      },
});