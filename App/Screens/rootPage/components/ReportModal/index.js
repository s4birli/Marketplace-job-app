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
} from '../../../../services/reportThis'
import { widthPercentageToDP, heightPercentageToDP } from '../../../../commons/responsive_design';

const ReportModal = (props) => {
    const { isVisible, toggle, data, description, setDescription, token } = props;

    const [isLoading, setIsLoading] = useState(false);

    const reportThis = async () => {
        if (description === '') return Alert.alert('Message is required.')
        setIsLoading(true)
        const requestData = {
            message: description,
            r_id: data.r_id
        }
        const response = await report_this(token, requestData);
        console.log('report response', response)
        setIsLoading(false)
        if (response.status === 1) {
            setDescription('')
            Alert.alert('Your message sent to admin.')
            toggle()
        } else {
            Alert.alert(response.message)
        }
    }

    return (
        <>
            <Modal
                deviceWidth={widthPercentageToDP(100)}
                deviceHeight={heightPercentageToDP(100)}
                onBackdropPress={toggle}
                isVisible={isVisible}
                swipeDirection='up'
            >
                {/* Content View */}
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <Text style={styles.containerHeaderTextStyle}>
                        Report this root
                    </Text>
                    <View style={styles.line} />
                    {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                    <Text style={[styles.titleText, styles.padding]}>
                        You are about to report the following root:
                    </Text>
                    <Text style={[styles.titleText, styles.bold]}>
                        {data.r_title}
                    </Text>
                    <Text style={[styles.textInputLable, styles.padding]}>
                        Description
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Let us know why you would like to report this root"
                        value={description}
                        onChangeText={value => setDescription(value)}
                        style={styles.descriptionTextInput}
                    />
                    <View style={styles.line} />
                    <View style={styles.buttonViewStyle}>
                        <Button
                            onPress={reportThis}
                            style={[styles.confirmButton, { backgroundColor: '#28a745' }]}>
                            <Text style={styles.buttonTextStyle}>
                                Confirm
                        </Text>
                        </Button>
                        <Button
                            onPress={toggle}
                            style={[styles.confirmButton, { backgroundColor: '#dc3545' }]}>
                            <Text style={styles.buttonTextStyle}>
                                Cancel
                        </Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}

export default ReportModal;