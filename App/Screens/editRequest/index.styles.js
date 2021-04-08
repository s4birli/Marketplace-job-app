import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        padding: 20,
    },
    editPageTitleView : {
        display : 'flex'
    },
    eidtPageTitleTextStyle : {
        fontSize : 16 ,
        fontWeight : "bold"
    },
    input: {
        paddingLeft: 10,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: '#E0E6EE',
        borderRadius: 4,
    },
    button_wrapper: {
        marginVertical : 15 ,
        backgroundColor: '#10A2EF',
        padding: 15,
        borderRadius: 8,
        width: '70%',
        alignSelf: 'center',
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
        borderRadius: 5,
    },
    PickerStyle: {
        // height: SCREEN_HEIGHT * 0.07,
        width: "100%",
        // fontFamily: "AvertaBold",
        color:'#212529'
    },
    dateInput: {
        borderWidth: 0,
        height: 50,
    },
    dateText: {
        marginTop: 5,
        color: 'black',
        fontSize: 15,
        right: 30,
    },
    placeholderText: {
        marginTop: 5,
        color: '#212529',
        fontSize: 15,
        textAlign:'center'
    },
    datePickerStyle : {
         height: 50, 
         width: 170, 
         borderRadius: 4, 
    } ,
    uploadViewStyle : {
        display : 'flex' , 
        flexDirection : 'row' ,
        paddingVertical : 7
    } ,
    uploadTextStyle : {
        fontSize : 13 ,
        color : '#748f9e' ,
        paddingLeft : 10
    } ,
    fileNameTextStyle : {
        fontSize : 12 ,
        color : 'red' ,
    } ,
    trashIconStyle : {
        paddingLeft : 10
    }, 
    descriptionTextInput : {
        flex : 1,
        paddingLeft: 10,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: '#E0E6EE',
        borderRadius: 4,
        textAlignVertical: "top",
        height : 150,
        color:'#212529'
    }
});