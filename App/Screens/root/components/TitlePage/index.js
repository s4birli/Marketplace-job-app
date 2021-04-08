import React, { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Picker,
  Dimensions,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  saveRootTitleData
} from '../../actions/actions';
import styles from './index.style';

const TitlePage = (props) =>  {

  //Loading
  const [isLoading,setIsLoading] = useState(false);

  //Title page
  const [rootTitle,setRootTitle] = useState('');
  const [category,setCategory] = useState('');
  const [subCategories,setSubCategories] = useState([]);
  const [subCategory,setSubCategory] = useState('');
  const [lengthOfTitle,setLengthOfTitle] = useState(0);
  const [isTitleValid,setIsTitleValid] = useState(true);
  const [isCategoryValid,setIsCategoryValid] = useState(true);
  const [isSubCategoryValid,setIsSubCategoryValid] = useState(true);
  const [titleError,setTitleError] = useState('');
  const [categoryError,setCategoryError] = useState('');
  const [subCategoryError,setSubCategoryError] = useState('');

  useEffect(()=>{
    if(props.showTitlePageError) handleTitlePageNext()
  },[props.showTitlePageError])

  //handle data from reducer
  useEffect(()=>{
    console.log('props.root',props.root)
    if(props.root){
      if(props.root.rootTitle) setRootTitle(props.root.rootTitle);
      if(props.root.category) {
        setCategory(props.root.category);
        let label = props.categories.find(cat => cat.c_id == props.root.category)
        setSubCategories(label.sub_categories);
      }
      if(props.root.subCategory) setSubCategory(props.root.subCategory);
    }
  },[props.root])

  const handleTitleChange = (value) => {
    setLengthOfTitle(value.length);
    setRootTitle(value);
    if(value.length === 0) {
      setIsTitleValid(false);
      setTitleError('Root title can not be blank!!');
      return
    }else if(value.length < 8) {
      setIsTitleValid(false);
      setTitleError('Title must be at least 8 characters or more.');
      return
    }else if(value.length > 80) {
      setIsTitleValid(false);
      setTitleError('Please enter no more than 80 characters.');
      return
    }else{
      setIsTitleValid(true);
      setTitleError('');
    }
    
  };

  const handleCategory = (value) => {
    let label = props.categories.find(cat => cat.c_id == value);
    console.log('category is',label)
    setCategory(label.c_id);
    setSubCategories(label.sub_categories);
    setIsCategoryValid(true);
    setCategoryError('');
  };

  const handleSubCategory = (value) => {
    let label = subCategories.find(cat => cat.c_id == value);
    console.log('subcategory is',label)

    setSubCategory(label.c_id);
    setIsSubCategoryValid(true);
    setSubCategoryError('')
  };

  const handleTitleSaveAsDraft = () => {
    if(!rootTitle){
      setIsTitleValid(false);
      setTitleError('Root title can not be blank!!');
      return
    }
    const formData = new FormData();
    formData.append('r_title',rootTitle);
    if(category) formData.append('r_category_id',category); 
    if(subCategory) formData.append('r_subcategory_ids',subCategory);
    formData.append('r_type',1);//draft 
    props.handlePostRoot(formData)
  }

  const handleTitlePageNext = () => {
    if(!rootTitle){
      setIsTitleValid(false);
      setTitleError('Root title can not be blank!!')
    }
    if(!category) {
      setIsCategoryValid(false);
      setCategoryError('Category can not be blank!' )
    }else{
      setIsCategoryValid(true);
      setCategoryError('' )
    }
    if(!subCategory) {
      setIsSubCategoryValid(false);
      setSubCategoryError('Sub category can not be blank!' )
    }else{
      setIsSubCategoryValid(true);
      setSubCategoryError('' )
    }
    if(!isTitleValid || !rootTitle || !category || !subCategory ) return;
  
    let rootData = {
      rootTitle,
      category,
      subCategory
    }

    props.dispatch(saveRootTitleData(rootData))
    props.setIsTitlePageComplete(true)
    props.nextScreen('Pricing')
  }
  console.log('category id',category)
  console.log('subcategory id',subCategory)

    return(
    <>
    {
      !isTitleValid ?
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          {titleError}
        </Text>
      </View> : null
    }
    {
      !isCategoryValid ?
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          {categoryError}
        </Text>
      </View> : null
    }
    {
      !isSubCategoryValid ?
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          {subCategoryError}
        </Text>
      </View> : null
    }
    <View style={styles.container}>
      <View style={styles.rootTitleText}>
        <TextInput
          placeholder="Title (e.g. i will design ...)"
          value={rootTitle}
          onChangeText={value => handleTitleChange(value)}
          style={styles.input}
        />
       <Text>{lengthOfTitle}/80 Characters</Text>
      </View>
      <View style={styles.textContent}>
        {/*Category*/}
        <View style={styles.PickerContentStyle}>
          <Picker
            style={styles.PickerStyle}
            selectedValue={category}
            onValueChange={text => handleCategory(text)}
          >
            {/* {
             !category ?
             <Picker.Item key={0} label={'Category'} value={0} /> :
             null
            } */}
             {/* <Picker.Item key={0} label={'Select Category'} value={0} />  */}
            {props.categories && props.categories.map((item, index) => (
              <Picker.Item key={item.c_id} label={item.c_title} value={item.c_id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.textContent}>
        {/*Sub Category*/}
        <View style={styles.PickerContentStyle}>
          <Picker
            style={styles.PickerStyle}
            selectedValue={subCategory}
            onValueChange={text => handleSubCategory(text)}
          > 
            {/* {
             !subCategory ?
             <Picker.Item key={0} label={'Sub Category'} value={0} /> :
             null
            } */}
            { subCategories && subCategories.map((item, index) => (
              <Picker.Item key={item.c_id} label={item.c_title} value={item.c_id} />
            ))}
          </Picker>
        </View>
      </View>
      <View 
      style={styles.buttonsContainer}
      >
        <TouchableOpacity
          style={[styles.button_wrapper,{backgroundColor: '#10a2ef'}]}
          onPress={handleTitleSaveAsDraft}>
          <Text style={styles.button_text}>Save as Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button_wrapper,{backgroundColor: '#2ec09c'}]}
            onPress={handleTitlePageNext}>
          <Text style={styles.button_text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}


const mapStateToProps = state => {
  return {
    login: state.LoginUser,
    root: state.addRoot,
    categories: state.categoriesRequest.categories,
  };
};


const TitleScreen = connect(mapStateToProps)(TitlePage);

export default TitleScreen;

