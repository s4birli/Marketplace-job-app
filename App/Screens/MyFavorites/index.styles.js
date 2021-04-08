import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        padding: 20,
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
    button_wrapper: {
        marginVertical: 10,
        alignItems: 'center',
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
        marginBottom: 10,
        borderColor: '#EDF1F4',
    },
    root_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 15,
    },
    roots_individual_wrapper: {
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'flex-start',
    },
    image_wrapper: {
        backgroundColor: 'cyan',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    titleStyle : {
        fontWeight : '600',
        color : 'blue',
        paddingVertical : 6
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
        fontWeight : '500',
        fontSize : 15,
        color : 'darkgray'
    },
    tableItemData : {
        fontWeight : '500',
        fontSize : 15,
        color : 'lightgray',
        paddingLeft : 5
    },
    roots_separator: {
        borderWidth: 1,
        marginVertical: 5,
        borderColor: '#E6E6FF',
        borderStyle: 'dashed'
    },
    requestBottomViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        alignContent : 'center'
    },
    requestBottomButtonStyle : {
        flex : 1 , 
        textAlign : 'center',
        color : 'gray'
    },
    editTextStyle : {
        borderRightColor : 'lightgray' , 
        borderRightWidth : 1
    },
    profileViewStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignContent : 'center',
        alignItems : 'center'
    },
    profileImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 120 / 2
    },
    profileameStyle: {
        fontWeight: '700',
        fontSize: 15,
        paddingLeft: 5 ,
        color : 'gray'
    },
    buttonsText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        color : 'white'
    },
    buttons: {
        borderRadius: 5,
        margin: 17,
        justifyContent: 'center',
        flexWrap: 'nowrap',
        color: 'blue',
    },
    profileViewStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignContent : 'center',
        alignItems : 'center'
    },
    profileImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 120 / 2
    },
    profilenameStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingLeft: 5 ,
        color : 'gray'
    },
    tableItemView : {
        display : 'flex',
        flexDirection : 'row',
    },
    tableItemTitel : {
        fontWeight : 'bold',
        fontSize : 15,
        color : 'darkgray'
    },
    tableItemData : {
        fontWeight : '500',
        fontSize : 15,
        color : 'lightgray',
        paddingLeft : 5
    },
    roots_separator: {
        borderWidth: 1,
        marginVertical: 5,
        borderColor: '#E6E6FF',
    },
    requestBottomViewStyle : {
        display : 'flex',
        flexDirection : 'row',
        alignContent : 'center'
    },
    requestBottomButtonStyle : {
        flex : 1 , 
        textAlign : 'center',
        color : '#748f9e'
    },
});