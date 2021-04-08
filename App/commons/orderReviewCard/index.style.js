import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    reviewCard: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: '#E8EEF1',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    card: {
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 10,
        padding: 5
    }, 
    subreview: {
        marginVertical: 15
    },
    subreviewItem: {
        flexDirection: 'row',
        alignContent: "space-between",
        marginVertical: 10
    },
    subreviewTextStyle: {
        fontSize: 16, 
        fontWeight: '700', 
        flex:2
    },
    loadMoreBT: {
        width: 150,
        height: 40,
        backgroundColor: '#10a2ef',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5
    },
    loadMoreText:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    bigTextInput: {
        marginTop: 10, 
        height:150,
        marginHorizontal: 10, 
        borderWidth: 1, 
        borderRadius: 5, 
        padding: 5,
        borderColor: '#7F7F7F'
    },
    inputdesc: {
        paddingHorizontal: 10,
        borderWidth: 1,
        marginVertical: '2%',
        borderColor: '#E0E6EE',
        borderRadius: 4,
        height: 200
    },
});