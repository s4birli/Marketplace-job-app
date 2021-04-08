import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  Image,
  Picker,
  Alert,
  Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { editprofilerequest } from '../actions/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TagInput from 'react-native-tags-input'
import config from '../../../config';
import {
  edit_profile
} from '../../../services/profile'
import {
  profilerequest
} from '../actions/actions'
const Imageoptions = {
  title: 'Select photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
  mediaType: 'photo',
};
class Account extends Component {
  constructor(props) {
    super(props);
    const profileData = this.props.profileData ? this.props.profileData : {};
    (this.state = {
      username: this.props.profileData.name ? this.props.profileData.name : '',
      firstname: this.props.profileData.first_name ? this.props.profileData.first_name : '',
      lastname: this.props.profileData.last_name ? this.props.profileData.last_name : '',
      country: this.props.profileData.country ? this.props.profileData.country : '',
      timezone: this.props.profileData.timezone ? this.props.profileData.timezone : '',
      preferredLang: this.props.profileData.preffered_language ? this.props.profileData.preffered_language : '',
      additionalLang: this.props.profileData.additional_language ? this.props.profileData.additional_language : '',
      email: this.props.profileData.email ? this.props.profileData.email : '',
      phone: this.props.profileData.phone ? this.props.profileData.phone : '',
      profileDesc: this.props.profileData.description ? this.props.profileData.description : '',
      profileImage: this.props.profileData.profile ? this.props.profileData.profile : '',
      additionalLanguageId: '',
      prefferedLanguageId: '',
      countryList: [],
      LanguageList: [],
      timezoneList: [],
      skills: this.props.profileData.skills ? this.props.profileData.skills[0] : '',
      type: this.props.type,
      textLength: this.props.profileData.description ? this.props.profileData.description.length:'',
      tags: {
        tag: '',
        tagsArray: this.props.profileData.skills? this.props.profileData.skills: []
      },
      tagsColor: '#3ca897',
      tagsText: '#fff',
    }),
    this.getCountry();
    this.getLanguage();
    this.getTimezone();
  }
  changeHandler = (key, value) => {
    if ([key] == 'skills'){
      this.setState({skills: this.props.profileData.skills[0]+value})
    }
    this.setState({
      [key]: value,
    });
  };
  changeSkill = (text) => {

  }
  handleCountry = (key, value) => {
    this.setState({
      [key]: value,
    });
    let label = this.state.countryList.find(cat => cat.cnt_code == value);
    console.log("====>>>>", label)
    this.setState({
      country: label.cnt_code,
    });
  };
  handleType = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  handleLanguage = (key, value) => {
    this.setState({
      [key]: value,
    });
    let label = this.state.LanguageList.find(cat => cat.name == value);
    console.log(">>>>", label)
    this.setState({
      preferredLang: label.name,
      prefferedLanguageId: label.id
    });
  };

  handleAdditionalLanguage = (key, value) => {
    this.setState({
      [key]: value,
    });
    let label = this.state.LanguageList.find(cat => cat.name == value);
    this.setState({
      additionalLang: label.name,
      additionalLanguageId: label.id
    });
  }

