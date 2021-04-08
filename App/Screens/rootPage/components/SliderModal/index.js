import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import styles from './index.style';
import { Button } from 'native-base';
import Modal from "react-native-modal";
import {
    report_this
} from '../../../../services/reportThis';
import SnapCarousel from '../CustomCarousel/snap_carousel';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../commons/responsive_design';
import Icon from 'react-native-vector-icons/FontAwesome';

const SliderModal = (props) => {
    const { isVisible, toggle, data } = props;

    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal
                deviceWidth={widthPercentageToDP(100)}
                deviceHeight={heightPercentageToDP(100)}
                onBackdropPress={toggle}
                isVisible={isVisible}
                swipeDirection='up'
                style={{
                    backgroundColor:'white',
                    margin:0,
                    alignItems:'center',
                    display:'flex',
                    opacity:0.9
                }}
            >
                <>
                <Icon 
                onPress={toggle}
                style={{
                    position: 'absolute', 
                    right: 30, 
                    top: 30, 
                    zIndex: 1000,
                }}
                name="times" 
                size={30} 
                color="#333" />
                {/* Content View */}
                <SnapCarousel 
                    items={data} 
                    handleOnClick={() => console.log('item clicked')}
                />
                </>
            </Modal>
        </>
    )
}

export default SliderModal;