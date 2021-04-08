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
        fontWeight : '700',
        color : '#10a2ef',
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
        fontWeight : 'bold',
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
    confirm: {
        height: 35,
        width: 120,
        backgroundColor: '#2ec09c',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:'center',
        marginTop: 15,
        padding: 10,
        color: 'white'
    },
    cancel: {
        height: 35,
        width: 120,
        backgroundColor: '#10a2ef',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:'center',
        marginTop: 15,
        padding: 10,
        color: 'white'
    },
    modalItemStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        borderStyle: 'dashed'
    },
    paddingModal: {
        borderRadius: 5,
        borderColor: 'lightgrey',
        borderWidth: 1,
    },

    sendButton: {
        borderWidth: 1,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    modal: {
        backgroundColor: "white",
        padding: 10,
        borderWidth:1, 
        borderColor: '#7F7F7F', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14
    },
    secondModal: {
        backgroundColor: "white",
        padding: 10,
    },
    loadMoreBT: {
        width: 300,
        height: 40,
        backgroundColor: '#10a2ef',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5
    },
    loadMoreText:{
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    }
});