import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Picker,
    Dimensions
} from 'react-native';
import { allLanguages } from '../../languages'
import { TouchableOpacity } from 'react-native-gesture-handler';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default class EditProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            screen: 'account',
            type: '',
            phone: ''
        }
    }

    render() {
        let languages = allLanguages.map((s, i) => {
            return <Picker.Item key={i} value={s.name} label={s.name} />
        });

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Edit Profile</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.screen}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ screen: itemValue })
                            }>
                            <Picker.Item label="Account" value="account" />
                            <Picker.Item label="Security" value="security" />
                            <Picker.Item label="Notifications" value="notifications" />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 200, width: 200, borderRadius: 10 }} source={{ uri: 'abcd' }} />
                        <View>
                            <TouchableOpacity onPress={() => { this.changeProfile() }}>
                                <Text style={{ fontSize: 20, color: '#10A2EF' }}>CHANGE PROFILE IMAGE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.type}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ screen: itemValue })
                            }>
                            <Picker.Item label="User Type" value="User Type" />
                            <Picker.Item label="Buyer" value="buyer" />
                            <Picker.Item label="Seller" value="seller" />
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text>{this.props.name}</Text>
                    </View>
                    <View style={styles.picker}>
                        <Text>
                            {this.props.lastName}
                        </Text>
                    </View>
                    <View style={styles.picker}>
                        <Text>{this.props.country}</Text>
                    </View>
                    <View style={styles.picker}>
                        <Text>{this.props.timeZone}</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.language}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ screen: itemValue })
                            }>
                            {languages}
                        </Picker>
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.additionalLanguage}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ screen: itemValue })
                            }>
                            {languages}
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text>{this.props.email}</Text>
                    </View>
                    <View>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={this.state.phone}
                            onChange={(value)=>{this.setState({phone: value})}} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    picker: {
        height: 50,
        width: Dimensions.get('window').width / 1.2,
        borderWidth: 1,
        borderColor: '#7F7F7F',
        borderRadius: 50
    }
}