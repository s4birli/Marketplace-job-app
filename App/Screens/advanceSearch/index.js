import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import Slider from '@react-native-community/slider';
import Dash from 'react-native-dash';
import { withNavigation } from 'react-navigation';
import * as RNLocalize from "react-native-localize";
import { connect } from 'react-redux';
import Header from '../../commons/header';
import RootCardWIthBigImage from '../../commons/rootCardWIthBigImage';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import config from '../../config';
import styles from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  get_list_by_category,
  get_countries,
  get_languages,
  filter_record
} from '../../services/search';

const AdvanceSearch = (props) => {

  const [categoryId, setCategoryId] = useState('0');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [categories, setCategories] = useState(props.categories);
  const [subCategoryId, setSubCategoryId] = useState('0');
  const [subCategoryLabel, setSubCategoryLabel] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [priceHighToLow, setPriceHighToLow] = useState(false);
  const [priceLowToHigh, setPriceLowToHigh] = useState(false);
  const [reviewsHighToLow, setReviewsHighToLow] = useState(false);
  const [reviewsLowToHigh, setReviewsLowToHigh] = useState(false);
  const [recommended, setRecommended] = useState(0);
  const [onlineSeller, setOnlineSeller] = useState(false);
  const [isCheckedPriceLowToHigh, setIsCheckedPriceLowToHigh] = useState(false)
  const [isCheckedPriceHighToLow, setIsCheckedPriceHighToLow] = useState(false)
  const [isCheckedReviewsLowToHigh, setIsCheckedReviewsLowToHigh] = useState(false)
  const [isCheckedReviewsHighToLow, setIsCheckedReviewsHighToLow] = useState(false)
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filterData = async () => {
    setIsLoading(true)
    const formData = new FormData();
    if (searchTerm) formData.append('keyword', searchTerm);
    if (categoryId != 0) formData.append('category', categoryId);
    if (subCategoryId != 0) formData.append('subcategory', subCategoryId);
    if (minPrice) formData.append('min_price', minPrice);
    if (maxPrice) formData.append('max_price', maxPrice);
    if (language) formData.append('language[]', language);
    console.log("reviewsLowToHigh======",reviewsLowToHigh);
    if(isCheckedReviewsHighToLow || isCheckedReviewsLowToHigh){
      formData.append('rating', reviewsLowToHigh ? 'asc' : 'desc');
    }
    if(isCheckedPriceHighToLow|| isCheckedPriceLowToHigh){
      formData.append('price', priceLowToHigh ? 'asc' : 'desc');
    }

    if (country) formData.append('country[]', country);
    if (recommended) formData.append('recommended',recommended?1: 0)
    console.log('formData',formData)

    const response = await filter_record(props.token, formData);
    console.log("filter response============",response)
    if (response.status === 1) {
      setSearchResult(response.data);
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setSearchResult([])
    }
  };

  useEffect(()=>{
   filterData()
  },[priceLowToHigh])

  useEffect(()=>{
    filterData()
   },[reviewsLowToHigh])

  useEffect(()=>{
    filterData()
  },[recommended])
  
  const filterDataBySearch = async (search) => {
    setIsLoading(true)
    const formData = new FormData();
    if (!search) return Alert.alert('No Search Keyword found.')
    formData.append('keyword', search);
    const response = await filter_record(props.token, formData);
    if (response.status === 1) {
      setSearchResult(response.data);
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setSearchResult([])
    }
  };

  useEffect(() => {
    props.navigation.closeDrawer();
    getCountries();
    getLanguages();
  }, [])

  useState(() => {
    if (props.navigation.getParam('searchTerm', '')) {
      setSearchTerm(props.navigation.getParam('searchTerm', ''))
      filterDataBySearch(props.navigation.getParam('searchTerm', ''))
    }
  }, [props.navigation.getParam('searchTerm', '')])

  // useEffect(() => {
  //   if (props.navigation.getParam('c_id', '')) {
  //     setCategoryId(props.navigation.getParam('c_id', ''));
  //   }
  // }, [props.navigation.getParam('c_id', '')])

  useEffect(() => {
    if (props.navigation.getParam('sub_c_id', '')) {
      const subId = props.navigation.getParam('sub_c_id', '');
      if (subId) {
        props.navigation.closeDrawer();
        // setSubCategoryId(subId);
        getRootsByCategory(props.navigation.getParam('c_id', ''),subId);
      }
    }
  }, [props.navigation.getParam('sub_c_id', '')])

  useEffect(() => {
    if (categoryId) {
      const category = categories.find(cat => {
        return cat.c_id === categoryId
      })
      if (category){
        setSubCategories(category.sub_categories)
      }
    }
  }, [categoryId])

  const getCountries = async () => {
    const response = await get_countries(props.token);
    if (response.status === 1) {
      setCountries(response.data);
    }
  };

  const getLanguages = async () => {
    const response = await get_languages(props.token);
    if (response.status === 1) {
      setLanguages(response.data);
    }
  };

  const getRootsByCategory = async (c_id,sub_c_id) => {
    setIsLoading(true)

    const formData = new FormData();
    formData.append('category', c_id);
    formData.append('subcategory', sub_c_id);

    const response = await filter_record(props.token, formData)
    if (response.status === 1) {
      setSearchResult(response.data);
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setSearchResult([])
    }

  }

  const handleCountry = (value) => {
    let label = countries.find(cnt => cnt.cnt_id == value)
    setCountry(label.cnt_code);
  };

  const handleLanguage = (value) => {
    let label = languages.find(lan => lan.id == value)
    console.log("label=========>",label)
    setLanguage(label.id);
  };

  const handleCategory = (value) => {
    if (value != 0){
      let label = categories.find(cat => cat.c_id === value);
      setCategoryLabel(label.c_title)
      setCategoryId(label.c_id)
      setSubCategories(label.sub_categories)
    }
    else{
      setCategoryId(0)
    }
  };

  const handleSubCategory = (value) => {
    if (value != 0){
    let label = subCategories.find(cat => cat.c_id == value)
    setSubCategoryLabel(label.c_title)
    setSubCategoryId(label.c_id)
    }
    else{
      setSubCategoryId(0)
    }
  };
  
  const renderFilterButton = (
    <TouchableWithoutFeedback
      onPress={() => setShowFilter(!showFilter)}
      style={styles.filterButtonView}>
      <>
        <Icon name="sliders" size={22} color="#748f9e" />
        <Text style={styles.filterButtonTextStyle}>
          FILTER RESULT
      </Text>
      </>
    </TouchableWithoutFeedback>
  )

  const renderFilterSection = () => (
    <View style={styles.searchContainer}>
      {/* priceLowToHigh */}
      <View style={styles.filterItemViewStyle}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setPriceLowToHigh(!priceLowToHigh);
              setIsCheckedPriceLowToHigh(!isCheckedPriceLowToHigh);
              setIsCheckedPriceHighToLow(false);
              setPriceHighToLow(false);
            }}
            style={styles.filterItemImageViewStyle}>
            <Image
              style={styles.filterItemImageStyle}
              source={require('../../assets/icons/priceHigh.png')}
            />
          </TouchableOpacity>
          <Text style={styles.filterItemTextStyle}>
            Price - Low to High
            </Text>
        </View>
        <TouchableOpacity
          style={styles.filterItemRadioStyle}
          onPress={() => {
            setPriceLowToHigh(!priceLowToHigh);
            setIsCheckedPriceLowToHigh(!isCheckedPriceLowToHigh);
            setIsCheckedPriceHighToLow(false);
            setPriceHighToLow(false);
          }}
        >
          <Image
            style={styles.filterItemImageStyle}
            source={priceLowToHigh ? require('../../assets/icons/online.png') : require('../../assets/icons/unselect.png')}
          />
        </TouchableOpacity>
      </View>
      <Dash
        dashColor="#E8EEF1"
        style={styles.dashStyle}
      />
      {/* priceHighToLow */}
      <View style={styles.filterItemViewStyle}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setPriceHighToLow(!priceHighToLow);
              setIsCheckedPriceHighToLow(!isCheckedPriceHighToLow);
              setIsCheckedPriceLowToHigh(false);
              setPriceLowToHigh(false);
              filterData()
            }}
            style={styles.filterItemImageViewStyle}>
            <Image
              style={styles.filterItemImageStyle}
              source={require('../../assets/icons/priceLow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.filterItemTextStyle}>
            Price - High to Low
            </Text>
        </View>
        <TouchableOpacity
          style={styles.filterItemRadioStyle}
          onPress={() => {
            setPriceHighToLow(!priceHighToLow);
            setIsCheckedPriceHighToLow(!isCheckedPriceHighToLow);
            setIsCheckedPriceLowToHigh(false);
            setPriceLowToHigh(false);
            filterData()
          }}
        >
          <Image
            style={styles.filterItemImageStyle}
            source={priceHighToLow ? require('../../assets/icons/online.png') : require('../../assets/icons/unselect.png')}
          />
        </TouchableOpacity>
      </View>
      <Dash
        dashColor="#E8EEF1"
        style={styles.dashStyle}
      />
      {/* reviewsLowToHigh */}
      <View style={styles.filterItemViewStyle}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setReviewsLowToHigh(!reviewsLowToHigh);
              setIsCheckedReviewsLowToHigh(!isCheckedReviewsLowToHigh);
              setIsCheckedReviewsHighToLow(false);
              setReviewsHighToLow(false);
              filterData()
            }}
            style={styles.filterItemImageViewStyle}>
            <Image
              style={styles.filterItemImageStyle}
              source={require('../../assets/icons/rateHigh.png')}
            />
          </TouchableOpacity>
          <Text style={styles.filterItemTextStyle}>
            Reviews - Low to High
            </Text>
        </View>
        <TouchableOpacity
          style={styles.filterItemRadioStyle}
          onPress={() => {
            setReviewsLowToHigh(!reviewsLowToHigh);
            setIsCheckedReviewsLowToHigh(!isCheckedReviewsLowToHigh);
            setIsCheckedReviewsHighToLow(false);
            setReviewsHighToLow(false);
            filterData()
          }}
        >
          <Image
            style={styles.filterItemImageStyle}
            source={reviewsLowToHigh ? require('../../assets/icons/online.png') : require('../../assets/icons/unselect.png')}
          />
        </TouchableOpacity>
      </View>
      <Dash
        dashColor="#E8EEF1"
        style={styles.dashStyle}
      />
      {/* reviewsHighToLow */}
      <View style={styles.filterItemViewStyle}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setReviewsHighToLow(!reviewsHighToLow);
              setIsCheckedReviewsHighToLow(!isCheckedReviewsHighToLow);
              setIsCheckedReviewsLowToHigh(false);
              setReviewsLowToHigh(false);
              filterData()
            }}
            style={styles.filterItemImageViewStyle}>
            <Image
              style={styles.filterItemImageStyle}
              source={require('../../assets/icons/rateLow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.filterItemTextStyle}>
            Reviews - High to Low
          </Text>
        </View>
        <TouchableOpacity
          style={styles.filterItemRadioStyle}
          onPress={() => {
            setReviewsHighToLow(!reviewsHighToLow);
            setIsCheckedReviewsHighToLow(!isCheckedReviewsHighToLow);
            setIsCheckedReviewsLowToHigh(false);
            setReviewsLowToHigh(false);
            filterData()
          }}
        >
          <Image
            style={styles.filterItemImageStyle}
            source={reviewsHighToLow ? require('../../assets/icons/online.png') : require('../../assets/icons/unselect.png')}
          />
        </TouchableOpacity>
      </View>
      <Dash
        dashColor="#E8EEF1"
        style={styles.dashStyle}
      />
      {/* recommended */}
      <View style={styles.filterItemViewStyle}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setRecommended(!recommended);
            }}
            style={styles.filterItemImageViewStyle}>
            <Image
              style={styles.filterItemImageStyle}
              source={require('../../assets/icons/recommended.png')}
            />
          </TouchableOpacity>
          <Text style={styles.filterItemTextStyle}>
            Recommended
          </Text>
        </View>
        <TouchableOpacity
          style={styles.filterItemRadioStyle}
          onPress={() => {
            setRecommended(!recommended);
          }}
        >
          <Image
            style={styles.filterItemImageStyle}
            source={recommended ? require('../../assets/icons/online.png') : require('../../assets/icons/unselect.png')}
          />
        </TouchableOpacity>
      </View>
      <Dash
        dashColor="#E8EEF1"
        style={styles.dashStyle}
      />
      <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
        {/* searchTerm */}
        <View style={{justifyContent:'center'}}>
          <TextInput
            placeholder="Search Keyword"
            placeholderTextColor="#748F9E"
            style={styles.textInputStyles}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
          {searchTerm !== ''&&
          <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.textClose}>
            <Icon name="remove" size={14} color="#748f9e"/>
          </TouchableOpacity>
          }
        </View>
        {/* category */}
        
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={categoryId}
              onValueChange={text =>
                {handleCategory(text);
                filterData();}
              }
            > 
              <Picker.Item key={0} label='Category' value={0} />
              {categories && categories.map((item, index) => (
                <Picker.Item key={index+1} label={item.c_title} value={item.c_id} />
              ))}
            </Picker>
            {categoryId != 0 &&
            <TouchableOpacity onPress={() => setCategoryId(0)} style={styles.categoryClose}>
                <Icon name="remove" size={14} color="#748f9e"/>
            </TouchableOpacity>
            }
          </View>
        </View>
        {/* subcategory */}
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={subCategoryId}
              onValueChange={text => {handleSubCategory(text); filterData();}}
            >
              <Picker.Item key={0} label='Sub Category' value={0} />
              {subCategories && subCategories.map((item, index) => (
                <Picker.Item key={index} label={item.c_title} value={item.c_id} />
              ))}
            </Picker>
            {subCategoryId != 0 &&
            <TouchableOpacity onPress={() => setSubCategoryId(0)} style={styles.categoryClose}>
                <Icon name="remove" size={14} color="#748f9e"/>
            </TouchableOpacity>
            }
          </View>
        </View>
        {/* lavel */}
        {/* <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={country}
              onValueChange={text => handleCountry(text)}
            >
              <Picker.Item key={0} label='Lavel' value='' />
              {countries && countries.map((item, index) => (
                <Picker.Item key={index} label={item.cnt_name} value={item.cnt_id} />
              ))}
            </Picker>
          </View>
        </View> */}
        {/* country */}
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={country}
              onValueChange={text => {handleCountry(text);}}
            >
              <Picker.Item key={0} label='Country' value='' />
              {countries && countries.map((item, index) => (
                <Picker.Item key={index} label={item.cnt_name} value={item.cnt_id} />
              ))}
            </Picker>
            {country !== '' &&
            <TouchableOpacity onPress={() => setCountry('')} style={styles.categoryClose}>
                <Icon name="remove" size={14} color="#748f9e"/>
            </TouchableOpacity>
            }
          </View>
        </View>
        {/* Language */}
        <View style={styles.textContent}>
          <View style={styles.PickerContentStyle}>
            <Picker
              style={styles.PickerStyle}
              selectedValue={language}
              onValueChange={text => {handleLanguage(text)}}
            >
              <Picker.Item key={0} label='Language' value='' />
              {languages && languages.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.id} />
              ))}
            </Picker>
            {language !== '' &&
            <TouchableOpacity onPress={() => setLanguage('')} style={styles.categoryClose}>
                <Icon name="remove" size={14} color="#748f9e"/>
            </TouchableOpacity>
            }
          </View>
        </View>
        {/* minprice and maxprice */}
        <View style={styles.rowTextInput}>
          <View>
            <TextInput
              placeholder="Min Price"
              placeholderTextColor="#748F9E"
              value={minPrice}
              style={[styles.textInputStyles, { flex: 0.5 }]}
              onChangeText={text => {setMinPrice(text)}}
            />
            {minPrice !== ''&&
            <TouchableOpacity onPress={() => setMinPrice('')} style={styles.textClose}>
              <Icon name="remove" size={14} color="#748f9e"/>
            </TouchableOpacity>
            }
          </View>
          <View>
            <TextInput
              placeholder="Max Price"
              placeholderTextColor="#748F9E"
              onChangeText={text => {setMaxPrice(text)}}
              value={maxPrice}
              style={[
                styles.textInputStyles,
                { marginLeft: 10, flex: 0.5 },
              ]}
            />
            {maxPrice !== ''&&
            <TouchableOpacity onPress={() => setMaxPrice('')} style={styles.textClose}>
              <Icon name="remove" size={14} color="#748f9e"/>
            </TouchableOpacity>
            }
          </View>
        </View>
        {/* online sellers */}
        <View style={styles.onlineTalent}>
          <TouchableOpacity
            style={styles.filterItemRadioStyle}
            onPress={() => {setOnlineSeller(!onlineSeller)}}
          >
            <Image
              style={styles.filterItemImageStyle}
              source={onlineSeller ? require('../../assets/icons/online.png') : require('../../assets/icons/unselect.png')}
            />
          </TouchableOpacity>
          <Text style={styles.onlineText}>ONLINE SELLERS</Text>
        </View>
        {/* filter button */}
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={filterData}>
          <Text style={styles.filterText}>FILTER RESULT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <DrawerWrapper {...props}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} />
          }
          style={styles.container}>
          {renderFilterButton}
          <View>
            {showFilter && renderFilterSection()}
          </View>
          {searchResult.length > 0 ? (
            <View style={{ marginTop: 20 }}>
              <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                  <RootCardWIthBigImage item={item} navigation={props.navigation} socket={global.socket}/>
                )}
                keyExtractor={(item, index) => index.toString()}
              />

            </View>
          ) :
            !isLoading && (<View style={[styles.loadercontainer, styles.horizontal]}>
              <View><Text> Roots Not Found </Text></View>
            </View>)
          }
          <View style={{ height: 150 }} />
        </ScrollView>
      </DrawerWrapper>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    categories: state.categoriesRequest.categories,
  };
};

const searchScreen = connect(mapStateToProps)(AdvanceSearch);

export default searchScreen;



  
