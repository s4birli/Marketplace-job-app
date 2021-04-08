import React, { Fragment, useEffect, useState } from 'react';
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
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
  BackHandler,
  RefreshControl
} from 'react-native';
import styles from './index.styles';
import { connect } from "react-redux";
import DrawerWrapper from '../../commons/rightDrawerWrapper'
import * as RNLocalize from "react-native-localize";
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import Icon from "react-native-vector-icons/FontAwesome";
import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob'
import {
  edit_request,
  delte_request_file
} from '../../services/editRequest'
import * as types from '../root/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const days = [
  { id: 0, label: 'Days to deliver' },
  { id: 1, label: '1 Day' },
  { id: 2, label: '2 Days' },
  { id: 3, label: '3 Days' },
  { id: 4, label: '4 Days' },
  { id: 5, label: '5 Days' },
  { id: 6, label: '6 Days' },
  { id: 7, label: '7 Days' },
  { id: 8, label: '8 Days' },
  { id: 9, label: '9 Days' },
  { id: 10, label: '10 Days' },
  { id: 11, label: '11 Days' },
  { id: 12, label: '12 Days' },
  { id: 13, label: '13 Days' },
  { id: 14, label: '14 Days' },
  { id: 15, label: '15 Days' },
  { id: 16, label: '16 Days' },
  { id: 17, label: '17 Days' },
  { id: 18, label: '18 Days' },
  { id: 19, label: '19 Days' },
  { id: 20, label: '20 Days' },
  { id: 21, label: '21 Days' },
  { id: 22, label: '22 Days' },
  { id: 23, label: '23 Days' },
  { id: 24, label: '24 Days' },
  { id: 25, label: '25 Days' },
  { id: 26, label: '26 Days' },
  { id: 27, label: '27 Days' },
  { id: 28, label: '28 Days' },
  { id: 29, label: '29 Days' },
  { id: 30, label: '30 Days' },
]

