import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Dimensions,
    Alert,
    ScrollView,
    PermissionsAndroid,
    Button,
    Picker,
    Keyboard,
    Linking,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
window.navigator.userAgent = 'react-native';
import FilePickerManager from 'react-native-file-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sendMessage, eventRead, eventTyping, loadMoreChat, getChats, rejectCustomOffer, uploadFile, blockUserService, favUserService, getRoots, sendCustomOfferService, withdrawOffer } from '../../services/ChatList';
import { getPreviousChats } from '../../services/ChatList';
import { regex_service } from '../../services/home/index'
import { Rating, AirbnbRating } from 'react-native-elements';
import Icon from "react-native-vector-icons/Entypo";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob'
import { widthPercentageToDP, heightPercentageToDP, moderateScale } from '../../commons/responsive_design';
import Video from 'react-native-video';
import { getFinalPriceService } from '../../services/payments/payments'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { RNVoiceRecorder } from 'react-native-voice-recorder'
import Player from '../../components/player'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ParsedText from 'react-native-parsed-text';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
const width = Dimensions.get('window').width
let offsetNum = 30;

class TranChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myMessage: '',
            messages: [],
            isTyping: false,
            conversation_id: this.props.user.conversation_id,
            timeZone: this.props.user.timezone,
            token: this.props.token,
            showEmoticons: false,
            profilePhoto: '',
            isVisible: false,
            isWaterMarkModalVisible: false,
            customRoots: [],
            regex: [],
            blockUserAlert: false,
            isSecondModalVisible: false,
            offer_details: '',
            selectedDaysForOffer: '',
            offerPrice: '',
            selectedOffer: '',
            isRead: false,
            offerRejected: false,
            withWaterMark: false,
            withoutWaterMark: false,
            imagePreview: false,
            fileResponse: '',
            imagePath: '',
            chat_id: '',
            updated: false,
            offerWithdrawn: false,
            blocked: this.props.user.blocked_by && this.props.user.blocked_by.some(id => id == this.props.id) ? true : false,
            reportAbuseAlert: false,
            violation: false,
            addedToFavourites: this.props.user.favourite_by && this.props.user.favourite_by.some(id => id == this.props.id) ? true : false,
            activeRootCount: 0,
            userLogOut: false,
            userOnline: this.props.user.is_online_class == 'green' ? true : false,
            lastSeenValue: moment(new Date()).fromNow(),
            curTime: moment(new Date()).format("hh:mm A"),
            uploaded: false,
            isViolation: false,
            scroll: false,
            videoPaused: [],
            customOfferVisible: false,
            isvoiceRecord:false,
            isvoiceSend: false,
            fileName: [],
            isTouch: false,
            last_ping_time: ''
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.scrollToBottom.bind(this));
    }

    componentDidMount = async () => {
        console.log("propsssssssssssssssss", this.props.user)
        const messagesArray = this.state.messages;
        let socket = global.socket;
        socket.on('user_message', (data) => {
            const userMessage = JSON.parse(data)
            if (userMessage.type == "chat") {
                messagesArray.push({
                    message: userMessage.data.message_text,
                    from_id: userMessage.data.from_user_id,
                    name: userMessage.data.name,
                    data: userMessage.data && userMessage.data.data && userMessage.data.data.root_id ? userMessage.data.data : '',
                    file: userMessage.data && userMessage.data.data && userMessage.data.data.file_name ? userMessage.data.data : '',
                    created_at: userMessage.data.created_at,
                    profile: userMessage.data.profile
                })
                this.setState({
                    messages: messagesArray,
                    isTyping: false
                }, ()=>{
                    eventRead(userMessage.data.conversation_id, userMessage.data.message_text, this.props.token)
                })
            } else if (userMessage.type == "chat_event_typing") {
                this.setState({ isTyping: true, chat_id: userMessage.data.conversation_id }, () => {
                    setTimeout(() => {
                        this.setState({isTyping: false});
                        }, 6000);
                })
            } else if (userMessage.type == "chat_event_read") {
                if (userMessage.data.conversation_id == this.state.conversation_id) {
                    this.state.messages.map(item => {
                        return item.isRead = 1
                    })
                    this.setState({ isRead: true })
                }
            } else if (userMessage.type == "user_login") {
                if (userMessage.data.user_id == this.props.user.id) {
                    this.setState({ userOnline: true, userLogOut: false })
                }
            } else if (userMessage.type == "user_logout") {
                if (userMessage.data.user_id == this.props.user.id) {
                    this.setState({ lastSeenValue: moment(new Date()).format("hh:mm A") })
                    this.setState({ userOnline: false, userLogOut: true })
                }
            }
        })
        let chats = await getChats(this.state.conversation_id, this.props.token);
        if (chats.status==1){
            eventRead(this.state.conversation_id, this.props.token)
            for (let i = 0; i < chats.data.length; i++) {
                messagesArray.push({
                    message: chats.data[i].message,
                    from_id: chats.data[i].from_user_id,
                    name: chats.data[i].name,
                    data: chats.data[i] && chats.data[i].data && chats.data[i].data.root_id ? chats.data[i].data : '',
                    file: chats.data[i] && chats.data[i].data && chats.data[i].data.file_name ? chats.data[i].data : '',
                    video: chats.data[i] && chats.data[i].data && chats.data[i].data.type == "video/mp4" ? chats.data[i].data : '',
                    created_at: chats.data[i].created_at,
                    profile: chats.data[i].profile,
                    isRead: chats.data[i].read_by_status
                })
            }
            this.setState({
                messages: messagesArray
            })
        }
        if (this.props.type == 0) {
            let rootsArray = []
            let customOfferRoots = await getRoots(this.props.token);
            this.setState({ activeRootCount: customOfferRoots.data.activeRootCount })
            for (let i = 0; i < customOfferRoots.data.data.length; i++) {
                rootsArray.push(customOfferRoots.data.data[i])
            }

            this.setState({
                customRoots: rootsArray
            })
        }
        let regex = await regex_service(this.props.token)
        let arr = regex.data
        this.setState({ regex: arr })
        setInterval(() => {
            this.setState({
                curTime: moment(new Date()).format("hh:mm A")
            });
            this.getChats()
        }, 6000)

    }
    getAllChat = async() => {
        let messagesArray = [];
        let chats = await getChats(this.state.conversation_id, this.props.token);
        if (chats.status==1){
            // eventRead(this.state.conversation_id, this.props.token)
            for (let i = 0; i < chats.data.length; i++) {
                messagesArray.push({
                    message: chats.data[i].message,
                    from_id: chats.data[i].from_user_id,
                    name: chats.data[i].name,
                    data: chats.data[i] && chats.data[i].data && chats.data[i].data.root_id ? chats.data[i].data : '',
                    file: chats.data[i] && chats.data[i].data && chats.data[i].data.file_name ? chats.data[i].data : '',
                    video: chats.data[i] && chats.data[i].data && chats.data[i].data.type == "video/mp4" ? chats.data[i].data : '',
                    created_at: chats.data[i].created_at,
                    profile: chats.data[i].profile,
                    isRead: chats.data[i].read_by_status
                })
            }
            this.setState({
                messages: messagesArray
            })
        }
    }
    
    getChats = async () => {
        let response = await getPreviousChats(this.props.token, '');
        console.log("response.data",response.data)
        response.data.map((res,index) => {
            if (res.conversation_id == this.state.conversation_id){
                this.setState({last_ping_time: res.last_ping_time})
            }
        })
    }
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
    }
    setOfferDetail = (text) => {
        this.setState({ offer_details: text })
    }

    setDays = (text) => {
        this.setState({ selectedDaysForOffer: text })
    }

    setPrice = (text) => {
        this.setState({ offerPrice: text })
    }

    checkViolation = (msg) => {
        for (let i = 4; i < this.state.regex.length; i++) {
            let isMatch = eval(this.state.regex[i]).test(msg.toLowerCase())
            if (isMatch) {
                return true;
            }
        }
    }
    getFinalPrice = async(finalPrice) => {
        const getPrice = await getFinalPriceService(this.props.token, finalPrice);
        let realPrice = getPrice.data;
        this.setState({realPrice: realPrice})
        console.log("getPrice================",getPrice.data);
        // return realPrice;
    } 
    onSend = async (myMessage) => {
        const violation = this.checkViolation(myMessage);
        if (violation) {
            return Alert.alert(
                'Warning',
                'You are trying to share a contact details. this will cause your account to be suspended. If you need those details to be used for a purchased order, you can send it from the order page',
                [
                    { text: 'OK', onPress: () => console.log("...") },
                ],
                { cancelable: false },
            );
        } else {
            if (myMessage == '') {
                Alert.alert('Please type something...')
            } else {
                const newMessages = this.state.messages;
                newMessages.push({
                    message: myMessage,
                    from_id: this.props.id,
                    profile: this.props.profile,
                    created_at: 'just now',
                    isRead: 0
                });
                this.setState({
                    messages: newMessages,
                    myMessage: '',
                    scroll: false
                })
                await sendMessage(this.state.conversation_id, myMessage, this.props.token)
                this.setState({isRead:false});
            }
        }
    }
    handleUrlPress = (url, matchIndex /*: number*/) => {
        Linking.openURL(url);
    }
    showMessage = () => {
        return this.state.messages.map((item, index) => {
            if (item) {
                if (!item.file && !item.data && !item.video) { //simple message
                    return (
                        <View key={index} style={
                            item.from_id === this.props.id ? styles.messageMe : styles.messageUser
                        }>
                            {item.from_id == this.props.id ?
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                            <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>Me  </Text>
                                            <Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', maxWidth: 200 }}>
                                            <ParsedText
                                                style={item.from_id === this.props.id ? styles.textMessageMe : styles.textMessageUser}
                                                parse={[{type: 'url',                       style: styles.url, onPress: this.handleUrlPress}]}
                                                childrenProps={{allowFontScaling: false}}
                                            >
                                                {item.message}
                                            </ParsedText>
                                            {/* <Text style={item.from_id === this.props.id ? styles.textMessageMe : styles.textMessageUser}>{item.message}</Text> */}
                                        </View>
                                        {item.isRead == 1 ? <Icon style={{ alignSelf: 'flex-end' }} name="check" color='#10A2EF' size={15} /> : null}
                                    </View>
                                    <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.profile }} />
                                </View>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.user.profile }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}><Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>{item.name}  </Text><Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text></View>
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', maxWidth: 200 }}>
                                            <ParsedText
                                                style={item.from_id === this.props.id ? styles.textMessageMe : styles.textMessageUser}
                                                parse={[{type: 'url',                       style: styles.url, onPress: this.handleUrlPress}]}
                                                childrenProps={{allowFontScaling: false}}
                                            >
                                                {item.message}
                                            </ParsedText>
                                            {/* <Text style={item.from_id === this.props.id ? styles.textMessageMe : styles.textMessageUser}>{item.message}</Text> */}
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    );
                } else if (item.file && !item.video) { //images
                    if (item.file.type == 'image/jpeg' || item.file.type == 'image/png') {
                        return (
                            <View key={index} style={
                                item.from_id === this.props.id ? styles.messageMe : styles.messageUser
                            }>
                                {item.from_id == this.props.id
                                    ?
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                    <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>Me  </Text>
                                                    <Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { this.setState({ imagePreview: true, imagePath: 'https://cdn.talentsroot.com/upload/chat/' + item.file.file_name }) }}>
                                                    <Image source={{ uri: 'https://cdn.talentsroot.com/upload/chat/' + item.file.file_name }}
                                                        style={item.from_id === this.props.id ? styles.messageMeImage : styles.messageUserImage} />
                                                </TouchableOpacity>
                                            </View>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.profile }} />
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.downloadFilePermission(item.file)}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon name="download" color='black' size={25} />
                                                    <Text numberOfLines={1} ellipsizeMode='head' style={{ alignSelf: 'flex-end', width: 180 }}>
                                                        {item.file.name}
                                                        ({item.file.size && (parseFloat(item.file.size / 1000000).toFixed(2) + 'MB')})
                                                    </Text>
                                                    <Text></Text>
                                                </View>
                                            </TouchableOpacity>
                                            {item.isRead == 1 ? <Icon style={{ alignSelf: 'flex-end' }} name="check" color='#10A2EF' size={15} /> : null}
                                        </View>
                                    </>
                                    :
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.user.profile }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>{item.name}  </Text><Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { this.setState({ imagePreview: true, imagePath: 'https://cdn.talentsroot.com/upload/chat/' + item.file.file_name }) }}>
                                                    <Image source={{ uri: 'https://cdn.talentsroot.com/upload/chat/' + item.file.file_name }}
                                                        style={item.from_id === this.props.id ? styles.messageMeImage : styles.messageUserImage} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <TouchableOpacity onPress={() => this.downloadFilePermission(item.file)}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Icon name="download" color='black' size={25} />
                                                    <Text numberOfLines={1} ellipsizeMode='head' style={{ alignSelf: 'flex-end', width: 180 }}>{item.file.name}({(parseFloat(item.file.size / 1000000).toFixed(2) + 'MB')})</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                }
                            </View>
                        )
                    }
                    else if (item.file.type == 'audio/wav') {
                        return (
                            <View key={index} style={
                                item.from_id === this.props.id ? styles.messageMe : styles.messageUser
                            }>
                                {item.from_id == this.props.id
                                    ?
                                        <View style={{ flexDirection: 'row'}}>
                                            <View style={{flexDirection:'column'}}>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                    <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>Me  </Text>
                                                    <Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                                </View>
                                                <View style={{width:widthPercentageToDP(70), height: heightPercentageToDP(8)}}>
                                                    <Player
                                                        url={'https://cdn.talentsroot.com/upload/chat/'+item.file.file_name} 
                                                        // recordPermission={()=>this.getFile(item.file, index)}
                                                    />
                                                </View>
                                                {item.isRead == 1 ? <Icon style={{ alignSelf: 'flex-end' }} name="check" color='#10A2EF' size={15} /> : null}
                                            </View>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.profile }} />
                                        </View>
                                    :
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.user.profile }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>{item.name}  </Text><Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                                </View>
                                                <View style={{width:widthPercentageToDP(70), height: heightPercentageToDP(8)}}>
                                                    <Player
                                                        url={'https://cdn.talentsroot.com/upload/chat/'+item.file.file_name} 
                                                        // recordPermission={()=>this.getFile(item.file, index)}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                }
                            </View>
                        )
                    }
                    else if (!item.data) { //files
                        return (
                            <View key={index} style={
                                item.from_id === this.props.id ? styles.messageMe : styles.messageUser
                            }>
                                {item.from_id == this.props.id
                                    ?
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                    <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>Me  </Text>
                                                    <Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                                </View>
                                                <TouchableOpacity style={item.from_id === this.props.id ? styles.fileMe : styles.fileUser} onPress={() => this.downloadFilePermission(item.file)}>
                                                    <Icon name="download" color='black' size={25} />
                                                    <View style={{ maxWidth: 200 }}>
                                                        <Text numberOfLines={1} ellipsizeMode='head' style={{ alignSelf: 'flex-end' }}>
                                                            {item.file.name}
                                                            ({item.file.size && (parseFloat(item.file.size / 1000000).toFixed(2) + 'MB')})
                                                    </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                {item.isRead == 1 ? <Icon style={{ alignSelf: 'flex-end' }} name="check" color='#10A2EF' size={15} /> : null}
                                            </View>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.profile }} />
                                        </View>

                                    </>
                                    :
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.user.profile }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>{item.name}  </Text><Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                                </View>
                                                <TouchableOpacity style={item.from_id === this.props.id ? styles.fileMe : styles.fileUser} onPress={() => this.downloadFilePermission(item.file)}>
                                                    <Icon name="download" color='white' size={25} />
                                                    <Text numberOfLines={1} ellipsizeMode='head' style={{ alignSelf: 'flex-end', width: 180 }}>{item.file.name}({(parseFloat(item.file.size / 1000000).toFixed(2) + 'MB')})</Text>
                                                </TouchableOpacity>
                                            </View></View>
                                        <View>
                                        </View></>
                                }
                            </View>
                        )
                    }
                } else if (item.data) { //custom offer
                    if (item.message == "Custom Offer"){
                        console.log("newitem===========",item.data)
                        console.log("newitemmmmmmmmmmmm===========",item.data.status)
                        if (item.data.status === 0) {
                            console.log("I am here")
                        }
                    }
                    return (
                        <View key={index} style={{ flexDirection: 'row' },
                            item.from_id === this.props.id ? styles.messageMe : styles.messageUser
                        }>
                            {item.from_id == this.props.id ?<>
                                <View style={{ flexDirection: 'row' }, item.from_id === this.props.id ? styles.offerMe : styles.offerUser}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 20 }}>Custom Offer</Text>
                                        <Text>{item.data.r_title}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold' }}>Description: </Text>
                                            <Text style={{ width: 100 }}>{item.data.description}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold' }}>Delivery: </Text>
                                            <Text>{item.data.delivery + 'Day(s)'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold' }}>Amount: </Text>
                                            <Text>{'$' + item.data.amount}</Text>
                                        </View>
                                        {item.data.status === 0? 
                                            <Button style={{ height: 25, width: 50, borderRadius: 10, color: 'lightred', marginTop: 15 }} title="Withdraw" onPress={() => this.withdrawCustomOffer(item.data.id)} />
                                            :
                                            <Text style={{ color: 'black' }}>{item.data.status_text}</Text>
                                        }
                                        
                                    </View>
                                </View>
                                    {item.isRead == 1 ? <Icon style={{ alignSelf: 'flex-end' }} name="check" color='#10A2EF' size={15} /> : null}</>
                                :
                                <View style={{ flexDirection: 'row' }, item.from_id === this.props.id ? styles.offerMe : styles.offerUser}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>Custom Offer</Text>
                                        <Text style={{ color: 'white' }}>{item.data.r_title}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Description: </Text>
                                            <Text style={{ color: 'white' }}>{item.data.description}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Delivery: </Text>
                                            <Text style={{ color: 'white' }}>{item.data.delivery + 'Day(s)'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Amount: </Text>
                                            <Text style={{ color: 'white' }}>{'$' + item.data.amount}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            {item.data.status !== 0? 
                                            <Text style={{ color: 'white', marginTop: 5 }}>{item.data.status_text}</Text> 
                                            :
                                                <>
                                                <TouchableOpacity style={{ height: 30, width: 70, backgroundColor: 'green', marginTop: 15, alignItems: 'center', borderRadius: 10 }} onPress={async() => {
                                                    await this.getFinalPrice(item.data.amount);
                                                    this.props.navigation.navigate('PaymentScreen',
                                                    {
                                                        rootDetails: {
                                                            r_image: item.profile,
                                                            r_title: item.data.r_title,
                                                            username: item.name,
                                                            final_price: item.data.amount,
                                                            processing_fees: this.state.realPrice.processingPrice,
                                                            r_user_id: item.rf_r_id,
                                                            r_id: item.rf_id,
                                                            days: item.data.delivery,
                                                            delivery_days: item.data.delivery,
                                                            orderId: this.state.realPrice.orderID,
                                                            packagePrice: this.state.realPrice.packagePrice,
                                                            used_balance: this.state.realPrice.usedBalance,
                                                            total: this.state.realPrice.finalprice,
                                                        }
                                                    }
                                                )}} >
                                                    <Text style={{ color: 'white', marginTop: 5 }}>{"Accept"}</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ height: 30, width: 70, backgroundColor: 'red', marginTop: 15, alignItems: 'center', marginLeft: 10, borderRadius: 10 }} onPress={() => this.rejectCustomOffer(item.data.id)}>
                                                    {!this.state.rejeted && <Text style={{ color: 'white', marginTop: 5 }}>{item.data.status_text ? item.data.status_text : 'Reject'}</Text>}
                                                    {/* {this.state.offerRejected ? <Text style={{ color: 'white', marginTop: 5 }}>Rejected</Text> : null} */}
                                                </TouchableOpacity>
                                                </>
                                            }
                                        </View>
                                    </View>
                                </View>
                            }

                        </View>
                    )
                } else if (item.video) {
                    return (
                        <View key={index} style={
                            item.from_id === this.props.id ? styles.messageMe : styles.messageUser
                        }>
                            {item.from_id == this.props.id
                                ?
                                <>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>Me</Text>
                                                <Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                            </View>
                                            <View style={styles.videoContainer}>
                                                <Video
                                                    source={{ uri: 'https://cdn.talentsroot.com/upload/chat/' + item.video.file_name }}
                                                    ref={(ref) => {
                                                        this._player = ref
                                                    }} 
                                                    onLoad={(e) => {
                                                        let clonevideoPaused = [...this.state.videoPaused];
                                                        clonevideoPaused[index] = true
                                                        this.setState({ videoPaused: clonevideoPaused })}}
                                                    paused={this.state.videoPaused[index]}
                                                    controls={true}
                                                    resizeMode={'contain'}
                                                    muted={false}
                                                    style={styles.video}
                                                />
                                            </View>
                                        </View>
                                        <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.profile }} />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.downloadFilePermission(item.file)}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon name="download" color='black' size={25} />
                                                <Text numberOfLines={1} ellipsizeMode='head' style={{ alignSelf: 'flex-end', width: 200 }}>
                                                    {item.file.name}
                                                    ({item.file.size && (parseFloat(item.file.size / 1000000).toFixed(2) + 'MB')})
                                                </Text>
                                                <Text></Text>
                                            </View>
                                        </TouchableOpacity>
                                        {item.isRead == 1 ? <Icon style={{ alignSelf: 'flex-end' }} name="check" color='#10A2EF' size={15} /> : null}
                                    </View>
                                </>
                                :
                                <>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.props.user.profile }} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: '#7F7F7F', fontWeight: 'bold' }}>{item.name}</Text><Text style={{ color: '#7F7F7F' }}>{item.created_at}</Text>
                                            </View>
                                            <View style={styles.videoContainer}>
                                                <Video
                                                    source={{ uri: 'https://cdn.talentsroot.com/upload/chat/' + item.video.file_name }}
                                                    ref={(ref) => {
                                                        this._player = ref
                                                    }}
                                                    onLoad={(e) => {
                                                        let clonevideoPaused = [...this.state.videoPaused];
                                                        clonevideoPaused[index] = true
                                                        this.setState({ videoPaused: clonevideoPaused })}}
                                                    paused={this.state.videoPaused[index]}
                                                    controls={true}
                                                    resizeMode={'contain'}
                                                    muted={true}
                                                    style={styles.video} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <TouchableOpacity onPress={() => this.downloadFilePermission(item.file)}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon name="download" color='black' size={25} />
                                                <Text numberOfLines={1} ellipsizeMode='head' style={{ alignSelf: 'flex-end', width: 200 }}>{item.file.name}({(parseFloat(item.file.size / 1000000).toFixed(2) + 'MB')})</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </View >
                    )
                }
            }

        });
    }
    customOffer = async() => {

    }
    rejectCustomOffer = async (offerId) => {
        let response = await rejectCustomOffer(offerId, this.props.token, 0)
        console.log("rejected",response)
        if (response.status == 1) {
            Alert.alert("Offer Rejected")
            this.setState({ offerRejected: true });
            this.getAllChat();
        } else {
            Alert.alert("Something went wrong please try again later")
        }
    }

    withdrawCustomOffer = async (offerId) => {

        return Alert.alert(
            'Confirm',
            'Are you sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.withdrawConfirm(offerId) },
            ],
            { cancelable: false },
        );
    }

    withdrawConfirm = async (offerId) => {
        let response = await withdrawOffer(offerId, this.props.token, 1)
        if (response.status == 1) {
            Alert.alert("Withdrawn")
            this.getAllChat();
        } else {
            Alert.alert("Something went wrong please try again later")
        }
    }

    downloadFile = (file) => {
        this.setState({ uploaded: true })
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob
            .config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    mediaScannable: true,
                    title: file.file_name,
                    mime: file.type,
                    path: dirs.DownloadDir + file.file_name,
                },
            })
            .fetch('GET', 'https://cdn.talentsroot.com/upload/chat/' + file.file_name, {
                //some headers ..
            })
            .then((res) => {
                this.setState({ uploaded: false })
                Alert.alert('File Downloaded Successfully to', res.path());
            })
    }

    downloadFilePermission = async (file) => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.downloadFile(file);
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        } catch (err) {
            console.warn(err);
        }
    }
   
    voiceSend = async() => {
        let isvoice = true;
        this.setState({ isvoiceSend:false, uploaded: true })
        let res = await uploadFile(this.state.recordingPath, this.state.conversation_id, 0, this.props.token, isvoice);
        const fileUpload = this.state.messages;
        fileUpload.push({
            message: res.data && res.data.message ? res.data.message : '',
            from_id: res.data.from_user_id,
            file: {
                name: res.data.data.name,
                file_name: res.data.data.file_name,
                type: res.data.data.type,
                size: this.state.docSize
            },
            name: res.data.name,
            created_at: res.data.created_at
        })
        this.setState({ messages: fileUpload, uploaded: false })
        this.setState({uploaded:false})
    }
    recordStart = () => {
        this.setState({isvoiceRecord: false} , ()=>{
            RNVoiceRecorder.Record({
                format: 'wav',
                onDone: (path) => {
                    this.setState({recordingPath : path});
                    this.setState({isvoiceSend: true})
                },
                onCancel: () => {
                    console.log('on cancel')
                }
            })
        })
    }

    uploadFile = async () => {
        FilePickerManager.showFilePicker(null, async (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                if (response.type == "image/jpeg") {
                    this.setState({ isWaterMarkModalVisible: true, fileResponse: response, docSize: response.size })
                }
                else {
                    this.setState({ docSize: response.size })
                    this.uploadDocument(response)
                }
            }
        });
    }

    uploadWithWaterMark = async (response) => {
        this.setState({ isWaterMarkModalVisible: false, uploaded: true })
        let res = await uploadFile(response, this.state.conversation_id, 1, this.props.token)
        const fileUpload = this.state.messages;
        fileUpload.push({
            message: res.data && res.data.message ? res.data.message : '',
            from_id: res.data.from_user_id,
            file: {
                name: res.data.data.name,
                file_name: res.data.data.file_name,
                type: res.data.data.type,
                size: this.state.docSize
            },
            name: res.data.name,
            created_at: res.data.created_at
        })
        this.setState({ messages: fileUpload, uploaded: false })
    }

    uploadWithoutWaterMark = async (response) => {
        this.setState({ isWaterMarkModalVisible: false, uploaded: true })
        let res = await uploadFile(response, this.state.conversation_id, 0, this.props.token)
        const fileUpload = this.state.messages;
        fileUpload.push({
            message: res.data && res.data.message ? res.data.message : '',
            from_id: res.data.from_user_id,
            file: {
                name: res.data.data.name,
                file_name: res.data.data.file_name,
                type: res.data.data.type,
                size: this.state.docSize
            },
            name: res.data.name,
            created_at: res.data.created_at
        })
        this.setState({ messages: fileUpload, uploaded: false })
    }

    uploadDocument = async (response) => {
        this.setState({ uploaded: true })
        console.log("here")
        let res = await uploadFile(response, this.state.conversation_id, 1, this.props.token)
        console.log("uploadresutl=========",res)
        const fileUpload = this.state.messages;
        fileUpload.push({
            message: res.data && res.data.message ? res.data.message : '',
            from_id: res.data.from_user_id,
            file: {
                name: res.data.data.name,
                file_name: res.data.data.file_name,
                type: res.data.data.type,
                size: this.state.docSize
            },
            name: res.data.name,
            created_at: res.data.created_at,
            video: {
                file_name: res.data.data.type == "video/mp4" ? res.data.data.file_name : '',
            }

        })
        this.setState({ messages: fileUpload, uploaded: false })
    }

    blockUser = async () => {
        return Alert.alert(
            'Confirm',
            'Are you sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.blockConfirm() },
            ],
            { cancelable: false },
        );
    }

    blockConfirm = async () => {
        let res = await blockUserService(this.state.conversation_id, 0, this.props.token);
        if (res.status == 1) {
            Alert.alert("User blocked");
            this.setState({ blocked: !this.state.blocked })
        } else {
            Alert.alert("Something went wrong, Please try again later");
        }

    }

    favouriteUser = async () => {
        return Alert.alert(
            'Confirm',
            'Are you sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.confirmFavourite() },
            ],
            { cancelable: false },
        );
    }

    confirmFavourite = async () => {
        // this.setState({})
        let res = await favUserService(this.state.conversation_id, this.props.token)
        if (res.status == 1) {
            this.setState({ addedToFavourites: !this.state.addedToFavourites })
            Alert.alert(res.message);
        } else {
            Alert.alert("something went wrong please try again later");
        }
    }

    reportAbuse = async () => {
        Alert.alert(
            'Are you sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.setState({ reportAbuseAlert: true }) },
            ],
            { cancelable: false },
        );
        if (reportAbuseAlert) {
            let res = await blockUserService(this.props.user.id, 1, this.props.token)
            if (res.status == 1) {
                Alert.alert("User reported abuse")
            }
        }
    }
    
    loadMoreMessages = async () => {
        let chats = await loadMoreChat(this.state.conversation_id, this.props.token, offsetNum);
        if (chats.status == 1){
            offsetNum = chats.offset
        }
        let messagesArray = []
        for (let i = 0; i < chats.data.length; i++) {
            messagesArray.push({
                message: chats.data[i].message,
                from_id: chats.data[i].from_user_id,
                name: chats.data[i].name,
                data: chats.data[i] && chats.data[i].data && chats.data[i].data.root_id ? chats.data[i].data : '',
                file: chats.data[i] && chats.data[i].data && chats.data[i].data.file_name ? chats.data[i].data : '',
                created_at: chats.data[i].created_at,
                profile: chats.data[i].profile,
                isRead: chats.data[i].read_by_status
            })
        }
        
        this.setState(prevState => ({
            messages: [...messagesArray, ...prevState.messages],
            scroll: true
        }));
    }

    scrollToBottom = () => {
        this._scrollView.scrollToEnd({animated: true});
    }
    
    getUserProfile = async (token, userId) => {
        const requestData = {
          token,
          user_id: userId
        }
        const response = await profile_service(requestData);
        if (response.status === 1) {
            return response.data
        }
    }

    render() {
        return (
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styles.mainContainer}>
                <View style={styles.header_container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={() => { this.props.navigation.navigate('ChatList') }}>
                            <Icon name="chevron-left" color='#10A2EF' size={27} style={{ paddingLeft: 5, marginTop: 10 }} />
                        </TouchableOpacity>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: this.state.userOnline ? '#2EC09C' : 'red', height: 10, width: 10, borderRadius: 100, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}></View>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { user_id: this.props.user.id }) }}>
                                    <Text numberOfLines={1} style={styles.user_name}>{this.props.user.name}</Text>
                                </TouchableOpacity>
                                {this.state.addedToFavourites ? <><Icon name="heart" color='red' size={15} style={{ marginTop: 8, marginLeft: 4 }} /></> : null}
                                {this.props.user.rating_count == 0 ? null :
                                    <>
                                        <Rating
                                            imageSize={18}
                                            readonly
                                            startingValue={1}
                                            ratingCount={1}
                                            style={{ marginLeft: 10 }}
                                        />
                                        <Text style={{ color: '#f1c40f', fontSize: 15 }}>{this.props.user.rating}</Text>
                                        <Text style={{ color: 'black', fontSize: 15, marginLeft: 5 }}>{'(' + this.props.user.rating_count + ')'}</Text>
                                    </>}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {!this.state.userOnline ?
                                    <>
                                        <View style={styles.headerItem}>
                                            <Text style={{ fontSize: 12 }}>Last Seen :</Text>
                                            <Text style={{ fontSize: 12 }}>{this.state.userLogOut
                                                ? this.state.lastSeenValue
                                                : typeof (this.props.user.last_ping_time) == 'string' ?
                                                    this.state.last_ping_time == ''?
                                                    this.props.user.last_ping_time
                                                    :
                                                    this.state.last_ping_time
                                                    :
                                                    moment.unix(this.props.user.last_ping_time).fromNow()}
                                            </Text>
                                        </View>
                                    </>
                                    : <View>{}</View>}
                                <View style={styles.headerItem}>
                                    <Text style={{ fontSize: 12 }}>Local Time :</Text>
                                    <Text style={{ fontSize: 12, paddingLeft: 2 }}>{this.state.curTime}</Text>
                                </View>
                                {/* <Image style={{ marginLeft: 5, height: 15, width: 20 }} source={{ uri: this.props.user_data.flag }} /> */}
                            </View>
                        </View>
                        <Menu
                            style={{ alignSelf: 'center' }}
                        >
                            <MenuTrigger>
                                <Icon name="dots-three-vertical" color='grey' size={25} style={{ paddingHorizontal: 7, marginTop:20 }} /></MenuTrigger>
                            <MenuOptions>
                                <MenuOption
                                    style={styles.modalItemStyle}
                                    onSelect={() => this.blockUser()} >
                                    <>
                                        <Icon name={this.state.blocked ? 'check' : 'block'} color='grey' size={15}/>
                                        <Text style={styles.menuItemText}>{this.state.blocked ? 'Unblock' : "Block"}    </Text>
                                    </>
                                </MenuOption>
                                <MenuOption
                                    style={styles.modalItemStyle}
                                    onSelect={() => this.favouriteUser()} >
                                    <>
                                        <Icon name='heart' color='grey' size={15}/>
                                        <Text style={styles.menuItemText}>{this.state.addedToFavourites ? 'Remove from favourite' : "Add To Favourites"}    </Text>
                                    </>
                                </MenuOption>
                                <MenuOption
                                    style={styles.modalItemStyle}
                                    onSelect={() => this.reportAbuse()}>
                                    <>
                                        <FontAwesome name='exclamation-circle' color='grey' size={15} style={{ flex: 1 }} />
                                        <Text style={styles.menuItemText}>Report Abuse</Text>
                                    </>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>              
                <View>
                    {/* watermark model */}
                    <Modal
                        visible={this.state.isWaterMarkModalVisible}
                        animationType={"fade"}
                        // transparent={true}
                        deviceWidth={widthPercentageToDP(100)}
                        deviceHeight={heightPercentageToDP(100)}
                    >
                        {/*All views of Modal*/}
                        <View style={{ 
                            flexDirection: 'row', 
                            padding: 20, 
                            alignContent: 'center', 
                            alignSelf: 'center', 
                            backgroundColor: 'white', 
                            borderWidth:1, 
                            borderColor: '#7F7F7F', 
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 0.41,
                            shadowRadius: 9.11,
                            elevation: 14,}}>
                            <TouchableOpacity onPress={() => this.setState({isWaterMarkModalVisible:false})} style={{position:'absolute', top:5, right:5}}>
                                <MaterialCommunityIcons name='close-circle-outline' color='#7F7F7F' size={30}/>
                            </TouchableOpacity>
                            <View>
                                <Image style={{ height: 150, width: 150 }} source={{ uri: this.state.fileResponse.uri }} />
                            </View>
                            <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                <TouchableHighlight style={styles.waterMarkModel} onPress={() => this.uploadWithWaterMark(this.state.fileResponse)}>
                                    <Text style={{ color: 'white', }}>With Watermark</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.waterMarkModel, { marginTop: 10 }]} onPress={() => this.uploadWithoutWaterMark(this.state.fileResponse)}>
                                    <Text style={{ color: 'white', }}>Without Watermark</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text>{this.state.fileResponse.file_name}</Text>
                        </View>
                    </Modal>
                </View>
                {/* loading modal */}
                <Modal
                    isVisible={this.state.uploaded}
                    animationType={"fade"}
                    transparent={true}
                    deviceWidth={widthPercentageToDP(100)}
                    deviceHeight={heightPercentageToDP(100)}
                >
                    {/*All views of Modal*/}
                    <View style={styles.modal}>
                        <ActivityIndicator size="large" color="#10A2EF" />
                    </View>

                </Modal>
                <View>
                    {/* Image preview model */}
                    <Modal
                        visible={this.state.imagePreview}
                        onRequestClose={() => this.setState({ imagePreview: false })}
                        animationType={"fade"}
                        transparent={true}
                        deviceWidth={widthPercentageToDP(100)}
                        deviceHeight={heightPercentageToDP(100)}
                    >
                        {/*All views of Modal*/}
                        <View style={{ flexDirection: 'column', padding: 20, alignContent: 'center', alignSelf: 'center' }}>
                            <View>
                                <Image style={{ height: 500, width: 500 }} resizeMode={'contain'} source={{ uri: this.state.imagePath }} />
                            </View>
                        </View>
                    </Modal>
                </View>
                <KeyboardAwareScrollView innerRef={ref => this._scrollView = ref} style={{flex:1}}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        eventRead(this.props.user.conversation_id, this.props.token)
                        this.state.scroll ? null : this._scrollView.scrollToEnd({ animated: true });
                    }}
                >
                    <View>
                        {this.state.messages.length >= 15 ? <View style={{ alignItems: 'center' }}>
                            <TouchableHighlight style={{ height: 35, width: 120, backgroundColor: '#10A2EF', marginTop: 15, alignItems: 'center', borderRadius: 10 }} onPress={() => { this.loadMoreMessages(15) }}>
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginTop: 8 }}>Load More...</Text>
                            </TouchableHighlight>
                        </View> : null}
                        {this.showMessage()}
                    </View>
                </KeyboardAwareScrollView>
                {
                    !this.state.blocked
                        ?
                        <View style={{ borderTopWidth: 1, borderTopColor: '#DDD', marginBottom: 10 }}>
                        <>
                            {this.state.chat_id == this.state.conversation_id && this.state.isTyping == true ? <Image resizeMode={'cover'} style={{ height: 10, width: 70 }} source={{ uri: 'https://www.talentsroot.com/images/typing.gif' }} /> : <Text></Text>}
                            <View style={{ flexDirection:'row', marginLeft: (widthPercentageToDP(3))}}>
                                <View style={{width: (widthPercentageToDP(75))}}>
                                    <TextInput
                                        style={styles.textInputOFMessage}
                                        multiline={true}
                                        onChangeText={(text) => { 
                                            eventTyping(this.props.user.conversation_id, this.props.token)
                                            this.setState({ myMessage: text })
                                        }}
                                        onFocus={()=>this.scrollToBottom()}
                                        value={this.state.myMessage}
                                    />
                                    <TouchableOpacity
                                        style={styles.attachmentStyle}
                                        onPress={() => { this.uploadFile() }} >
                                        <FontAwesome name="paperclip" color='#aaa' size={30} style={[{ transform: [{ rotateX: '180deg' }] }]} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, flexDirection:'row', alignContent:'space-around', marginLeft: widthPercentageToDP(1), justifyContent:'center',}}>
                                    <TouchableOpacity style={{justifyContent:'center'}} onPress={() => this.onSend(this.state.myMessage)}>
                                        <MaterialCommunityIcons name='send-circle' color='#10A2EF' size={30}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.setState({isvoiceRecord:true})} style={{justifyContent:'center'}}>
                                        <MaterialCommunityIcons name='microphone' color='#10A2EF' size={30}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                         </View>
                        :
                        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ color: 'red', fontSize: 20 }}>You have blocked this user</Text>
                        </View>
                }
                <View style={styles.popupModal}>
                <Dialog
                    visible={this.state.isvoiceRecord}
                    onTouchOutside={() => this.setState({isvoiceRecord: false})}
                    >
                    <View style={{width: 350, height: 200}}>
                        <Text style={{textAlign:'center', fontSize: 16, marginVertical: 30, marginHorizontal: 10}}>
                            All voice messages are monitored. Any abuse for ToS like sharing contact detail will cause your account to be suspended immediately.
                        </Text>
                        <View style={{flexDirection:'row', justifyContent: 'center', marginHorizontal: 10, marginBottom: 15}}>
                            <TouchableOpacity onPress={this.recordStart} style={{backgroundColor: '#10a2ef', borderRadius: 5, marginRight: 10}}>
                                <Text style={{paddingHorizontal: 20, paddingVertical: 10, color: '#FFF', fontSize: 16}}>
                                    START
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({isvoiceRecord: false})} style={{backgroundColor: '#ff6060',borderRadius: 5}}>
                                <Text style={{paddingHorizontal: 20, paddingVertical: 10, color: '#FFF',  fontSize: 16}}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>
                <Dialog
                    visible={this.state.isvoiceSend}
                    onTouchOutside={() => this.setState({isvoiceSend: false})}
                    >
                    <View style={{width: 350, height: 200}}>
                        <Text style={{textAlign:'center', fontSize: 24, marginVertical: 40, marginHorizontal: 10}}>
                            Confirm
                        </Text>
                        <View style={{flexDirection:'row', justifyContent: 'center', marginHorizontal: 10, marginBottom: 15}}>
                            <TouchableOpacity onPress={this.voiceSend} style={{backgroundColor: '#10a2ef', borderRadius: 5, marginRight: 10}}>
                                <Text style={{paddingHorizontal: 20, paddingVertical: 10, color: '#FFF', fontSize: 16}}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({isvoiceSend: false})} style={{backgroundColor: '#ff6060',borderRadius: 5}}>
                                <Text style={{paddingHorizontal: 20, paddingVertical: 10, color: '#FFF',  fontSize: 16}}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = state => {
    return {
        type: state.LoginUser.type,
        token: state.LoginUser.userToken,
        profile: state.LoginUser.profile,
        profileData: state.userProfile.profiledata,
        id: state.LoginUser.user_id,
        review: state.addRoot,
        regex: state.getRegex
    };
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        marginTop: 50,
        borderWidth: 1,
        borderRadius:10,
        borderColor: '#748f9e'
        // justifyContent: 'space-between',
        // flexDirection: 'column',
    },
    header_container: {
        height: heightPercentageToDP(9),
        backgroundColor: 'white',
        borderRadius:10,
        alignItems: 'center',
        elevation: 1
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 4
    },
    modalItemStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        borderStyle: 'dashed'
    },
    menuItemText: {
        flex: 4,
        fontSize: moderateScale(12)
    },
    attachmentStyle: {
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: widthPercentageToDP(3)
    },
    input: {
        paddingLeft: 15,
        borderWidth: 1,
        marginVertical: '2%',
        borderColor: '#E0E6EE',
        borderRadius: 4,
    },
    avatarContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        overflow: 'hidden',
        borderColor: '#2EAE92',
        borderWidth: 2,
    },
    avatar: {
        flex: 1,
        height: null,
        width: null,
    },
    paddingModal: {
        padding: 10,
        borderRadius: 1,
        borderColor: 'lightgrey',
        borderRadius: 10
    },
    user_name: {
        marginLeft: 5,
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#10A2EF',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        height: 50,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    borderStyle: {
        width: width / 1.1,
        height: 50,
        margin: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 15,
        fontWeight: 'bold',
        width: width / 1.1,
    },
    textInputOFMessage: {
        fontSize: 14,
        backgroundColor: "#F1F2F4",
        borderRadius: 10,
        paddingLeft: widthPercentageToDP(12)
        // marginLeft: widthPercentageToDP(3)
    },
    sendButton: {
        borderWidth: 1,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    modal: {
        backgroundColor: "white",
    },
    secondModal: {
        backgroundColor: "white",
        padding: 10,
    },
    confirm: {
        height: 30,
        width: 120,
        backgroundColor: '#2ec09c',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        padding: 5,
        color: 'white'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    cancel: {
        height: 30,
        width: 120,
        backgroundColor: '#ff6060',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        padding: 5,
        color: 'white'
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    messageUser: {
        alignSelf: 'flex-start',
        padding: 10
    },
    messageMe: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    textMessageMe: {
        color: 'black',
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        padding: 15,
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    textMessageUser: {
        color: 'white',
        backgroundColor: '#10A2EF',
        borderRadius: 20,
        padding: 15,
    },
    messageUserInfo: {
        color: 'white',
        backgroundColor: 'lightgrey',
        alignSelf: 'flex-start',
        padding: 10
    },
    messageMeInfo: {
        color: 'black',
        backgroundColor: '#10A2EF',
        alignSelf: 'flex-end',
    },
    messageUserImage: {
        padding: 15,
        alignSelf: 'flex-start',
        height: 125,
        width: 150,
    },
    messageMeImage: {
        padding: 15,
        alignSelf: 'flex-end',
        height: 125,
        width: 150
    },
    fileMe: {
        color: 'white',
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row'
    },
    fileUser: {
        backgroundColor: '#10A2EF',
        borderRadius: 20,
        padding: 15,
        color: 'white',
        flexDirection: 'row'
    },
    offerMe: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'lightgrey',
        width: 200,
        borderRadius: 20
    },
    videoContainer: {
        height: 250,
        width: 180,
    },
    offerUser: {
        alignSelf: 'flex-start',
        padding: 10,
        backgroundColor: '#10A2EF',
        width: 200,
        color: 'white',
        borderRadius: 20
    },
    waterMarkModel: {
        backgroundColor: 'green',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: 100,
        height: 50,
        marginLeft: 10
    },
    devider: {
        height: 5,
        width: 1,
        backgroundColor: 'lightgrey',
        marginHorizontal: 5
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    popupModal : {
        position:'absolute',
        top: 10,
    },
    url: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
export default connect(mapStateToProps)(TranChatScreen);