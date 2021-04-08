import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { heightPercentageToDP, widthPercentageToDP, scale } from '../../../../commons/responsive_design';

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius:20,
    borderColor:'#f1f1f1',
    padding:20,
    borderWidth:1,
    borderColor:'#DDD'
  },
  fixedText:{
    fontWeight:'700',
    fontSize:13
  },
  extraText:{
    fontSize:14,
    fontWeight:'700'
  },
  price_wrapper: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    padding: 15,
  },
  input_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
    paddingLeft: 10,
  },
  extra_wrapper: {
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 20,
    marginVertical: 15,
  },
  fast_delivery_wrapper: {
    padding: 15,
    flexDirection: 'column',
  },
  fast_delivery_checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#10A2EF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  button_text: {
    textAlign: 'center',
    fontSize:12,
    color: '#ffffff',
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
  pickerViewStyle: {
    flex:1,
    color:'#212529',
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  pickerStyle: {
    fontSize:6
  },
  extraView:{
    display:'flex',
    flexDirection:'column'
  },
  addNewExtraText:{
    color:'blue',
    fontSize:14,
    paddingTop:4
  },
  flexibleView:{
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 5,
  },
  tableHeader:{
    display:'flex',
    flexDirection:'row',
  },
  tableHeaderItem:{
    borderColor:'#DDD',
    borderWidth:1,
    borderStyle:'dashed',
    borderRadius:1,
    width:widthPercentageToDP(70),
    height:heightPercentageToDP(7),
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  tableHeaderFirstColumnItem:{
    borderColor:'#DDD',
    borderWidth:1,
    borderStyle:'dashed',
    borderRadius:1,
    width:widthPercentageToDP(30),
    height:heightPercentageToDP(7),
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  tableFirstColumnItem:{
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderStyle: 'dashed',
    width:widthPercentageToDP(30),
    height:heightPercentageToDP(10),
    justifyContent:'center',
    alignContent:'center',
    alignItems:'flex-start',
    paddingLeft:10,
  },
  firstColumnText:{
    color:'#748f9e',
    fontSize:13
  },
  tableFirstColumn:{
    display:'flex',
    flexDirection:'column',
    width:widthPercentageToDP(30),
  },
  tableSecondColumn:{
    display:'flex',
    flexDirection:'column',
    width:widthPercentageToDP(70),
  },
  tableSecondColumnItem:{
    borderColor:'#DDD',
    borderWidth:1,
    borderStyle:'dashed',
    borderRadius:1,
    width:widthPercentageToDP(70),
    height:heightPercentageToDP(10),
    paddingHorizontal:scale(10)
  },
  tableFirstColumnDescriptionItem:{
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderStyle: 'dashed',
    width:widthPercentageToDP(30),
    height:heightPercentageToDP(20),
    justifyContent:'center',
    alignContent:'center',
    alignItems:'flex-start',
    paddingLeft:10,
  },
  tableDescriptionItem:{
    borderColor:'#DDD',
    borderWidth:1,
    borderStyle:'dashed',
    borderRadius:1,
    width:widthPercentageToDP(70),
    height:heightPercentageToDP(20),
    paddingHorizontal:scale(10)
  },
  headerText:{
    fontWeight:'bold',
    fontSize:14,
  },
  scrollIcon:{
    position:'absolute',
    right:10,
    top:17,
    zIndex:10
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
  }
});