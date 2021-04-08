import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  homeContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  redbarStyle: {
    backgroundColor: "#f8d7da", 
    padding: 7, 
    borderWidth: 1, 
    borderColor: '#f8d7da'
  },
  redbartextStyle: {
    textAlign: 'center',
    color: '#721c24'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBannerStyle: {
    height: 120,
    overflow: "hidden",
    borderRadius: 15,
    position: 'relative',
  },
  mainBannerImageStyle: {
    position: 'absolute',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    marginBottom: 25,
  },
  cardUpper: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEF1',
  },
  cardHeader: {
    fontSize: 16,
  },
  helloCardButton: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  helloCardButtonText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  popularCatogery: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#D5EBF6',
    marginVertical: 4,
    marginHorizontal: 6,
  },
  popularCatogeryText: { fontSize: 8, textAlign: 'center', color: '#10A2EF' },
  recentlyViewed: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  recentImageContainer: {
    height: 60,
    width: 86,
    borderRadius: 6,
    overflow: 'hidden',
  },
  recentImage: {
    flex: 1,
    height: null,
    width: null,
  },
  recentText: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
    color: '#748F9E',
    fontWeight: 'bold',
  },
  recentlyBoughtText: {
    fontSize: 12,
    flex: 1,
    flexShrink: 1,
    marginLeft: 10,
    color: '#748F9E',
    fontWeight: 'bold',
  },
  buyItAgain: {
    fontSize: 10,
    color: '#10A2EF',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  feedCard: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  feedImageContainer: {
    marginTop: 25,
    height: 200,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
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
  starRatingText: { marginLeft: 10, color: '#FCB059', fontSize: 10 },
  startingPrice: { fontSize: 12, fontWeight: 'bold', color: '#2EC09C' },
  feedListCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
  },
  feedListImageContainer: { height: 65, width: 90, overflow: 'hidden' },
  feedListImage: { flex: 1, height: null, width: null },
  feedListRight: {
    flex: 1,
    marginHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  feedListName: {
    fontSize: 12,
    color: '#748F9E',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  loadMoreContainer: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 40,
    borderRadius: 6,
    backgroundColor: '#10A2EF',
    paddingVertical: 10,
  },
  loadMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  cardHeaderTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',

  },
  cardHeaderSubtitle: {
    fontSize: 15,
    color: '#748f9e',
    paddingLeft: 5
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
  headerViewStyle: {
    flexDirection: 'row',
    padding: 10
  },
  doshline: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderStyle: 'dashed'
  },
});