  handleTimezone = (key, value) => {
    this.setState({
      [key]: value,
    });
    let label = this.state.timezoneList.find(cat => cat.name == value);
    this.setState({
      timezone: label.name,
    });
  };
  onSubmit = async () => {

    if(this.props.type == 0){
      if(!this.state.firstname){
        Alert.alert("Please enter first name")
      }else if(!this.state.lastname){
        Alert.alert("Please enter last name")
      }else if(!this.state.country){
        Alert.alert("Please enter Country")
      }else if(!this.state.timezone){
        Alert.alert("Please enter timezone")
      }else if(!this.state.email){
        Alert.alert("Please enter email")
      }else if(!this.state.profileDesc){
        Alert.alert("Please enter profile description")
      }else if(this.state.profileDesc.length < 50){
        Alert.alert("profile description must be more than 50 characters")
      }else{
        console.log('test update state profile', this.state);
        const requestData = this.state;
        requestData.token = this.props.token;
        const response = await edit_profile(this.state, this.props.token)
        if (response.status === 1) {
          this.props.callProfileRequest(this.props.token, this.props.userId)
        }
      }

      if(this.props.type == 1){
        console.log('test update state profile', this.state);
        const requestData = this.state;
        requestData.token = this.props.token;
        const response = await edit_profile(this.state, this.props.token)
        if (response.status === 1) {
          this.props.callProfileRequest(this.props.token, this.props.userId)
        }
      }
    }



  };
  getCountry = async () => {
    const response = await fetch(config.country, {
      method: 'POST',
      headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        'Content-Type': 'application/json',
        'auth-token': this.props.token,
      },
      body: JSON.stringify({
        category_id: this.c_id,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.status == 1) {
          this.setState({
            countryList: json.data,
          });
        }
        // console.log("testing of advanced searcg response",json)
        // return json;
      });
  };
  getTimezone = async () => {
    const response = await fetch(config.timezone, {
      method: 'POST',
      headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        'Content-Type': 'application/json',
        'auth-token': this.props.token,
      },
      body: JSON.stringify({
        // category_id: this.c_id,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.status == 1) {
          console.log("timezonelist=======",json.data)
          this.setState({
            timezoneList: json.data,
          });
        }
        // console.log("testing of advanced searcg response",json)
        // return json;
      });
  };
  getLanguage = async () => {
    const response = await fetch(config.language, {
      method: 'POST',
      headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        'Content-Type': 'application/json',
        'auth-token': this.props.token,
      },
      body: JSON.stringify({
        // category_id: this.c_id,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('preffered language', json);
        if (json.status == 1) {
          this.setState({
            LanguageList: json.data,
          });
        }
        // console.log("testing of advanced searcg response",json)
        // return json;
      });
  };

  selectimage = () => {
    ImagePicker.showImagePicker(Imageoptions, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const thumbnailName = { uri: response.fileName };

        this.setState({
          profileImage: 'file://'+response.path,
        });
      }
    });
  };

  render() {
    let skill = ''
    this.props.profileData.skills.map((item) => {
      skill = skill.concat(item);
    })
    console.log("taggggggggggggg",this.state.tags.tagsArray)
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.profileImage}>
            {this.state.profileImage ? (
              <Image
                resizeMode={'cover'}
                style={{ height: null, width: null, flex: 1 }}
                source={{ uri: this.state.profileImage }}
              />
            ) : (
                <Image
                  resizeMode={'cover'}
                  style={{ height: null, width: null, flex: 1 }}
                  source={{ uri: this.props.profileData.profile }}
                />
              )}
          </View>
          <TouchableOpacity
            onPress={() => this.selectimage()}
            style={styles.change_profile_text_wrapper}>
            <Text style={styles.change_profile_text}>CHANGE PROFILE IMAGE</Text>
          </TouchableOpacity>
        </View>
        {this.props.type == 1 ? 
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={this.state.type}
              onValueChange={text => {
                this.handleType('type', text);
              }}>
              <Picker.Item label="Seller" value={0} />
              <Picker.Item label="Buyer" value={1} />
            </Picker>
          </View>
        : null}
        {this.props.type == 0 ?
        <TextInput
          onChangeText={text => this.changeHandler('username', text)}
          value={this.state.username}
          editable={this.props.profileData.name ? false : true}
          placeholder="User Name"
          style={styles.input}
        /> : null}
        <TextInput
          onChangeText={text => this.changeHandler('firstname', text)}
          value={this.state.firstname}
          placeholder="First Name"
          style={styles.input}
          editable={this.props.profileData.first_name ? false : true}
          selectTextOnFocus={this.props.profileData.first_name ? false : true}
        />
        <TextInput
          onChangeText={text => this.changeHandler('lastname', text)}
          value={this.state.lastname}
          placeholder="Last Name"
          style={styles.input}
          editable={this.props.profileData.last_name ? false : true}
          selectTextOnFocus={this.props.profileData.last_name ? false : true}
        />
        
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              enabled={this.props.profileData.country ? false : true}
              selectedValue={this.state.country}
              onValueChange={text => {
                this.handleCountry('country', text);
              }}>
                {this.props.profileData.country !== null?
                  <Picker.Item key={this.props.profileData.country} label={this.props.profileData.country} />
                  :
                  this.state.countryList.length > 0 &&
                    this.state.countryList.map((item, index) => (
                      <Picker.Item key={index} label={item.cnt_name} value={item.cnt_code} />
                  ))
                }
            </Picker>
          </View>
        </View>
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              enabled={this.props.profileData.timezone ? false : true}
              style={styles.PickerStyle}
              selectedValue={this.state.timezone}
              onValueChange={text => {
                this.handleTimezone('timezone', text);
              }}>
                {this.props.profileData.timezone !== null?
                  <Picker.Item key={this.props.profileData.timezone} label={this.props.profileData.timezone}/>
                  :
                  this.state.timezoneList &&
                    this.state.timezoneList.map((item, index) => (
                      <Picker.Item key={index} label={item.name} value={item.name} />
                    ))
                }

            </Picker>
          </View>
        </View>
  
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={this.state.preferredLang}
              placeholder="Preffered Language"
              onValueChange={text => {
                this.handleLanguage('preferredLang', text);
              }}>
              {this.state.LanguageList &&
                this.state.LanguageList.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))}
            </Picker>
          </View>
        </View>
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={this.state.additionalLang}
              placeholder="Additional Language"
              onValueChange={text => {
                this.handleAdditionalLanguage('additionalLang', text);
              }}>
              {this.state.LanguageList &&
                this.state.LanguageList.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))}
            </Picker>
          </View>
        </View>
        <TextInput
          onChangeText={text => this.changeHandler('email', text)}
          value={this.state.email}
          placeholder="Email"
          style={styles.input}
          editable={this.props.profileData.email ? false : true}
          selectTextOnFocus={this.props.profileData.email ? false : true}
        />
        <TextInput
          onChangeText={text => this.changeHandler('phone', text)}
          value={this.state.phone}
          placeholder="Phone Number"
          style={styles.input}
        />
        {this.props.type == 0 ?
        <ScrollView style={styles.inputdesc}>
          <TextInput
            onChangeText={text => {this.changeHandler('profileDesc', text), this.setState({textLength:text.length})}}
            value={this.state.profileDesc}
            placeholder="Profile Description"
            maxLength={2500}
            multiline={true}
            // style={styles.input}
          /> 
        </ScrollView>: <></>}
      <View style={{marginLeft:3}}>
        <Text>{this.state.textLength} / 2500 Characters</Text>
      </View>
       {this.props.type == 0 ? 
        <TagInput
          updateState={(state) => this.setState({tags:state})}
          tags={this.state.tags}
          placeholder="Skills: Separate by space"
          labelStyle={{color: '#fff', fontSize:12}}
          containerStyle={{paddingHorizontal: 0}}
          inputStyle={[styles.textInput, {marginLeft: 0, marginRight:0, fontSize:14}]}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          // keysForTag={', '}
          />
        :
        <></>}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    userId: state.LoginUser.user_id,
    profileData: state.userProfile.profiledata,
    type: state.LoginUser.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callEditProfileRequest: (token, id) => {
      dispatch(editprofilerequest(token, id));
    },
    callProfileRequest: (token,id) => {
      dispatch(profilerequest(token,id));
    },
  };
};

