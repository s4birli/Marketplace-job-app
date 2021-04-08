import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    Picker,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from "react-navigation";
import '../../services/ChatList'
import { getPreviousChats, loadMorePreviousChats } from '../../services/ChatList';
import {profile_service} from '../../services/profile';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import Icon from "react-native-vector-icons/FontAwesome";
import { scale, heightPercentageToDP } from '../../commons/responsive_design';


let offsetNum = 30;
const ChatList = (props) => {
    const [chats, setChats] = useState([]);
    const [typing, setTyping] = useState(false)
    const [item, setItem] = useState('all');
    const [newMessage, setNewMessage] = useState(false)
    const [old_chats, setOldChats] = useState();
    const [counter, setCounter] = useState(1);
    const [userProfile, setUserProfile] = useState(null);

    const getChats = async (type) => {
        setItem(type)
        let response = await getPreviousChats(props.token, type);
        setChats(response.data);
        setOldChats(response.data);
    }

    useEffect(() => {
        const socket  = global.socket;

        socket.on('user_message', (data) => {

            const userMessage = JSON.parse(data)
            if (userMessage.type == "chat_event_typing") {
                console.log("chat_event_typing", userMessage);
                chats && chats.map((item) => {
                    if (item.conversation_id == userMessage.data.conversation_id) {
                        console.log("in match logout ++++++++++++++++++")
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

    
    useEffect(() => {
        getChats('')
    }, [props.token])

    useEffect(() => {
        console.log('navigation changes is', props.navigation.state.routeName);
    }, [props])

    handleSearch = (text) => {
        if (!text) {
            console.log("========>>>>>>>>", old_chats)
            setChats(old_chats)
        } else {
            const filterList = chats.filter((item) => {
                const itemData = item.name.toUpperCase()
                const textData = text.toUpperCase()
                console.log(itemData.indexOf(textData) > -1)
                return itemData.indexOf(textData) > -1
            })
            setChats(filterList)
        }
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
    loadMoreMessages = async () => {
        let newchats = await loadMorePreviousChats(props.token, '', offsetNum);
        if (newchats.status == 1){
            offsetNum = newchats.offset
        }
        let newArr = [...chats];
        let newData = newchats.data
        let newDataArr = [...newData];
        console.log("newDataArr",...newDataArr);
        newArr.push(...newDataArr)
        setChats(newArr)
        // setOldChats(response.data);
    }
    
    return (
        <DrawerWrapper {...props}>
            {console.log('chats=============',chats)}
            <ScrollView >
                <View
                style={styles.chatListContainer}
                >
                    <NavigationEvents
                        onWillFocus={() => {
                            getChats('')
                        }}
                    />
                    <ScrollView>
                        <View style={styles.chatListHeader}>
                            <View style={styles.headerPicker}>
                                <Picker
                                    style={{fontSize:10}}
                                    itemStyle={{fontSize:10}}
                                    selectedValue={item}
                                    onValueChange={(itemValue, itemIndex) =>
                                        getChats(itemValue)
                                    }>
                                    <Picker.Item label="All" value="all" />
                                    <Picker.Item label="Unread" value="unread" />
                                    <Picker.Item label="Blocked" value="blocked" />
                                    <Picker.Item label="Favourites" value="favorites" />
                                </Picker>
                            </View>
                            <View style={styles.searchView}>
                                <TextInput
                                    placeholder='Search...'
                                    onChangeText={(text) => handleSearch(text)}
                                    style={{ flex: 1 }}
                                />
                                <Icon name='search' size={20} color='#7F7F7F' style={{ paddingTop: 10, paddingRight: 5 }} />
                            </View>
                        </View>
                        {   
                            chats && chats.length > 0 ? 
                                <FlatList
                                    data={chats}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => removeNewMessage(item)}>
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
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                : null
                        }
                        {
                           chats && chats.length > 30 ?
                            <View style={{alignItems:'center', width: '100%'}}>
                                <TouchableHighlight style={{ height: 40, width: 100, backgroundColor: '#10A2EF', marginTop: 15, alignItems: 'center', borderRadius: 10 }} onPress={() => { this.loadMoreMessages(15) }}>
                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold', alignSelf: 'center', marginTop: 8 }}>Load More</Text>
                                </TouchableHighlight>
                            </View>
                            :null
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </DrawerWrapper>
    )
}
const mapStateToProps = state => {
    return {
        token: state.LoginUser.userToken,
        review: state.addRoot,
        profileData: state.userProfile.profiledata,
        id: state.LoginUser.user_id,

    };
};
const styles = StyleSheet.create({
    inboxEach: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        // justifyContent: 'space-between',
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
});
export default connect(mapStateToProps)(ChatList);