import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from './index.styles';
import * as RNLocalize from "react-native-localize";
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import * as types from '../root/actions';
import AsyncStorage from '@react-native-community/async-storage';
const RightDrawer = (props) => {

  const [categories, setCategories] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');

  useEffect(() => {
    if (props.categories.length > 0) {
      setCategories(props.categories)
    }
  }, [props.categories])

  useEffect(() => {
    if (activeSections.length > 0) {
      const c_id = categories[activeSections].c_parent_id;
      setCategoryId(c_id);
    }
  }, [activeSections])

  const updateSections = activeSections => {
    setActiveSections(activeSections)
  };

  console.log('activeSections', activeSections)

  const renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text >{section.c_title}</Text>
      </View>
    );
  };

  const renderHeader = section => {
    return (
      <View style={styles.listItemViewStyle}>
        <Text style={styles.listItemTextStyle}>{section.c_title}</Text>
        <Icon
          name="chevron-down"
          size={16}
          color="#212529"
          style={styles.downArrowStyle}
        />
      </View>
    );
  };

  const handleSubcategoryClicked = (item) => {
    console.log("???????????????????????????????????????????",item)
    props.navigation.navigate('AdvanceSearch', { 'c_id': item.c_parent_id, 'sub_c_id': item.c_id });
  }

  const renderContent = section => {
    const renderListOfCategories = (subcategories) => {
      return subcategories.map(item => (
        <TouchableHighlight
          underlayColor="#ffffff00"
          onPress={() => handleSubcategoryClicked(item)}
          style={styles.subItemViewStyle}>
          <Text style={styles.subItemTextStyle}>
            {item.c_title}
          </Text>
        </TouchableHighlight>
      ))
    }

    return (
      <>
        {
          section.sub_categories.length > 0 && renderListOfCategories(section.sub_categories)
        }
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={styles.rightDrawerTitleViewStyle}>
        <Text style={styles.rightDrawerTitleTextStyle}>
          Categories
        </Text>
      </View>
      <ScrollView>
        <View style={styles.categoriesListViewStyle}>
          {categories.length > 0 && (
            <Accordion
              activeSections={activeSections}
              sections={categories}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
            />
          )
          }
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
    categories: state.categoriesRequest.categories,
  };
};

const RightDrawerScreen = connect(mapStateToProps)(RightDrawer);

export default RightDrawerScreen;



/**
 *
 *    <View style={styles.categoriesListViewStyle}>
          {props.review.category && props.review.category.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.listItemViewStyle}
                onPress={() => {
                  props.navigation.navigate('AdvanceSearch',{search_title:item.c_title,c_id:item.c_id});
                }}>
                <Text
                  style={styles.listItemTextStyle}>
                  {item.c_title}
                </Text>
                <Icon
                 name="chevron-down"
                 size={16}
                 color="#212529"
                 style={styles.downArrowStyle}
                 />
              </TouchableOpacity>
            );
          })}
        </View>
 *
 *
 */