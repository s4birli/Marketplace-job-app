import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    filterButtonView: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E8EEF1',
        borderRadius: 10,
        padding: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButtonTextStyle: {
        fontSize: 14,
        fontWeight: '700',
        paddingLeft: 10,
        color: '#748f9e'
    },
    filterItemViewStyle: {
        paddingHorizontal: 16,
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filterItemTextStyle : {
        marginLeft: 20, 
        fontSize: 12,
        fontWeight : 'bold' 
    },
    filterItemImageViewStyle: {
        height: 18,
        width: 18,
        borderRadius: 9,
        overflow: 'hidden',
    },
    filterItemRadioStyle : {
        height: 18,
        width: 18,
        borderRadius: 9,
        overflow: 'hidden',
    },
    filterItemImageStyle : {
        flex: 1, 
        height: null, 
        width: null 
    },
    dashStyle: {
        marginTop: 10,
        width: '100%',
        height: 1
    },
    loadercontainer: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    searchContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E8EEF1',
        borderRadius: 16,
        marginTop: 12
    },
    textContent: {
        marginTop: 5,
        justifyContent: "flex-end"
    },
    PickerContentStyle: {
        marginTop: 5,
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
        borderColor: '#DDE1EF',
        color : 'gray'
    },
    textInputStyles: {
        marginTop: 5,
        fontSize: 12,
        paddingLeft:20,
        paddingRight: 35,
        paddingVertical: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: '#DDE1EF',
        borderRadius: 4,
    },
    rowTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop : 5
    },
    onlineTalent: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineLogoContainer: {
        height: 18,
        width: 18,
        borderRadius: 9,
        overflow: 'hidden',
    },
    onlineLogo: {
        flex: 1,
        height: null,
        width: null,
    },
    onlineText: {
        fontSize: 12,
        color: '#43CEAF',
        marginLeft: 10,
    },
    filterContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 6,
        backgroundColor: '#10A2EF',
        paddingVertical: 10,
    },
    filterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    textClose: {
        position:'absolute', 
        justifyContent:'center', 
        right: 15, 
        top: 0, 
        bottom: 0
    },
    categoryClose: {
        position:'absolute', 
        justifyContent:'center', 
        right: 35, 
        top: 0, 
        bottom: 0
    }
});