const EditRequest = (props) => {

  const { token } = props;
  const [data, setData] = useState('');
  const [requestId, setRequestId] = useState('');
  const [description, setDescription] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [subCategoryLabel, setSubCategoryLabel] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [dayToDeliver, setDayToDeliver] = useState('');
  const [requestExpiresOn, setRequestExpiresOn] = useState('');//moment().format('DD/MM/YYYY')  
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [file, setFile] = useState('');
  const [show, setShow] = useState(false);
  const [press, setPress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lengthOfDescription, setLengthOfDescription] = useState(0)
  // console.log('categories =================',props.categories)
  useEffect(() => {
    if (props.categories.length > 0) {
      setCategories(props.categories)
    }
  }, [props.categories])

  useEffect(() => {
    if (props.navigation.getParam('requestData', '')) {
      setData(props.navigation.getParam('requestData', ''))
    }
  }, [props.navigation.getParam('requestData', '')])

  useEffect(() => {
    if (data) {
      setRequestId(data.request_id)
      setDescription(data.description);
      setCategoryLabel(data.category);
      setCategoryId(data.category_id);
      setSubCategoryLabel(data.subcategory);
      setSubCategoryId(data.subcategory_id);
      setDayToDeliver(data.delivery);
      setBudgetFrom(JSON.stringify(data.budget_from));
      setBudgetTo(JSON.stringify(data.budget_to));
      setFile(data.files)
      setRequestExpiresOn(moment(parseInt(data.expire)).format('DD-MM-YYYY'));
      console.log('data is ', data)
    }
  }, [data])

  useEffect(() => {
    if (categoryId) {
      let label = categories.find(cat => cat.c_id === categoryId);
      setSubCategories(label.sub_categories);
    }
  }, [categoryId])


  const handleSubmit = async () => {

    if (description.length < 50) {
      Alert.alert("Description must be at least 50 characters or more.")
    } else if (budgetFrom < 5) {
      Alert.alert("Budget must be more than or equal to $5")
    } else if (dayToDeliver) {
      Alert.alert("Please select days to deliever")
    } else if (!requestExpiresOn) {
      Alert.alert("Request expires on can't be blank")
    } else {
      const DATE = moment(requestExpiresOn, 'DD/MM/YYYY').format('X')

      const formData = new FormData();
      formData.append('description', description);
      formData.append('category', categoryId);
      formData.append('sub_category', subCategoryId);
      formData.append('delivery', dayToDeliver);
      formData.append('expires', DATE);
      formData.append('budget_from', budgetFrom);
      formData.append('budget_to', budgetTo);
      formData.append('attachment', file);

      if (props.navigation.state.routeName === 'EditRequest') {
        formData.append('request_id', requestId);
      }

      console.log('data', formData)
      setIsLoading(true)
      const response = await edit_request(token, formData)
      setIsLoading(false)
      if (response.status === 1) {
        Alert.alert(response.message)
        if (props.navigation.state.routeName !== 'EditRequest') {
          setDescription('');
          setCategoryLabel('');
          setCategoryId('');
          setSubCategoryLabel('');
          setSubCategoryId('');
          setDayToDeliver('');
          setBudgetFrom('');
          setBudgetTo('');
          setFile('')
          setRequestExpiresOn(moment().format('DD-MM-YYYY'));
        }
      }

    }
  };

  const onDateChange = (value) => {
    const currentDate = value;
    const date = new Date(currentDate);
    return date;
  }

  const handleChange = (key, value) => {
    setLengthOfDescription(value.length)
    switch (key) {
      case 'description':
        return setDescription(value);
      case 'dayToDeliver':
        return setDayToDeliver(value);
      case 'requestExpiresOn':
        return setRequestExpiresOn(value);
      case 'budgetFrom':
        return setBudgetFrom(value);
      case 'budgetTo':
        return setBudgetTo(value);
    }
  };

  const handleCategory = (value) => {
    if(value != 0){
      let label = categories.find(cat => cat.c_id == value);
      setCategoryLabel(label.c_title);
      setCategoryId(label.c_id);
      setSubCategories(label.sub_categories);
    }
  };

  const handleSubCategory = (value) => {
    if(value != 0){
      let label = subCategories.find(cat => cat.c_id == value)
      setSubCategoryLabel(label.c_title);
      setSubCategoryId(label.c_id);
    }
  };

  const downloadFile = (file) => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob
      .config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: (file).split("/")[5],
          path: dirs.DownloadDir + (file).split("/")[5],
        },
      })
      .fetch('GET', file, {
        //some headers ..
      })
      .then((res) => {
        Alert.alert('File Downloaded Successfully to', res.path());
        console.log('The file saved to ', res.path())
      })
      .catch(err => {
        console.log('error', err)
        Alert.alert('Error while download file');
      })
  }

  const downloadFilePermission = async (file) => {
    console.log('download')
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile(file);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const uploadFile = async () => {
    FilePickerManager.showFilePicker(null, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        console.log(' file response', response);
        const file = {
          'uri': response.uri,
          'type': response.type,
          'name': response.fileName
        }
        setFile(file)
      }
    });
  }

  const handleDeleteDocument = async (id) => {
    console.log('id===================', id)
    setIsLoading(true)
    const response = await delte_request_file(props.token, id);
    setIsLoading(false)
    if (response.status === 1) {
      setFile('');
      Alert.alert('File deleted Successfully.');
    } else {
      Alert.alert('Error while delete file.');
    }
  }

  return (
    <DrawerWrapper {...props}>
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} />
          }
          style={styles.container}>
          <View style={{ paddingBottom: 15 }}>
            <View style={styles.editPageTitleView}>
              <Text style={styles.eidtPageTitleTextStyle}>
                Request offer from sellers
                  </Text>
            </View>
            <View>
              <TextInput
                placeholder="* Description"
                multiline={true}
                numberOfLines={3}
                value={description}
                onChangeText={value => {
                  handleChange('description', value);
                }}
                style={styles.descriptionTextInput}
              />
              <Text>{lengthOfDescription}/2500 Characters</Text>
              <View style={styles.textContent}>
                <View style={styles.PickerContentStyle}>
                  <Picker
                    style={styles.PickerStyle}
                    selectedValue={categoryId}
                    onValueChange={text => {
                      handleCategory(text)
                    }}
                  >
                    <Picker.Item label={"Select category"} value={0} />
                    {categories && categories.map((item, index) => (
                      <Picker.Item key={index} label={item.c_title} value={item.c_id} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.textContent}>
                <View style={styles.PickerContentStyle}>
                  <Picker
                    style={styles.PickerStyle}
                    selectedValue={subCategoryId}
                    onValueChange={text => {
                      handleSubCategory(text)
                    }}
                  >
                     <Picker.Item label={"Select subcategory"} value={0} />
                    {subCategories && subCategories.map((item, index) => (
                      <Picker.Item key={index} label={item.c_title} value={item.c_id} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.textContent}>
                <View style={styles.PickerContentStyle}>
                  <Picker
                    style={styles.PickerStyle}
                    selectedValue={dayToDeliver ? dayToDeliver : 0}
                    onValueChange={text => {
                      handleChange('dayToDeliver', text)
                    }}
                  >
                    {days.map((item) => (
                      <Picker.Item key={item.label} label={item.label} value={item.id} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.textContent}>
                <View style={styles.PickerContentStyle}>
                  <DatePicker
                    date={requestExpiresOn}
                    showIcon={false}
                    placeholder="Request expires on"
                    mode="date"
                    format="DD/MM/YYYY"
                    customStyles={{
                      dateInput: styles.dateInput,
                      dateText: styles.dateText,
                      placeholderText: styles.placeholderText
                    }}
                    onDateChange={(date) => setRequestExpiresOn(date)}
                    placeholderTextColor="white"
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                    style={styles.datePickerStyle} />
                </View>
              </View>
              <TextInput
                placeholder="Budget From ($)"
                value={budgetFrom}
                onChangeText={text => setBudgetFrom(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Budget To ($)"
                value={budgetTo}
                onChangeText={text => setBudgetTo(text)}
                style={styles.input}
              />
              <TouchableWithoutFeedback
                onPress={uploadFile}
                style={styles.uploadViewStyle}>
                <>
                  <Icon
                    name="paperclip"
                    color='#748f9e'
                    size={22}
                  />
                  <Text
                    style={styles.uploadTextStyle}>
                    UPLOAD ATTACHEMENTS
                      </Text>
                </>
              </TouchableWithoutFeedback>
              {
                file && file.name ?
                  <>
                    <View style={styles.uploadViewStyle}>
                      <Text
                        style={styles.fileNameTextStyle}>
                        {file.name}
                      </Text>
                    </View>
                  </>
                  : null
              }
              {file && !file.name ?
                <View style={styles.uploadViewStyle}>
                  <Text
                    onPress={() => downloadFilePermission(file)}
                    style={styles.fileNameTextStyle}>
                    {(file).split("/")[5]}
                  </Text>
                  <Icon
                    style={styles.trashIconStyle}
                    name="trash"
                    color='red'
                    size={20}
                    onPress={() => handleDeleteDocument(requestId)}
                  />
                </View> :
                null
              }
              <TouchableOpacity
                style={styles.button_wrapper}
                onPress={handleSubmit}>
                <Text style={styles.button_text}>
                  Send Request
                    </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </DrawerWrapper>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    categories: state.categoriesRequest.categories,
  };
};


const Edit_request = connect(
  mapStateToProps,
)(EditRequest);

export default Edit_request;




