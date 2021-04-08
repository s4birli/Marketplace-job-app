import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    rightDrawerTitleViewStyle :{
        paddingVertical: 20,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
    },
    rightDrawerTitleTextStyle : {
        fontFamily : '"roboto","Open Sans",sans-serif',
        fontSize: 17 , 
        color : '#212529', 
        textAlign: 'center',
        fontWeight : '700'
    },
    categoriesListViewStyle : {
        paddingVertical: 16, 
        paddingHorizontal: 5
    },
    listItemViewStyle : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        display : 'flex',
        justifyContent : 'space-between'
    },
    listItemTextStyle :{
        fontSize: 14,
        fontWeight: '700',
        color: '#212529',
        marginLeft: 20,
    } ,
    downArrowStyle : {
        paddingRight : 20
    },
    subItemViewStyle : {
        padding : 12,
        borderBottomColor : '#eee',
        borderBottomWidth : 1,
        borderStyle : 'solid',
        marginHorizontal : '2%',
    },
    subItemTextStyle : {
        fontSize : 13,
        fontWeight: '700',
        color: '#212529',
        marginLeft: 13,
       
    }

});