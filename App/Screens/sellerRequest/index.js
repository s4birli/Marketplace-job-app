import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  Picker,
  TouchableOpacity,
  DatePickerAndroid,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import * as RNLocalize from "react-native-localize";
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import config from '../../config'

class SellerRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      deadline: '',
      delivery: null,
      budgetFrom: null,
      budgetTo: null,
      description: '',
      selected_category:'',
      selected_sub_category:'',
      date: new Date(),
      inDate: new Date(),
      expireDate: 'Pick deadline date',
      c_id:'',
      sc_id:'',
      spin: false
    };
  }

  showDatePicker = async options => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day);
        let newState = {};
        newState['inDate'] = new Date(year, month, day + 1);
        newState['expireDate'] = moment(date).format('MM/DD/YYYY');
        this.setState(newState);
        console.log('new state', newState);
        console.log("select date")
      }
    } catch ({code, message}) {
      console.warn(`error `, code, message);
    }
  };

  componentDidMount = () => {
    this.props.getCategory(RNLocalize.getTimeZone(),this.props.login.userToken)
  }

  changeHandler = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleCategory = (key, value) => {
    const {review} = this.props;
    this.setState({
      [key]: value,
    });
    let label = review.category.find(cat => cat.c_id == value);
    this.setState({
      selected_category: label.c_title,
      c_id: label.c_id
    });
    this.props.getSubCategory(
      value,
      RNLocalize.getTimeZone(),
      this.props.login.userToken,
    );
  };
  handleSubCategory = (key, value) => {
    const {review} = this.props;
    this.setState({
      [key]: value,
    });
    let label = review.subCategory.find(cat => cat.c_id == value);
    this.setState({
      selected_sub_category: label.c_title,
      sc_id: label.c_id
    });
  };

  onSubmit = async () => {
    this.setState({spin: true})
    let response = await fetch(config.request, {
        method: 'POST',
        headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          'Content-Type': 'application/json',
          'auth-token': this.props.login.userToken,
        },
        body: JSON.stringify({
         category: this.state.c_id,
         sub_category:this.state.sc_id,
         delivery: this.state.delivery,
         expires: this.state.expireDate,
         description: this.state.description,
         budget_from: this.state.budgetFrom,
         budget_to: this.state.budgetTo,
         request_id: ''
        }),
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("My request",json)
        return json;
      });

      if(response.status == 1){
        this.setState({spin: false})
        ToastAndroid.showWithGravityAndOffset(
          response.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        this.props.navigation.navigate('Home')
      } else {
        this.setState({spin: false})
        ToastAndroid.showWithGravityAndOffset(
          response.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        
      }


  };
  render() {
    const {review} = this.props;
    console.log('seleeeeee', this.state)
    return (
      <DrawerWrapper {...this.props}>
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <TextInput
              onChangeText={text => this.changeHandler('title', text)}
              value={this.state.title}
              placeholder="Title"
              style={styles.input}
            />
           <View style={styles.textContent}>
            <Text style={styles.textStyle}>Category</Text>
            <View style={styles.PickerContentStyle}>
              <Picker
                style={styles.PickerStyle}
                 selectedValue={this.state.root_category}
                onValueChange={text => {
                 this.handleCategory("root_category",text)
                }}
              >
                <Picker.Item label="Please Select" value='' />
                {review.category && review.category.map((item, index) => (
                  <Picker.Item key={index} label={item.c_title} value={item.c_id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.textStyle}>Sub Category</Text>
            <View style={styles.PickerContentStyle}>
              <Picker
                style={styles.PickerStyle}
                 selectedValue={this.state.root_subCategory}
                onValueChange={text => {
                 this.handleSubCategory("root_subCategory",text)
                }}
              >
                {review.subCategory && review.subCategory.map((item, index) => (
                  <Picker.Item key={index} label={item.c_title} value={item.c_id} />
                ))}
              </Picker>
            </View>
          </View>
            <View style = {styles.DatePick}>
            <TouchableOpacity
              style={{marginLeft: 10, width: '100%'}}
              onPress={() =>
                this.showDatePicker({
                  date: this.state.date,
                })
              }>
              {/* <Text>Pick</Text> */}
              <Text>{this.state.expireDate}</Text>
            </TouchableOpacity>
            </View>
            
            <TextInput
              onChangeText={text => this.changeHandler('delivery', text)}
              value={this.state.delivery}
              placeholder="Delivery"
              style={styles.input}
            />
            <TextInput
              keyboardType = "number-pad"
              onChangeText={text => this.changeHandler('budgetFrom', text)}
              value={this.state.budgetFrom}
              placeholder="Budget From"
              style={styles.input}
            />
            <TextInput
              keyboardType = "number-pad"
              onChangeText={text => this.changeHandler('budgetTo', text)}
              value={this.state.budgetTo}
              placeholder="Budget To"
              style={styles.input}
            />
            <TextInput
              onChangeText={text => this.changeHandler('description', text)}
              value={this.state.description}
              placeholder="Description"
              multiline={true}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onSubmit()}>
              {this.state.spin ? <ActivityIndicator size = "small" color = "#FFF"/> : <Text style={styles.buttonText}>SEND REQUEST</Text> }
            </TouchableOpacity>
            <View style={{height: 80}} />
          </ScrollView>
        </View>
      </DrawerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header_wrapper: {
    padding: 20,
  },
  header_text: {
    textAlign: 'center',
    color: '#2EC09C',
    fontSize: 18,
  },
  input: {
    paddingLeft: 15,
    borderWidth: 1,
    marginVertical: '2%',
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },

  button: {
    padding: 15,
    backgroundColor: '#10A2EF',
    borderRadius: 50,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  textContent: {
    marginTop: 10,
    justifyContent: "flex-end"
  },
  textStyle: {
    
  },
  PickerContentStyle: {
    marginTop: 10,
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
  },
  DatePick: {
    borderWidth: 1,
    borderColor: '#E0E6EE',
    borderRadius: 4,
    borderRadius: 4,
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    login: state.LoginUser,
    review: state.addRoot,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategory: (tz, token) => {
      dispatch({type: 'CATEGORY_PICKER_REQUEST', tz, token});
    },
    getSubCategory: (id, tz, token) => {
      dispatch({type: 'SUB_CATEGORY_PICKER_REQUEST', id, tz, token});
    },
  };
};

const SellerRequestScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerRequest);

export default SellerRequestScreen;
