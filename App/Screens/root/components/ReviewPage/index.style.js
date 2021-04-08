import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius:20,
    borderColor:'#f1f1f1',
    padding:20,
  },
  banner_wrapper: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  about_root_wrapper: {
    paddingVertical: 10,
  },
  about_root_text_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dotted_underline: {
    borderWidth: 1,
    borderStyle: 'dashed',
    marginVertical: 2,
    borderRadius: 0.2,
    borderColor: '#C7D8E2',
  },
  description_wrapper: {
    paddingVertical: 10,
  },
  description_title: {
    paddingVertical: 5,
  },
  description_body: {
    fontSize: 14,
    color: '#748F9E',
  },
  button_wrapper: {
    padding: 8,
    borderRadius: 8,
    flex:1,
    alignSelf: 'center',
    marginHorizontal:10
  },
  back_button: {
    padding: 15,
    backgroundColor: '#748F9E',
    width: '40%',
    borderRadius: 15,
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize:12
  },
  post_button: {
    padding: 15,
    backgroundColor: '#10A2EF',
    width: '100%',
    borderRadius: 15,
  },
  privacy_text_wrapper: {
    padding: 20,
  },
  privacy_text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#748F9E',
  },
  buttonsContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    paddingHorizontal:20,
    marginTop: 30,
  }
});