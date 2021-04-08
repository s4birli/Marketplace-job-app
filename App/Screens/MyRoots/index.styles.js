import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../../commons/responsive_design';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        padding: 20,
    },
    header_container : {
        width: Dimensions.get('window').width / 1.15,
        borderWidth: 1,
        borderColor: '#748F9E',
        borderRadius: 20,
        paddingVertical : 10 ,
        marginBottom : 10
    },
    header_item :{
        display : 'flex',
        flexDirection : 'row',
        paddingHorizontal : 20,
        paddingVertical : 5
    },
    header_text_left : {
        fontWeight : 'bold',
        fontSize : 15,
        color : '#748f9e',
        flex : 2
    },
    header_text_right : {
        fontWeight : '700',
        fontSize : 15,
        color : '#10a2ef',
        paddingLeft : 5,
        flex : 1
    },
    addButtonViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-end',
        paddingRight : widthPercentageToDP(8),
        marginBottom : 10
    },
    addButton : {
        borderRadius : 5,
        width : width / 3,
        height : heightPercentageToDP(4),
        color : '#10A2EF',
        justifyContent : 'center',
        textAlign : 'center',
    },
    addButtonTextStyle : {
        color : 'white'
    },
    image_wrapper: {
        backgroundColor: 'cyan',
        height: 50,
        width: 50,
        borderRadius: 35,
    },
    titleStyle : {
        fontWeight : 'bold',
        paddingLeft : 7,
        color : '#333'
    },
    avatarContainer: {
        overflow: 'hidden',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginVertical : 10,
        marginHorizontal : 13
    },
    roots_individual_wrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    line : {
        borderWidth : 0.5,
        borderColor : '#dee2e6',
    },
    itemContainer : {
        marginVertical : 10,
        marginHorizontal : 20
    },




    graph_wrapper: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: '#EDF1F4',
    },
    clicks_text_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clicks_view_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    click_views_text: {
        padding: 10,
        color: '#748F9E',
    },
    click_views_text_number: {
        color: '#10A2EF',
    },
    dashed_separator: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderColor: '#B2B9D1',
        marginVertical: 5,
    },
    dropdown_selector_wrapper: {
        padding: 5,
        alignItems: 'flex-end',
    },
    dropdown_selector: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 15,
        borderColor: '#E6E6FF',
    },
    selector_text: {
        color: '#748F9E',
    },
    chart_wrapper: {
        flex: 1,
        height: 300,
        marginVertical: 15,
        borderRadius: 15
    },
    picker_wrapper: {
        borderWidth: 1,
        borderColor: '#748F9E',
        borderRadius: 50,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        alignContent : 'center'
    },
    pickerStyle : {
      width : widthPercentageToDP(80),
      marginLeft : 20
    },
    button: {
        padding: 10,
        borderRadius: 35,
        width: '70%',
        marginVertical: 10,
    },
    button_text: {
        textAlign: 'center',
    },
   
    roots_wrapper: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: '#EDF1F4',
    },
    root_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 15,
    },
    descriptionStyle : {
        color : 'gray'
    },
    fileViewStyle : { 
        display : 'flex' , 
        flexDirection : 'row' , 
        paddingVertical : 10 ,
        alignContent : 'center'
    },
    fileNameStyle : {
        fontWeight : 'bold',
        fontSize : 14,
        color : 'gray',
        paddingLeft : 15 ,
    },
    tableItemView : {
        display : 'flex',
        flexDirection : 'row',
    },
    tableItemTitel : {
        fontWeight : '700',
        fontSize : 15,
        color : '#748f9e'
    },
    tableItemData : {
        fontWeight : '500',
        fontSize : 15,
        color : '#748f9e',
        paddingLeft : 5
    },
    roots_separator: {
        borderColor: '#DDD',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 1,
        position: 'relative',
    },
    requestBottomViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        alignContent : 'center',
        paddingVertical : 8
    },
    requestBottomButtonStyle : {
        flex : 1 , 
        textAlign : 'center',
        color : 'gray'
    },
  
   
});