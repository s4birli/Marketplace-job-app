import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  feedImageContainer: {
    marginTop: 25,
    height: 200,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
  },
  headerViewStyle: {
    flexDirection: 'column',
  },
  headerImageStyle: {
    flex : 1,
    height : height / 4,
    borderTopLeftRadius : 15,
    borderTopRightRadius : 15,
  },
  headerTitleStyle: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#748f9e',
    fontSize: 14,
    fontWeight : '700',
    padding : 10 ,
  },
  cardView: {
    flexDirection: 'row',
    height: null,
    width: null,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    flexDirection: 'column',
  },
  feedImage: { flex: 1, height: null, width: null },
  feedName: {
    marginVertical: 20,
    fontSize: 12,
    color: '#748F9E',
    fontWeight: 'bold',
  },
  feedDetailsTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  feedDetailsTopLeft: { flexDirection: 'row', justifyContent: 'space-between' },
  feedDetailsTopRight: { flexDirection: 'row', alignItems: 'center' },
  feedAvatarContainer: {
    height: 32,
    width: 32,
    overflow: 'hidden',
    borderRadius: 16,
  },
  feedAvatar: { flex: 1, height: null, width: null },
  feedCategory: { fontSize: 10, fontWeight: 'bold', color: '#748F9E' },
  feedBadgeText: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2EC09C',
  },
  feedDetailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starRatingText: {
    marginLeft: 12,
    color: '#FCB059',
    fontSize: 13,
    paddingRight: 5
  },
  startingPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2EC09C'
  },
  doshline: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderStyle: 'dashed'
  },
  isOnline: {
    height: 10,
    width: 10,
    right: 0,
    position: 'absolute',
    backgroundColor: '#2EC09C',
    zIndex: 100,
    borderRadius: 100
  },
  isOffline: {
    height: 10,
    width: 10,
    right: 0,
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 1,
    borderRadius: 100
  }
});