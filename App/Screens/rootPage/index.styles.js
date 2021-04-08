import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    tagContainer : {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex : 1,
        marginBottom: 10,
    },
    phpButton: {
        marginVertical: 10,
        marginHorizontal: 5,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#10a2ef',
        borderRadius: 5,
        padding: 5
    },
    rTagsTestStyle: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 10
    },
    reportText: {
        color: 'red',
        fontSize: 12,
        fontWeight: '400',
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 10,
        marginTop: 15,
        flex : 1
    },
    card: {
        backgroundColor: 'white',
        marginVertical: 15 ,
        marginHorizontal : 5,
        borderRadius: 10,
        padding: 7,
        borderWidth: 1,
        borderColor: '#e7e7e7',
    },
    doshline: {
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        borderStyle: 'dotted'
    },
    description: {
        color: '#212529',
        fontWeight: '400',
        fontSize: 20,
        flex : 2
    },
    buttonsText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    buttons: {
        borderRadius: 5,
        margin: 13,
        justifyContent: 'center',
        flexWrap: 'nowrap',
    },
    likeAndShareViewStyle : { 
        display : 'flex',
        flexDirection: 'row', 
        margin: 5 
    },
    iconContainerStyle : { 
        flex: 1 , 
        flexDirection: 'row' , 
    },
    iconViewStyle :{  
        padding : 5 , 
        borderWidth : 1 , 
        borderColor : 'lightgray' ,
        justifyContent : 'center',
        alignContent : 'center',
        borderRadius : 5,
        marginLeft : 5,
        backgroundColor:'white'
    } ,
    ratingViewStyle : { 
        flex: 1, 
        justifyContent : 'flex-end' , 
        flexDirection : 'row' 
    },
    ratingTextStyle : { 
        color : '#fcb059' , 
        fontSize : 16 , 
        fontWeight : 'bold'
    },
    rootTitleTextStyle :{ 
        color: "black", 
        fontWeight: '700', 
        fontSize: 22 
    },
    rootSubcategoryTextStyle : {
        color: '#10a2ef', 
        fontWeight: '700', 
        fontSize: 14 
    },
    reportThisViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        backgroundColor : 'blue'
    },
    descriptionTextInput : {
        flex : 1,
        paddingLeft: 10,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: '#E0E6EE',
        borderRadius: 4,
        textAlignVertical: "top",
        height : 200
    }
});