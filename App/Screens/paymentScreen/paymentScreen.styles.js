import { StyleSheet, Dimensions } from 'react-native';
const {width,height} = Dimensions.get('window');

export default StyleSheet.create({
    cardStyle : {
        backgroundColor: 'white', 
        borderRadius: 10, 
        width : width - width / 20,
        marginTop : 10,
        marginHorizontal :( width - (width - width / 20) ) / 2,
        borderWidth:1,
        borderColor:'#DDD'
    },
    doshline: { 
        height: 1, 
        width: '100%', 
        borderRadius: 1, 
        borderWidth: 1, 
        borderColor: '#e7e7e7', 
        borderStyle: 'dotted' 
    },
    ImageViewStyle : {
        display: 'flex', 
        flexDirection: 'row', 
        alignContent: 'center', 
        alignItems: 'center', 
        padding: 5,
    },
    ImageStyle : { 
        width : width - width / 7,
        height : height / 6,
        borderRadius: 5 
    }, 
    CardTitleStyle : {
        fontSize : 18,
        color : '#748f9e',
        paddingLeft : 15,
    },
    PriceStyle : {
        fontSize : 18,
        color : '#2ec09c',
        fontWeight : 'bold',
        textAlign:'right',
        paddingRight:15
    },
    profileViewStyle : {
        flexDirection : 'row',
        justifyContent : 'center'
    },
    profileLeftViewStyle : {
        flex : 1 ,
        flexDirection : 'row',
        padding : 8 ,
        alignItems : 'center'
    },
    profileLeftViewImageStyle : {
        width: 40, 
        height: 40, 
        borderRadius: 80 / 2 
    },
    profileLeftViewNameStyle : {
        fontWeight: '700', 
        fontSize: 15 ,
        paddingLeft : 5,
        color : '#748f9e'
    },
    orderIdTextStyle : {
        fontWeight: '700', 
        fontSize: 14 ,
        paddingLeft : 5,
        paddingBottom:5,
        color : '#748f9e'
    },
    tableItem : { 
        display : 'flex' ,  
        flexDirection :'row' ,
        justifyContent : 'space-between',
        paddingVertical : 10,
        paddingHorizontal : 10
    },
    tableItemTitle   : {
        fontSize:14 , 
        flex : 1,
    },
    tableItemRightSide : { 
        flex : 1 ,
        flexDirection : 'row' ,
        alignContent : 'flex-end' , 
        justifyContent : 'flex-end'
    },
    tableItemRightText : { 
        fontSize : 15 , 
        paddingLeft : 10 ,
        color : 'black',
    },
    couponViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        marginTop : 10,
    },
    couponTextInputStyle : { 
        height: 40, 
        borderColor: 'lightgray', 
        borderWidth: 1,
        flex : 3 ,
        borderRadius: 5, 
        marginHorizontal: 13, 
        paddingLeft : 10,
        alignSelf : 'center'
    },
    button : {
        flex : 2,
        height: 40,
        borderRadius: 5, 
        marginRight: 10,
        paddingHorizontal:10,
        backgroundColor: '#10a2ef', 
        justifyContent: 'center'
    },
    buttonText: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#FFFFFF', 
        fontWeight: '700',
        fontSize : 12,
    },
    paymentsButton : {
        borderRadius: 5, 
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    securityImageStyle : { 
        // width : width - width / 4 , 
        width: 50,
        alignSelf : 'center',
        height: 50
    },
    cardView: {
        width: Dimensions.get('window').width / 1.1,
        borderColor: '#ebedf2',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalText:{
        fontSize : 20,
        color : '#2ec09c',
        fontWeight : '700',
        textAlign:'right',
    },
    textClose : {
        justifyContent:'center',
        marginLeft: 3
    }
});