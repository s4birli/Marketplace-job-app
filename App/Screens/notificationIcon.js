import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ChatIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            getNotification: false,
        }
    }

    componentDidMount = () => {
        const socket = global.socket;
        socket.on('connect', () => {
        });

        socket.on('connect_error', (err) => { console.log("SOCKET CONNECTION ERR ----", err) })

        socket.on('notification', (data) => {
            console.log("=============================================================")
            const userMessage = JSON.parse(data)
            if (userMessage.type === "chat") {
                this.setState({
                    getNotification: true
                })
            }
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { this.setState({ getNotification: false }) }}>
                <View style={this.state.getNotification ? styles.isMessage : styles.noMessage}>
                </View>
                <Image style={{ height: 22, width: 28 }} source={require("../assets/icons/bell-icon.png")} />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.LoginUser.userToken,
        review: state.addRoot,
        id: state.LoginUser.user_id
    };
};

const styles = StyleSheet.create({
    isMessage: {
        height: 10,
        width: 10,
        right: 0,
        top: 0,
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: 100,
        borderRadius: 100
    },
    noMessage: {

    }
})

export default connect(mapStateToProps)(ChatIcon);