const Accounting = connect(mapStateToProps, mapDispatchToProps)(Account);
export default Accounting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  change_profile_text_wrapper: {
    // padding: 10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'center',

  },
  change_profile_text: {
    textAlign: 'center',
    color: '#10A2EF',
  },
  input: {
    paddingLeft: 15,  
    borderWidth: 1,
    marginVertical: '2%',
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  inputdesc: {
    paddingHorizontal: 10,
    borderWidth: 1,
    marginVertical: '2%',
    borderColor: '#E0E6EE',
    borderRadius: 4,
    height: 200
  },
  buttonContainer: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#10A2EF',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  textContent: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  PickerContentStyle: {
    marginTop: 10,
    // width: SCREEN_WIDTH * 0.8,
    backgroundColor: 'white',
    borderWidth: 0.25,
    // borderColor: Colors.extraLightBorder,
    borderRadius: 5,
  },
  PickerStyle: {
    // height: SCREEN_HEIGHT * 0.07,
    width: '100%',
    // fontFamily: "AvertaBold"
  },
  textInput: {
    paddingLeft: 15,  
    borderWidth: 1,
    marginVertical: '2%',
    borderColor: '#E0E6EE',
    borderRadius: 4,
  },
  tag: {
      backgroundColor: '#fff'
    },
  tagText: {
      color: '#000',
    },
});
