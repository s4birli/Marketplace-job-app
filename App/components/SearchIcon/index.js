import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity
} from 'react-native';
import styles from './index.style';
import Modal from "react-native-modal";
import { widthPercentageToDP, heightPercentageToDP } from '../../commons/responsive_design';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = (props) => {

    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm,SetSearchTerm] = useState('');
    const toggle = () => setIsVisible(!isVisible);
    const handleSearch = () =>{
        props.navigation.navigate('Home');
        if(!searchTerm) return Alert.alert('Please fill out this.');
        setIsVisible(false)
        props.navigation.navigate('AdvanceSearch', { 'searchTerm': searchTerm });
        SetSearchTerm('')
    }
    return (
        <>  
            <TouchableOpacity
            onPress={toggle}
            >
                <Image 
                style={{ height: 23, width: 23 }} 
                source={require('../../assets/icons/search.png')} />
            </TouchableOpacity>
            <Modal
                deviceWidth={widthPercentageToDP(100)}
                deviceHeight={heightPercentageToDP(100)}
                onBackdropPress={toggle}
                isVisible={isVisible}
                swipeDirection='up'
                style={{
                    margin:0,
                    alignItems:'center',
                    display:'flex',
                    opacity:0.9
                }}
            >
                <View 
                style={styles.inputView}
                >
                {/* Content View */}
                    <TextInput
                        placeholder="What are you looking for?"
                        value={searchTerm}
                        onChangeText={ value => {
                            SetSearchTerm(value)
                        }}
                        onSubmitEditing={handleSearch}
                        style={{
                            flex: 5,
                        }}
                    />
                    <TouchableOpacity 
                    style={{
                    flex: 1,
                    justifyContent:'center',
                    alignItems:'center',
                    }}
                    onPress={handleSearch}>
                     <Image 
                        style={{ height: 23, width: 23 }} 
                        source={require('../../assets/icons/search.png')} />
                </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

export default SearchBar;