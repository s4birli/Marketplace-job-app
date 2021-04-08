import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
import { getPreviousChats, loadMorePreviousChats } from '../services/ChatList';
import SocketIOClient from 'socket.io-client/dist/socket.io';
import {
    widthPercentageToDP as wp, heightPercentageToDP,
} from '../commons/responsive_design';
import { connect } from 'react-redux';
import { scale } from '../commons/responsive_design';
import {profile_service} from '../services/profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';

const ChatIcon = (props) => {
    const [getMessage, setGetMessage] = useState('false');
    const [globalSocket, setGolbalSocket] = useState('');
    const [chats, setChats] = useState([]);
    const [typing, setTyping] = useState(false)
    const [item, setItem] = useState('all');
    const [old_chats, setOldChats] = useState();
    const [newMessage, setNewMessage] = useState(false)
    const [userProfile, setUserProfile] = useState(null);
    const [counter, setCounter] = useState(1);
    const [isNone, setIsNone] = useState(false);
    
    const makeNone = ()=>{
        setIsNone(true);
        setNewMessage(false)
    };
    const mode = new Animated.Value(0);;
    const showAnimate = () => {
        Animated.timing(mode, {
            toValue: mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
        console.log("value=====",mode._value)
    }

    const firstY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -330]
    });

    const opacity = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    
    const getChats = async (type) => {
        setItem(type)
        let response = await getPreviousChats(props.token, type);
        setChats(response.data);
        setOldChats(response.data);
    }
    const removeNewMessage = (itemMsg) => {
        getUserProfile(props.token, itemMsg.id).then(userProfile =>{
        props.navigation.navigate('ChatScreen', { 'user': itemMsg, 'user_data': userProfile })
        if (itemMsg.newMessage) {
            chats && chats.map((item) => {
                if (item.id == itemMsg.id) {
                    item.newMessage = false
                    item.count = ''
                    let index = chats.findIndex((item) => {
                        return item.id == itemMsg.id
                    })
                    let newArr = [...chats];
                    newArr[index] = item;
                    setChats(newArr)
                }
            })
        }
        })
        
    }

    const getUserProfile = async (token, userId) => {
        const requestData = {
          token,
          user_id: userId
        }
        const response = await profile_service(requestData);
        if (response.status === 1) {
            console.log("response===",response.data)
            return response.data
        }
    }
    
    useEffect(() => {
        getChats('')
    }, [props.token])
  
    useEffect(() => {
        let socket = global.socket;
        socket.on('user_message', (data) => {
            const userMessage = JSON.parse(data)
            if (userMessage.type == "chat_event_typing") {
                console.log("chat_event_typing", userMessage);
                chats && chats.map((item) => {
                    if (item.conversation_id == userMessage.data.conversation_id) {
                        item.isTyping = true
                        setTyping(true)
                        let index = chats.findIndex((item) => {
                            return item.conversation_id == userMessage.data.conversation_id
                        })
                        let newArr = [...chats];
                        newArr[index] = item;
                        setChats(newArr)
                    }
                })
            } else if (userMessage.type == "user_login") {
                chats && chats.map((item) => {
                    if (item.id == userMessage.data.user_id) {
                        item.userOnline = true
                        item.is_online_class = 'green'
                        let index = chats.findIndex((item) => {
                            return item.id == userMessage.data.user_id
                        })
                        let newArr = [...chats];
                        newArr[index] = item;
                        setChats(newArr)
                    }
                })
            } else if (userMessage.type == "user_logout") {
                chats && chats.map((item) => {
                    if (item.id == userMessage.data.user_id) {
                        item.is_online_class = 'red'
                        let index = chats.findIndex((item) => {
                            return item.id == userMessage.data.user_id
                        })
                        let newArr = [...chats];
                        newArr[index] = item;
                        setChats(newArr)
                    }
                })
            } else if (userMessage.type == "chat") {
                setCounter(counter + 1);
                chats && chats.map((item) => {
                    if (item.id == userMessage.data.from_user_id) {
                        setTyping(false)
                        item.isTyping = false
                        item.message = userMessage.data.message
                        item.newMessage = true
                        item.count = counter
                        setNewMessage(true)
                        let index = chats.findIndex((item) => {
                            return item.id == userMessage.data.from_user_id
                        })
                        let newArr = [...chats];
                        newArr[index] = item;
                        setChats(newArr)
                    }
                })
            }
        })
    }, [chats])
   
    return (
        // <TouchableOpacity onPress={() => { this.setState({ getMessage: false }) }}>
        <>
            <View
                // pointerEvents={'none'}
                style={{
                    position:'relative', 
                    right: wp(40), 
                    alignSelf: 'center', 
                    alignItems:'center',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,}}>
                <NavigationEvents
                    onWillFocus={() => {
                        setIsNone(false)
                    }}
                />    
                {!isNone&&   
                <Animated.View
                style={{
                    position: 'absolute',
                    borderWidth:1,
                    borderRadius:3,
                    borderColor:'#DDD',
                    backgroundColor: '#FFF',
                    width: wp(92),
                    height: 280,
                    zIndex: 1,
                    top:firstY,
                    padding: 10,
                    // right: secondX,
                    opacity
                }}
                >
                        
                    {   
                        chats && chats.length > 0 ? 
                            <FlatList
                                data={chats}
                                renderItem={({ item, index }) => (
                                    <>
                                    {index<3&&
                                    <TouchableOpacity onPress={() => {
                                        // showAnimate();
                                        makeNone();
                                        removeNewMessage(item);
                                    }}>
                                        <View>
                                            <View style={styles.inboxEach}>
                                                <View style={{ flex: 4, flexDirection: 'row' }}>
                                                    <View style={styles.avatarContainer}>

                                                        <View style={item.is_online_class == 'green' ? styles.isOnline : styles.isOffline}>

                                                        </View>
                                                        <Image style={styles.avatar} source={{ uri: item.profile }} />
                                                    </View>
                                                    <View style={{ marginLeft: 20 }}>
                                                        <Text style={styles.userName}>{item.name}</Text>
                                                        {item.isTyping ? <>
                                                            <Image 
                                                                resizeMode={'contain'}
                                                                style={{ height: 30, width: 100, margin: 0, padding: 0 }} source={{ uri: 'https://www.talentsroot.com/images/typing.gif' }} />
                                                        </> : null}
                                                        <View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                {item.newMessage ?
                                                                    <>
                                                                        <Text numberOfLines={1} style={styles.message}>
                                                                            <Text style={{ color: 'green' }}>{item.message}</Text>
                                                                        </Text>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {!item.isTyping &&
                                                                            <Text numberOfLines={1} style={styles.message}>
                                                                                <Text>{item.message}</Text>
                                                                            </Text>
                                                                        }
                                                                    </>
                                                                }
                                                                {item.count ?
                                                                    <View style={styles.round}>
                                                                        {<Text style={{ color: 'white' }}>{item.count}</Text>}
                                                                    </View> : null
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text style={styles.time}>{item.created_at}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.separator} />
                                        </View>
                                    </TouchableOpacity>
                                    }
                                    </>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            : null
                    }
                    <View style={{flex:1, justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => {
                            showAnimate();
                            props.navigation.navigate('ChatList')
                           }
                            
                        }>
                            <Text style={{textAlign:'center', color:'#10a2ef', fontSize: 16, fontWeight: '400'}}> 
                                SEE ALL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                }
            </View>
            <TouchableWithoutFeedback onPress={() => showAnimate()}>
                <View>
                    <View style={newMessage ? styles.isMessage : styles.noMessage}></View>
                    <Image style={{ height: 22, width: 28 }} source={require("../assets/icons/mail.png")} />
                </View>
            </TouchableWithoutFeedback>
        </>
        // {/* </TouchableOpacity> */}
    )
}

const mapStateToProps = state => {
    return {
        token: state.LoginUser.userToken,
        review: state.addRoot,
        id: state.LoginUser.user_id,
        profileData: state.userProfile.profiledata
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
    avatarContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
    },
    chatListContainer:{
        marginTop:scale(5),
        marginHorizontal:scale(7),
        // height:heightPercentageToDP(100),
        borderTopWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        borderColor:'#DFDFDF'
    },
    chatListHeader:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10, 
        display: 'flex', 
        height: 70,
        borderBottomWidth:1,
        backgroundColor:'#F1F2F4',
        borderColor:'#DFDFDF',
        borderTopWidth:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10, 
    },
    headerPicker:{ 
        flex: 1, 
        borderWidth: 1, 
        borderColor: '#ced4da', 
        borderRadius: 6,
        backgroundColor:'white'
    },
    avatar: {
        flex: 1,
        height: null,
        width: null,
        borderRadius: 28,
    },
    picker: {
        height: 50,
        width: 200,
        borderWidth: 1,
        borderColor: '#748F9E',
        borderRadius: 50
    },
    userName: {
        fontSize: 14,
        color: 'black',
        fontWeight:'bold',
    },
    message: {
        marginTop: 5,
        fontSize: 12,
        color: '#AFB3BF',
    },
    time: {
        fontSize: 12,
        color: '#B2B7C2',
    },
    separator: {
        borderBottomColor: '#D1E0E8',
        borderBottomWidth: 1,
        width: '100%',
    },
    seeAll: {
        fontSize: 14,
        color: '#10A2EF',
        textAlign: 'center',
    },
    isOnline: {
        height: 15,
        width: 15,
        right: 0,
        position: 'absolute',
        backgroundColor: '#2EC09C',
        zIndex: 100,
        borderRadius: 100
    },
    isOffline: {
        height: 15,
        width: 15,
        right: 0,
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: 1,
        borderRadius: 100
    },
    round: {
        height: 25,
        width: 25,
        position: 'absolute',
        backgroundColor: 'green',
        borderRadius: 100,
        marginLeft: 200,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    searchView: {
        flex: 2,
        borderRadius: 25,
        borderColor: '#ced4da',
        borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 2,
        marginLeft: 10,
        backgroundColor:'white',
        paddingLeft:5
    }
})

export default connect(mapStateToProps)(ChatIcon);