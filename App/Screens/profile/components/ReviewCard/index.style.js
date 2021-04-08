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
    },
    reviewCardUpper: {
        flexDirection: 'row',
        // alignItems: 'flex-start',
        marginBottom: 6,
    },
    reviewCardAvatarContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#2AABE4',
        overflow: 'hidden',
    },
    reviewCardAvatar: {
        height: null, 
        width: null, 
        flex: 1
    },
    reviewText: {
        color: '#748F9E', 
        fontSize: 12, 
        flexShrink: 1
    },
    card: {
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 10,
        padding: 5
    },   
    doshline: {
        height: 1,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#8D8A8A'
    },
    description: {
        color: '#212529',
        fontWeight: '700',
        fontSize: 20,
    },
    ratingTextStyle : { 
        color : '#fcb059' , 
        fontSize : 14 , 
        fontWeight : 'bold'
    },
    subreview: {
        paddingHorizontal: 10,
        marginVertical: 15
    },
    subreviewItem: {
        flexDirection: 'row',
        alignContent: "space-between",
        marginVertical: 5
    },
    subreviewTextStyle: {
        fontSize: 14, 
        fontWeight: '400', 
        flex:2
    },
    loadMoreBT: {
        width: 200,
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