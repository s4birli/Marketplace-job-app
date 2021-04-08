import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
      },
      titleText:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
        paddingLeft:10,
        paddingTop:10
      },
      button: {
        padding: 15,
        backgroundColor: '#10A2EF',
        borderRadius: 50,
        width: '70%',
        alignSelf: 'center',
        marginVertical: 10,
      },
      buttonText: {
        textAlign: 'center',
        color: '#fff',
      },
      input: {
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#E0E6EE',
        borderRadius: 4,
      },
      button_wrapper: {
        padding: 8,
        borderRadius: 8,
        flex:1,
        alignSelf: 'center',
        marginHorizontal:10
      },
      button_text: {
        color: '#fff',
        textAlign: 'center',
      },
      textContent: {
        marginTop: 10,
        justifyContent: "flex-end"
      },
      textStyle: {
    
      },
      PickerContentStyle: {
        marginTop: 10,
        // width: SCREEN_WIDTH * 0.8,
        backgroundColor: "white",
        borderWidth: 0.25,
        // borderColor: Colors.extraLightBorder,
        borderRadius: 5
      },
      PickerStyle: {
        // height: SCREEN_HEIGHT * 0.07,
        width: "100%",
        // fontFamily: "AvertaBold"
      },
      rootTitleText:{
        display:'flex',
        flexDirection:'column',
        
      },
      buttonsContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        paddingHorizontal:20,
        marginTop: 30,
      },
      errorContainer:{
        display:'flex',
        flexDirection:'row',
        textAlign:'center',
        padding:10,
        backgroundColor:'red',
        borderRadius:3,
        marginVertical:5
      },
      error:{
        color:'white',
      }
});