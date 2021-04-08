import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 10,
        padding: 5
    },
    onlineOfflineViewStyle: {
        position: 'absolute',
        left: 5,
        top: 5,
        display: 'flex',
        flexDirection: 'row'
    },
    profileDetailsViewStyle: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    doshline: {
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        borderStyle: 'dotted'
    },
    progressViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    progressTitleStyle: {
        fontSize: 25
    },
    progressSubitleStyle: {
        fontSize: 14,
        paddingTop: 15,
        fontWeight: 'bold'
    },
    progressContainerStyle: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 25
    },
    tableContent: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    tableItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    tableItemTitle: {
        fontSize: 15,
        flex: 1
    },
    tableItemRightSide: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    },
    buttons: {
        borderRadius: 5,
        margin: 13,
        justifyContent: 'center',
        flexWrap: 'nowrap'
    },
    securityImageStyle: {
        width: width - width / 3.5,
        alignSelf: 'center',
    },
    tableItemRightText: {
        fontSize: 15,
        paddingLeft: 10
    },
    reviewSectionViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    reviewSectionHeaderViewStyle: {
        display: 'flex',
        flexDirection: 'column',
    },
    reviewSectionHeaderTitleViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        color: '#212529',
        fontWeight: '400',
        fontSize: 22
    },
    reviewSectionHeaderSubtitleViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 5
    },
    reviewSectionHeaderSubtitleTextStyle: {
        fontSize: 14,
        fontWeight: '500',
    },
    reviewMessagesViewStyle: {
        display: 'flex',
        padding: 10,
        flexDirection: 'column'
    },
    reviewMessageViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    profileImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 120 / 2,
    },
    profileDetailTextStyle: {
        fontSize: 13,
        fontWeight: '600',
    },
    profileDetailViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingTop: 10
    },
    reviewMessageTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'gray',
        paddingTop: 5
    },
    reviewMessageTimeStyle: {
        fontSize: 12,
        fontWeight: '300',
        color: 'lightgray',
        paddingTop: 5

    },
    otherRootsTitleStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    buttonsText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },

    packageCard: {
        width: width - 32,
        borderWidth: 1,
        borderColor: '#E8EEF1',
        borderRadius: 16,
        overflow: 'hidden',
    },
    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableTopic: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 20
    },
    tableTopicText: {
        paddingLeft: 20,
        fontSize: 12,
        color: '#748F9E'
    },
    tabledetail: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 20
    },
    tabledetailText: {
        textAlign: 'center',
        fontSize: 12
    },


    otherRootsImageViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    otherRootsImageStyle: {
        width: width - width / 3.5,
        height: height / 4,
        borderRadius: 5,
    },
    otherRootsCardTitleStyle: {
        fontSize: 13,
        color: 'gray',
        fontWeight: 'bold',
        padding: 10
    },
    otherRootsCardFooterStyle: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 5,
        color: 'lightgray',
        fontWeight: 'bold'
    },
    otherRootsProfileViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    otherRootsProfileLeftViewStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    otherRootsProfileLeftViewImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 120 / 2
    },
    otherRootsProfileLeftViewNameStyle: {
        fontWeight: '700',
        fontSize: 15,
        paddingLeft: 5
    },
    otherRootsProfileRightViewStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 10,
        justifyContent: 'center'
    },
    otherRootsProfileRightViewTitleStyle: {
        fontWeight: '600',
        fontSize: 14,
        color: 'gray'
    },
    otherRootsProfileRightViewSubtitleStyle: {
        fontWeight: '600',
        fontSize: 15,
        color: 'gray'
    },
    otherRootsCardStyle: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginVertical: 3,
        borderRadius: 10,
        padding: 10,
        width: width - width / 7
    },
    contactProfileImageStyle: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignSelf: 'center'
    },
    editButtonStyle: {
        borderRadius: 5,
        margin: 13,
        flex: 1,
        justifyContent: 'center'
    },
    profileNameStyle: {
        fontWeight: '700',
        fontSize: 15,
        paddingVertical: 5,
        textAlign: 'center'
    },
    companyNameStyle: {
        color: '#748f9e',
        fontSize: 15,
        textAlign: 'center',
        paddingVertical: 5
    },
    phpButton: {
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#10a2ef',
        width: 35, height: 25,
        borderRadius: 10
    },
    rTagsTestStyle: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 13
    },
    reportText: {
        color: 'red',
        fontSize: 12,
        fontWeight: '400',
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 10
    },
});