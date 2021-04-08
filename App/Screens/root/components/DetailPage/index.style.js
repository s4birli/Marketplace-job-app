import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP } from '../../../../commons/responsive_design';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius:20,
    borderColor:'#f1f1f1',
    padding:20,
    borderWidth:1,
    borderColor:'#DDD'
  },
  input: {
    height: 150,
    textAlignVertical: 'top',
    paddingLeft: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  inputSmall: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  inputDash: {
    height: 150,
    textAlignVertical: 'center',
    textAlign: 'center',
    // paddingLeft: 10,
    borderWidth: 1,
    // marginVertical: 10,
    color: '#10A2EF',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#10A2EF',
    alignItems:'center',
    // justifyContent:'center'
  },
  imageView: {
    height: 150,
    // marginVertical: 10,
    width:'100%'
  },
  image:{
    height: 150,
    width:'100%'
  },
  button_wrapper: {
    marginTop: 6,
    backgroundColor: '#10A2EF',
    padding: 15,
    borderRadius: 8,
    width: '70%',
    alignSelf: 'center',
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize:12,
  },
  buttonsContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    paddingHorizontal:5,
    marginTop: 30,
  },
  button_wrapper: {
    padding: 3,
    borderRadius: 8,
    flex:1,
    alignSelf: 'center',
    marginHorizontal:5,
    paddingVertical:7
  },
  uploadText:{
    fontWeight:'bold',
    marginTop:10
  },
  addNewVideoText:{
    color:'blue',
    fontSize:14,
    paddingTop:4
  },
  rootDescription:{
    display:'flex',
    flexDirection:'column',
    
  },
  errorContainer:{
    display:'flex',
    flexDirection:'row',
    textAlign:'center',
    padding:10,
    backgroundColor:'red',
    borderRadius:3,
    marginVertical:5
  },
  error:{
    color:'white',
  },
  tagContainer:{
    // marginVertical:0,
    justifyContent:'center'
  },
  tag: {
    backgroundColor: '#fff'
  },
  tagText: {
    color: 'black'
  },
  wrapper : {
    justifyContent:'center'
  }
});