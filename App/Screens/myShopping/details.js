import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    CheckBox,
    Image,
    Picker,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
    PermissionsAndroid,
    Alert,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import DrawerWrapper from '../../commons/rightDrawerWrapper';
import OrderSellerReviewCard from '../../commons/orderReviewCard/OrderSellerReviewCard';
import OrderBuyerReviewCard from '../../commons/orderReviewCard/OrderBuyerReviewCard';
import RNFetchBlob from 'rn-fetch-blob'
import Modal from "react-native-modal";
import {
    orderCancel,
    orderActionCancel,
    deliverOrderService,
    extendDeliverTimeService,
    addCustomExtraService,
    orderHistory,
    orderAccept,
    cancelExtendService,
    cancelCustomExtraService,
    submitRating
} from '../../services/order';
import { Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import FilePickerManager from 'react-native-file-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP, heightPercentageToDP } from '../../commons/responsive_design';
import {
  get_conversation
} from '../../services/getConversation';
import TranChatScreen from '../Chat/tranchatScreen';
import moment from 'moment';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'active',
            details: [],
            modalVisible: false,
            messageToSeller: '',
            history: [],
            orderId: this.props.navigation.state.params.orderDetails.o_order_id ? this.props.navigation.state.params.orderDetails.o_order_id : this.props.navigation.state.params.orderDetails.wlt_reference_id,
            sellerId: this.props.navigation.state.params.orderDetails.o_seller_id ? this.props.navigation.state.params.orderDetails.o_seller_id : '',
            buyerId: this.props.navigation.state.params.orderDetails.o_buyer_id ? this.props.navigation.state.params.orderDetails.o_buyer_id : '',
            orderCancelled: false,
            extendModalVisible: false,
            deliverModalVisible: false,
            customModalVisible: false,
            previeModelVisible: false,
            msgToBuyer: '',
            customPrice: '',
            customDays: '',
            deliverMsg: '',
            deliverDays: '',
            extendMsg: '',
            extendDays: '',
            customMsg: '',
            acceptOrderVisible: false,
            requestModificationVisible: false,
            isWaterMarkModalVisible: false,
            fileResponse: [],
            withWatermark: 0,
            loader: false,
            actionState: false,
            deliveryDescription: true,
            imagePath: '',
            orderDelivered: false,
            transactionData: [],
            t_r_title: '',
            t_r_root_image: '',
            t_name: '',
            t_sold_on: '',
            t_order_id: '',
            isSelected: true,
            isAgree: true,
            isNotAgree: false,
            isSellerReview:false,
            isBuyerReview: false

            // orderDeliverySuccess: false
        }
    }

    componentDidMount = async () => {
        this.setState({ loader: true })
        this.focusListener = this.props.navigation.addListener('didFocus', async() => {
            this.setState({ loader: true })
            console.log("this.props.navigation.state.params.orderDetails", this.props.navigation.state.params.orderDetails)
            // this.setState(prevState => ({
            //     details: [...prevState.details, this.props.navigation.state.params.orderDetails]
            // }));
            this.setState({
                details: this.props.navigation.state.params.orderDetails
            });
            console.log("==>>>>>>>>>>>>>>", this.props.navigation.state.params.orderDetails.o_seller_id)
            console.log("==>>>>>>>>>>>>>>", this.props.profileData)
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                this.setState({ loader: false, amount:history.o_amount })
                // arr.push(history.data)
                history.data.r_title && this.setState({ t_r_title: history.data.r_title, t_r_root_image: history.data.rf_file_name, t_name: history.data.username, t_sold_on: history.data.o_created_at, t_order_id: history.data.order_id })
                this.setState({ history: history.data.history })
            }
            this.state.history.map((item) => {
                if (item.type == 0 &&item.data.type == 0) {
                    this.setState({ orderCancel: true, false: true })
                } else if (item.type == 0 &&item.data.type == 3) {
                    this.setState({finalOrderCancel:true})
                } else if (item.type == 0 &&item.data.type == 2) {
                    this.setState({orderAbort:true})
                } else if (item.type == 2) {
                    this.setState({ orderDelivered: true })
                } else if(item.type == 6){
                    this.setState({deliveryDescription: false})
                } else if(item.type == 8 || item.type == 7){
                    this.setState({finalOrderCancel:true})
                } else if (item.type == 4){
                    this.setState({isReviewed:true})
                } else if (item.type == 5){
                    if (item.data.or_to_id == item.data.or_seller_id){
                        this.setState({isBuyerReview: true})
                    }
                    else if (item.data.or_to_id == item.data.or_buyer_id){
                        this.setState({isSellerReview: true})
                    }
                }
                else {
                    this.setState({orderAbort: true})
                }
            })
            const response = await get_conversation(this.props.token, this.props.navigation.state.params.orderDetails.name);
            if (response.status == 1){
                this.setState({user:response.data.opponent})
            }
        })
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }

    removeImage = (content) => {
        let newArr = [];
        this.state.fileResponse.map((item) => {
            if (item != content){
                newArr.push(item)
            }
        })
        console.log("newArr=======", newArr)
        this.setState({fileResponse:newArr})
    }
    acceptOrder = async () => {
        let response = await orderAccept(
            this.props.token,
            this.props.navigation.state.params.orderDetails.o_id
        )
        if (response.status == 1) {
            this.setState({ acceptOrderVisible: false })
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, ()=> {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })

                console.log("this.state.history", this.state.history, this.state.history.length)
            }
            this.setState({ orderCancelled: true })
        } else {
            this.setState({ modalVisible: false })
            Alert.alert("Something went wrong, please try again later")
        }
    }
    cancelOrder = async () => {
        let response = await orderCancel(
            this.props.token,
            this.props.navigation.state.params.orderDetails.o_seller_id,
            this.props.navigation.state.params.orderDetails.o_buyer_id,
            this.state.messageToSeller,
            this.props.navigation.state.params.orderDetails.o_id
        )
        if (response.status == 1) {
            this.setState({ modalVisible: false })
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, ()=> {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })

                console.log("this.state.history", this.state.history, this.state.history.length)
            }
            this.setState({ orderCancelled: true })
        } else {
            this.setState({ modalVisible: false })
            Alert.alert("Something went wrong, please try again later")
        }
    }

    sendCustomExtra = async () => {
        let response = await addCustomExtraService(
            this.props.token,
            this.state.customMsg,
            this.state.customDays,
            this.state.sellerId,
            this.state.buyerId,
            this.state.details.o_id,
            this.state.customPrice
        )
        if (response.status == 1) {
            this.setState({ customModalVisible: false })
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, () => {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })

                console.log("this.state.history", this.state.history, this.state.history.length)
            }
            Alert.alert("Custom extra added successfully")
        } else {
            this.setState({ customModalVisible: false })
            Alert.alert("Something went wrong, please try again later")
        }
    }

    selectFiles = async () => {
        FilePickerManager.showFilePicker(null, async (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                if (response.type == "image/jpeg" || "image/png") {
                    this.setState({fileResponse: [...this.state.fileResponse, response]});
                    this.setState({withWatermark: 1});
                }
                else {
                    this.setState({ fileResponse: response })
                }
            }
        });
    }

    submitReview = async(reviewMeg, comRate, quaRate, recRate) => {
        let data = {
            'sellerID': this.state.sellerId,
            'buyerID': this.state.buyerId,
            'message': reviewMeg,
            'orderid': this.state.details.o_id,
            'communication_level': comRate,
            'quality_of_delivered_work': quaRate,
            'recommended_for_others': recRate
        };   
        let response = await submitRating(this.props.token, this.state.sellerId, this.state.buyerId, reviewMeg, this.state.details.o_id, comRate, quaRate, recRate)
        console.log("reviewresult=========",response)
        if (response.status == 1) {
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, ()=> {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })

                console.log("this.state.history", this.state.history, this.state.history.length)
            }
            Alert.alert(response.message)
        } else {
            this.setState({ deliverModalVisible: false })
            Alert.alert("Something went wrong, please try again later")
        }
      }
    deliverOrder = async () => {
        this.setState({deliverModalVisible:false})
        let response = await deliverOrderService(
            this.props.token,
            this.state.deliverMsg,
            this.state.details.o_id,
            this.state.sellerId,
            this.state.buyerId,
            this.state.withWatermark,
            this.state.fileResponse
        )
        if (response.status == 1) {
            this.setState({ deliverModalVisible: false, orderDeliverySuccess: true })
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, ()=> {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })

                console.log("this.state.history", this.state.history, this.state.history.length)
            }
            Alert.alert("Order Delivered Successfully")
        } else {
            this.setState({ deliverModalVisible: false })
            Alert.alert("Something went wrong, please try again later")
        }
    }

    cancelAbortAction = async(type) => {        
        let response = await orderActionCancel(
            this.props.token,
            this.props.navigation.state.params.orderDetails.o_id,
            type
        )
        if (response.status == 1) {
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, ()=> {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })
            }
            this.setState({ orderCancelled: true })
        } else {
            Alert.alert("Something went wrong, please try again later")
        }
    }
    extendTime = async () => {
        console.log("++++++++++", this.props.token,
            this.state.extendDays,
            this.state.sellerId,
            this.state.buyerId,
            this.state.details.o_id)
        let response = await extendDeliverTimeService(
            this.props.token,
            this.state.extendMsg,
            this.state.extendDays,
            this.state.sellerId,
            this.state.buyerId,
            this.state.details.o_id,
        )
        console.log(">>>>>>>>>>>>>>>>>", response)
        if (response.status == 1) {
            this.setState({ extendModalVisible: false })
            let history = await orderHistory(this.props.token, this.state.orderId)
            console.log("============>>>>>>>>>>>>>>", history)
            if (history.status == 1) {
                console.log("in history .................", history.status)
                this.setState({ loader: false })
                // arr.push(history.data)
                this.setState({ history: history.data.history }, () => {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })

                console.log("this.state.history", this.state.history, this.state.history.length)
            }
            Alert.alert("time successfully extended")

        } else {
            this.setState({ extendModalVisible: false })
            Alert.alert("Something went wrong, please try again later")
        }
    }

    cancelAction = () => {
        return Alert.alert(
            'Confirm',
            'Are You Sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.confirmAction() },
            ],
            { cancelable: false },
        );
    }
    cancelAbort = (type) => {
        return Alert.alert(
            'Confirm',
            'Are You Sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.cancelAbortAction(type) },
            ],
            { cancelable: false },
        );
    }
    cancelCustom = () => {
        return Alert.alert(
            'Confirm',
            'Are You Sure ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.confirmCancelCustom() },
            ],
            { cancelable: false },
        );
    }

    confirmAction = async () => {
        let response = await cancelExtendService(this.props.token, this.state.details.o_id)
        if (response.status == 1) {
            let history = await orderHistory(this.props.token, this.state.orderId)
            if (history.status == 1) {
                this.setState({ loader: false })
                this.setState({ history: history.data.history }, ()=>{
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })
                Alert.alert("Success")
                console.log("this.state.history", this.state.history, this.state.history.length)
            }
        } else {
            Alert.alert("Something went wrong, please try again later")
        }
    }

    confirmCancelCustom = async () => {
        let response = await cancelCustomExtraService(this.props.token, this.state.details.o_id)
        if (response.status == 1) {
            let history = await orderHistory(this.props.token, this.state.orderId)
            if (history.status == 1) {
                this.setState({ loader: false })
                this.setState({ history: history.data.history }, () => {
                    this.state.history.map((item) => {
                        if (item.type == 0 &&item.data.type == 0) {
                            this.setState({ orderCancel: true, false: true })
                        } else if (item.type == 0 &&item.data.type == 3) {
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 0 &&item.data.type == 2) {
                            this.setState({orderAbort:true})
                        } else if (item.type == 2) {
                            this.setState({ orderDelivered: true })
                        } else if(item.type == 6){
                            this.setState({deliveryDescription: false})
                        } else if(item.type == 8 || item.type == 7){
                            this.setState({finalOrderCancel:true})
                        } else if (item.type == 4){
                            this.setState({isReviewed:true})
                        } else if (item.type == 5){
                            if (item.data.or_to_id == item.data.or_seller_id){
                                this.setState({isBuyerReview: true})
                            }
                            else if (item.data.or_to_id == item.data.or_buyer_id){
                                this.setState({isSellerReview: true})
                            }
                        }
                        else {
                            this.setState({orderAbort: true})
                        }
                    })
                })
                Alert.alert("Success")
                console.log("this.state.history", this.state.history, this.state.history.length)
            }
        } else {
            Alert.alert("Something went wrong, please try again later")
        }
    }

    downloadAttachment = async (filePath) => {

        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const { dirs } = RNFetchBlob.fs;
                RNFetchBlob
                    .config({
                        fileCache: true,
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            mediaScannable: true,
                            title: filePath,
                            mime: 'image/jpeg',
                            path: dirs.DownloadDir + filePath,
                        },
                    })
                    .fetch('GET', filePath, {
                        //some headers ..
                    })
                    .then((res) => {
                        Alert.alert('File Downloaded Successfully to', res.path());
                    })
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        let total = this.state.details.o_amount + this.state.details.o_processing_fees
        return (
            <DrawerWrapper {...this.props}>
                {/* {ismount?
                <ActivityIndicator size="large" color="#10A2EF" />
                : */}
                <KeyboardAwareScrollView>
                    {
                        !this.state.loader
                            ?
                            <View style={{ padding: 10, alignItems: 'center' }}>                              
                                <View style={[styles.container, {alignItems:'center', marginBottom: 15}]}>
                                    <View style={{flexDirection:'row'}}>
                                        <View>
                                            <View style={styles.timeView}>
                                                <Text style={styles.timeDigitStyle}>
                                                    02
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.timeTextStyle}>
                                                    Days
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.timeQuoteViewStyle}>
                                            <Text style={styles.timeQuoteStyle}>
                                                :
                                            </Text>
                                        </View>
                                        <View>
                                            <View style={styles.timeView}>
                                                <Text style={styles.timeDigitStyle}>
                                                    10
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.timeTextStyle}>
                                                    Hours
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.timeQuoteViewStyle}>
                                            <Text style={styles.timeQuoteStyle}>
                                                :
                                            </Text>
                                        </View>
                                        <View>
                                            <View style={styles.timeView}>
                                                <Text style={styles.timeDigitStyle}>
                                                    07
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.timeTextStyle}>
                                                    Minutes
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.timeQuoteViewStyle}>
                                            <Text style={styles.timeQuoteStyle}>
                                                :
                                            </Text>
                                        </View>
                                        <View>
                                            <View style={styles.timeView}>
                                                <Text style={styles.timeDigitStyle}>
                                                    45
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.timeTextStyle}>
                                                    Seconds
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ height: 150, width: 150 }} source={{ uri: this.state.details.r_root_image ? this.state.details.r_root_image : this.state.t_r_root_image }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 20, width: 200, fontWeight: 'bold'}}>{this.state.details.r_title ? this.state.details.r_title : this.state.t_r_title}</Text>
                                        <Text style={{ color: '#2ec09c', fontSize: 20, fontWeight: '700' }}>${this.state.details.o_amount}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {this.state.details.profile != undefined &&
                                        <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: this.state.details.profile.includes('https')? this.state.details.profile:'https://cdn.talentsroot.com/upload/profile/' + this.state.details.profile }} />
                                        }
                                        <View style={{ marginTop: 12, flexDirection: 'row', marginLeft: 7 }}>
                                            <Text style={{ color: '#748f9e', fontWeight: '900' }}>{this.props.navigation.state.params.from == "sales" ? "Buyer:" : "Seller:"} </Text>
                                            <Text style={{ color: '#748f9e', fontWeight: '900' }}>{this.state.details.name ? this.state.details.name : this.state.t_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={{ color: '#748f9e', fontWeight: '500' }}>Order #{this.state.details.o_order_id ? this.state.details.o_order_id : this.state.t_order_id}</Text>
                                        <Text style={{ color: '#748f9e', fontWeight: '500' }}>{this.state.details.sold_on ? this.state.details.sold_on : this.state.t_sold_on}</Text>
                                    </View>
                                    <View style={styles.doshline} />
                                    {this.state.details.description != undefined&&
                                    <View style={{ marginTop: 7 }}>
                                        <Text style={{marginVertical: 10, fontSize: 18, fontWeight: '700' }}>Requirements:</Text>
                                        <Text style={{flexWrap:'wrap', fontWeight: '500' }}>{this.state.details.r_instruction_to_buyer}</Text>
                                        
                                    </View>
                                    }
                                </View>
                                {
                                    this.state.history.length == 0 ? null :
                                        this.state.history.map((item) => {
                                            console.log("realdate===========",item)
                                            if (item.type == 5) {
                                                let fullDate = new Date(moment.unix(item.data.or_created_at));
                                                let realDate = moment(fullDate).format('lll');
                                                return (
                                                    <>
                                                        <View>
                                                            <View style={[styles.container, { flexDirection: 'row', marginTop: 20, paddingHorizontal: 0, paddingVertical: 0 }]}>
                                                                <View style={{ justifyContent: 'center', backgroundColor: '#ffca30', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                    <Image source={{ uri: 'https://www.talentsroot.com/images/staricon1.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                                </View>
                                                                <View style={{ display: 'flex', marginLeft: 10, padding: 10 }}>
                                                                    <Text style={{ fontSize: 18, marginVertical: 10, width: 200 }}>{item.data.title}</Text>

                                                                    <Text>Feedback Message:</Text>
                                                                    <Text style={{ fontSize: 18, width: 200 }}>{item.data.messages}</Text>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontSize: 15 }}>Communication Level: </Text>
                                                                        <Rating
                                                                            readonly
                                                                            imageSize={6}
                                                                            style={{ marginTop: 5 }}
                                                                            startingValue={item.data.communication_level}
                                                                        />
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontSize: 15 }}>Quality of work: </Text>
                                                                        <Rating
                                                                            readonly
                                                                            imageSize={6}
                                                                            style={{ marginTop: 5 }}
                                                                            startingValue={item.data.quality_of_delivered_work}
                                                                        />
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontSize: 15 }}>Recommended to others: </Text>
                                                                        <Rating
                                                                            readonly
                                                                            imageSize={6}
                                                                            style={{ marginTop: 5 }}
                                                                            startingValue={item.data.recommended_for_others}
                                                                        />
                                                                    </View>
                                                                    <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8 }}>{realDate}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </>
                                                )
                                            }
                                            else if (item.type == 4) {
                                                return (
                                                    <View>
                                                        <View style={[styles.container, { flexDirection: 'row', marginTop: 20, paddingHorizontal: 0, paddingVertical: 0 }]}>
                                                            <View style={{ justifyContent: 'center', backgroundColor: '#2ec09c', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                <Image source={{ uri: 'https://www.talentsroot.com/images/accepted.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                            </View>
                                                            <View style={{ flex:1, marginLeft: 10, padding: 10 }}>
                                                                <Text style={{ fontSize: 18, marginVertical: 10, width: 200, flexWrap: 'wrap' }}>{item.data.title}</Text>
                                                                <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8 }}>{item.data.created_at}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            else if (item.type == 3) {
                                                return (
                                                    <View>
                                                        <View style={[styles.container, { flexDirection: 'row', marginTop: 20, paddingHorizontal: 0, paddingVertical: 0 }]}>
                                                            <View style={{ justifyContent: 'center', backgroundColor: '#ff6060', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                <Image source={{ uri: 'https://www.talentsroot.com/images/delivered.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                            </View>
                                                            <View style={{ flex:1, marginLeft: 10, padding: 10 }}>
                                                                <Text style={{ fontSize: 18, marginVertical: 10, flexWrap: 'wrap'}}>{item.data.title}</Text>
                                                                <Text style={{ fontSize: 18, marginVertical: 10, flexWrap: 'wrap' }}>{item.data.message}</Text>
                                                                {item.data.file ? <Text style={{ fontSize: 20, marginVertical: 10 }}>Attachments</Text> : null}
                                                                {item.data.file ?
                                                                    item.data.file.map((data) => {
                                                                        console.log("********************", data)
                                                                        return (
                                                                            <View style={{ display: 'flex', flexDirection: 'row', width: 200 }}>
                                                                                <TouchableOpacity onPress={() => this.setState({ previeModelVisible: true, imagePath: data.file_name })}>
                                                                                    <Text>
                                                                                        {data.type == "image/jpeg" || data.type == "image/png" ? 'image' : 'file'}
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        )
                                                                    })
                                                                    : null}
                                                                <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8 }}>{item.data.created_at}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }else if(item.type == 6){
                                                return (
                                                    <View>
                                                        <View style={[styles.container, { flexDirection: 'row', marginTop: 20, paddingHorizontal: 0, paddingVertical: 0 }]}>
                                                            <View style={{ justifyContent: 'center', backgroundColor: '#2ec09c', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                <Image source={{ uri: 'https://www.talentsroot.com/images/accepted.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                            </View>
                                                            <View style={{flex:1, marginLeft: 10, padding: 10 }}>
                                                                <Text style={{ fontSize: 18, marginVertical: 10, flexWrap: 'wrap'}}>{item.data.title}</Text>
                                                                <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8}}>{item.data.created_at}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }else if(item.type == 7){
                                                
                                                return (
                                                    <View>
                                                        <View style={[styles.container, { flexDirection: 'row', marginTop: 20, paddingHorizontal: 0, paddingVertical: 0 }]}>
                                                            <View style={{ justifyContent: 'center', backgroundColor:item.type == 7?'#ff6060':'#2ec09c', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                <Image source={{ uri: 'https://www.talentsroot.com/images/accepted.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                            </View>
                                                            <View style={{ flex:1, marginLeft: 10, padding: 10 }}>
                                                                <Text style={{ fontSize: 18, marginVertical: 10, flexWrap: 'wrap'}}>{item.data.title}</Text>
                                                                <Text style={{alignSelf: 'flex-end', color: '#748f9e', marginTop: 8}}>{item.data.created_at}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            else {
                                                return (
                                                    <View>
                                                        <View style={[styles.container, { flexDirection: 'row', marginTop: 20, paddingHorizontal: 0, paddingVertical: 0 }]}>

                                                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                                                {item.type == 0 || item.type == 2 ?
                                                                    <>
                                                                        {item.type == 0 ?
                                                                            <>
                                                                                <View style={{ justifyContent: 'center', backgroundColor: '#ff6060', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                                    {item.data.message != null?
                                                                                        <Image source={{ uri: 'https://www.talentsroot.com/images/declined.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                                                        :
                                                                                        <Image source={{ uri: 'https://www.talentsroot.com/images/declined2.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                                                    }
                                                                                </View>
                                                                                <View style={{ flex:1 , marginLeft: 10, padding: 5 }}>
                                                                                    <Text style={{ fontSize: 18, marginVertical: 10, flexWrap: 'wrap'}}>{item.data.title}</Text>
                                                                                    {item.data.message != null&&
                                                                                        <Text style={{fontSize: 16, marginBottom: 8, flexWrap: 'wrap'}}>Cancellation Message: {item.data.message}</Text>
                                                                                    }
                                                                                    <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8 }}>{item.data.created_at}</Text>
                                                                                </View>
                                                                            </> :
                                                                            <>
                                                                                <View style={{ justifyContent: 'center', backgroundColor: '#10a2ef', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                                    <Image source={{ uri: 'https://www.talentsroot.com/images/delivered.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                                                </View>
                                                                                <View style={{flex: 1, marginLeft: 10, padding: 10}}>
                                                                                    <Text style={{ fontSize: 18, marginVertical: 10, flexShrink: 1}}>{item.data.title}</Text>
                                                                                    <Text style={{ fontSize: 18, marginVertical: 10 , flexShrink: 1}}>{item.data.message}</Text>
                                                                                    <Text style={{ fontSize: 18, marginVertical: 10 }}>Attachments</Text>
                                                                                    {item.data.file ?
                                                                                        item.data.file.map((data) => {
                                                                                            console.log("********************", data)
                                                                                            return (
                                                                                                <View style={{ display: 'flex', flexDirection: 'row', width: 200 }}>
                                                                                                    <TouchableOpacity onPress={() => this.setState({ previeModelVisible: true, imagePath: data.file_name })}>
                                                                                                        <Text>
                                                                                                            {data.type == "image/jpeg" || data.type == "image/png" ? 'image' : 'file'}
                                                                                                        </Text>
                                                                                                    </TouchableOpacity>
                                                                                                </View>
                                                                                            )
                                                                                        })
                                                                                        : null}
                                                                                    <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8 }}>{item.data.created_at}</Text>
                                                                                </View>
                                                                            </>
                                                                        }
                                                                    </> :
                                                                    <>
                                                                        <View style={{ justifyContent: 'center', backgroundColor: (item.data.status == 'declined')?'#ff6060':'#10a2ef', borderTopLeftRadius: 10, borderBottomStartRadius: 10, width: 60, height: null }}>
                                                                            {item.type == 1 || item.type == 2 || item.type == 8?
                                                                                <Image source={{ uri: 'https://www.talentsroot.com/images/sent.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                                                :
                                                                                <Image source={{ uri: 'https://www.talentsroot.com/images/accepted.png' }} style={{ height: 50, width: 50, padding: 5, marginLeft: 4 }} />
                                                                            }
                                                                        </View>
                                                                        <View style={{ flex:1, marginLeft: 10}}>
                                                                            <Text style={{ fontSize: 18, marginVertical: 10 }}>{item.data.title}</Text>
                                                                            {this.state.orderCancel?
                                                                            null
                                                                            :
                                                                            <View style={{ marginLeft: 10, paddingRight: 5 }}>
                                                                                <View style={{ flexDirection: 'row'}}>
                                                                                    <View style={{width: 100}}>
                                                                                        <Text style={{ fontWeight: 'bold', fontSize: 16}}>Description : </Text>
                                                                                    </View>
                                                                                    <View style={{flex:1}}>
                                                                                        <Text style={{ fontWeight: 'bold', fontSize: 14, flexWrap:'wrap' }}>{item.data.message}</Text>
                                                                                    </View>
                                                                                </View>
                                                                                <View style={{ flexDirection: 'row'}}>
                                                                                    <View style={{width: 100}}>
                                                                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Delivery :</Text>
                                                                                    </View>
                                                                                    <View style={{flex:1}}>
                                                                                        <Text style={{ fontSize: 14, flexWrap:'wrap'  }}>{item.data.day} day</Text>
                                                                                    </View>
                                                                                </View>
                                                                                {item.type == 8 ? <View>
                                                                                    <View style={{ flexDirection: 'row'}}>
                                                                                        <View style={{width: 100}}>
                                                                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Price :</Text>
                                                                                        </View>
                                                                                        <View style={{flex:1}}>
                                                                                            <Text style={{ fontSize: 14, flexWrap:'wrap' }}>${item.data.price}</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </View> : null}
                                                                                <View style={{ flexDirection: 'row'}}>
                                                                                    <View style={{width: 100}}>
                                                                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Status :</Text>
                                                                                    </View>
                                                                                    <View style={{flex:1}}>
                                                                                        <Text style={{ fontSize: 14, color: item.data.status == 'waiting'? '#10a2ef': item.data.status == 'declined'?'#ff6060': '#000'}}>{item.data.status}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            }
                                                                            {item.data.status == "waiting" ? <TouchableOpacity style={[styles.confirm, { backgroundColor: '#ff6060', marginTop: 8 }]} onPress={() => { item.type == 1 ? this.cancelAction() : this.cancelCustom() }}>
                                                                                <Text style={{ color: 'white' }}>Cancel Request</Text>
                                                                            </TouchableOpacity> : null}
                                                                            <Text style={{ alignSelf: 'flex-end', color: '#748f9e', marginTop: 8, paddingRight: 5 }}>{item.data.created_at}</Text>
                                                                        </View>
                                                                    </>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>)
                                            }
                                        })
                                }
                                {this.props.navigation.state.params.orderDetails.o_buyer_id == this.props.profileData.id ?
                                <>
                                    {this.state.finalOrderCancel?
                                        null
                                        :
                                        <>
                                            {this.state.isBuyerReview?
                                                null
                                                :
                                                <>
                                                    {this.state.isReviewed?null: 
                                                        <>
                                                            {this.state.orderCancel?
                                                                <>
                                                                    {this.state.orderAbort?
                                                                        <View>
                                                                            <TouchableOpacity style={styles.button} onPress={() => { this.setState({ modalVisible: true }) }}>
                                                                                <Text style={styles.orderButtonTextStyle}>CANCEL THE ORDER</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        :
                                                                        <View>
                                                                            <View>
                                                                                <TouchableOpacity style={[styles.button, {backgroundColor: '#2ec09c'}]} onPress={() => this.cancelAbort(3)}>
                                                                                    <Text style={styles.orderButtonTextStyle}>ACCEPT CANCELLATION</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View>
                                                                                <TouchableOpacity style={styles.button} onPress={() => this.cancelAbort(2)}>
                                                                                    <Text style={styles.orderButtonTextStyle}>DENY CANCELLATION</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <Text style={{flexWrap:'wrap', textAlign:'center', fontSize: 16 }}>This order will be marked as cancelled automatically after 3 Days if no action is taken</Text>
                                                                        </View>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                {this.state.orderDelivered ? 
                                                                    <View>
                                                                        <View>
                                                                            <TouchableOpacity style={[styles.button, {backgroundColor: '#2ec09c'}]} onPress={() => { this.setState({ acceptOrderVisible: true }) }}>
                                                                                <Text style={styles.orderButtonTextStyle}>ACCEPT ORDER</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View>
                                                                            <TouchableOpacity style={[styles.button, {backgroundColor:'#ffca30'}]} onPress={() => { this.setState({ requestModificationVisible: true }) }}>
                                                                                <Text style={styles.orderButtonTextStyle}>REQUEST MODIFICATION</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View>
                                                                            <TouchableOpacity style={styles.button} onPress={() => { this.setState({ modalVisible: true }) }}>
                                                                                <Text style={styles.orderButtonTextStyle}>CANCEL THE ORDER</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                    :
                                                                    <View>
                                                                        <TouchableOpacity style={styles.button} onPress={() => { this.setState({ modalVisible: true }) }}>
                                                                            <Text style={styles.orderButtonTextStyle}>CANCEL THE ORDER</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </>
                                :
                                <>
                                    {this.props.navigation.state.params.orderDetails.o_seller_id == this.props.profileData.id ?
                                    <>
                                        {this.state.isSellerReview?
                                            null
                                            :
                                            <>
                                                {this.state.isReviewed?
                                                    null
                                                    :
                                                    <>
                                                        {this.state.orderCancel?
                                                            <>
                                                                {this.state.orderAbort?
                                                                    null
                                                                    :
                                                                    <View>
                                                                        <TouchableOpacity style={[styles.button, {backgroundColor: '#10a2ef'}]} onPress={() => this.cancelAbort(1)}>
                                                                            <Text style={styles.orderButtonTextStyle}>Abort Cancellation</Text>
                                                                        </TouchableOpacity>
                                                                        <Text style={{flexWrap:'wrap', textAlign:'center', fontSize: 16 }}>This order will be marked as cancelled automatically after 3 Days if no action is taken</Text>
                                                                    </View>
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                            {!this.state.orderCancel && !this.state.orderDelivered ?
                                                                <View>
                                                                    <View>
                                                                        <TouchableOpacity style={[styles.button, {backgroundColor: '#2ec09c'}]} onPress={() => { this.setState({ deliverModalVisible: true }) }}>
                                                                            <Text style={styles.orderButtonTextStyle}>DELIVER THE ORDER</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View>
                                                                        <TouchableOpacity style={styles.button} onPress={() => { this.setState({ modalVisible: true }) }}>
                                                                            <Text style={styles.orderButtonTextStyle}>CANCEL THE ORDER</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View>
                                                                        <TouchableOpacity style={styles.button2} onPress={() => { this.setState({ extendModalVisible: true }) }}>
                                                                            <Text style={[styles.orderButtonTextStyle, {color: '#748f9e'}]}>EXTEND DELIVERY TIME</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View>
                                                                        <TouchableOpacity style={styles.button2} onPress={() => { this.setState({ customModalVisible: true }) }}>
                                                                            <Text style={[styles.orderButtonTextStyle, {color: '#748f9e'}]}>ADD CUSTOM EXTRA</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View>
                                                                    <View style={[styles.button, {backgroundColor: '#10a2ef'}]}>
                                                                        <Text style={styles.orderButtonTextStyle}>WAITING THE BUYER TO RESPOND</Text>
                                                                    </View>
                                                                </View>
                                                            }
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </>   
                                        :
                                        null
                                    }
                                </>
                                }
                                {this.state.isReviewed?
                                        <View style={{ display: 'flex', alignSelf: 'center', width: '100%', marginVertical: 10 }}>
                                        {this.props.navigation.state.params.orderDetails.o_seller_id == this.props.profileData.id?
                                            <Text style={{flexWrap:'wrap', textAlign:'center', fontSize: 16 }}>This order is complete. Click here to contact the Buyer</Text>
                                            :
                                            <Text style={{flexWrap:'wrap', textAlign:'center', fontSize: 16 }}>This order is complete. Click here to contact the Seller</Text>
                                        }
                                        </View>
                                            
                                    :
                                    <>
                                        {this.state.orderDelivered ?
                                            <View style={{ display: 'flex', alignSelf: 'center', width: '100%', marginVertical: 10 }}>
                                                <Text style={{flexWrap:'wrap', textAlign:'center', fontSize: 16 }}>This order will be marked as completed automatically after 3 days if no action is taken</Text>
                                            </View>
                                            : null
                                        }
                                    </>
                                }
                                {this.props.navigation.state.params.orderDetails.o_seller_id == this.props.profileData.id&&
                                    <>
                                        {this.state.isSellerReview?
                                            null
                                            :
                                            <>
                                                {this.state.isReviewed &&
                                                    <OrderSellerReviewCard 
                                                        submitReview = {this.submitReview}
                                                    />
                                                }
                                            </>
                                        }
                                    </>
                                }
                                {this.props.navigation.state.params.orderDetails.o_buyer_id == this.props.profileData.id&&
                                    <>
                                        {this.state.isBuyerReview?
                                            null
                                            :
                                            <>
                                                {this.state.isReviewed &&
                                                    <OrderBuyerReviewCard 
                                                        submitReview = {this.submitReview}
                                                    />
                                                }
                                            </>
                                        }
                                    </>
                                }      
                                {this.state.user != undefined &&
                                <TranChatScreen 
                                    user={this.state.user}/>
                                }
                                <View>
                                    <Modal
                                        isVisible={this.state.modalVisible}
                                        animationType={"fade"}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ modalVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black' >
                                        <View style={styles.generalModalView}>
                                            <View style={styles.modalTitle}>
                                                <Text style={{ color:'#ff6060',fontSize: 26 }}>Cancel the order</Text>
                                            </View>
                                            <View style={{ padding: 10 }}>
                                                <Text>You are about to request cancellation for this root. By using this option you are asking the seller to mutually cancel the order.</Text>
                                            </View>
                                            <View style={styles.bigTextInput}>
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Your Message to the seller'
                                                    onChangeText={(text) => this.setState({ messageToSeller: text })}
                                                />
                                            </View>
                                            <View style={styles.buttonGroup} >
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.cancelOrder()}>
                                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ modalVisible: false }) }}>
                                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal
                                        isVisible={this.state.customModalVisible}
                                        animationType={"fade"}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ customModalVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black' >
                                        <View style={styles.generalModalView}>
                                            <View style={styles.modalTitle}>
                                                <Text style={{fontSize: 26 }}>Send Custom Extra</Text>
                                            </View>
                                            <View style={styles.bigTextInput}>
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Your Message to the Buyer'
                                                    onChangeText={(text) => this.setState({ customMsg: text })}
                                                />
                                            </View>
                                            <View style={styles.smallTextInput}>
                                                <TextInput
                                                    placeholder='price'
                                                    onChangeText={(text) => this.setState({ customPrice: text })}
                                                />
                                            </View>
                                            <View style={styles.smallTextInput}>
                                                <TextInput
                                                    placeholder='I will deliver in (days)'
                                                    onChangeText={(text) => this.setState({ customDays: text })}
                                                />
                                            </View>
                                            <View style={styles.buttonGroup} >
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.sendCustomExtra()}>
                                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ customModalVisible: false }) }}>
                                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal
                                        isVisible={this.state.deliverModalVisible}
                                        animationType={"fade"}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ deliverModalVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black' >

                                        <KeyboardAvoidingView style={[styles.generalModalView, {height: 500}]}>
                                            <View style={styles.modalTitle}>
                                                <Text style={{ color: '#2ec09c', fontSize: 26 }}>Deliver The Order</Text>
                                            </View>
                                            <View style={{ marginTop: 10, padding: 10 }}>
                                                <Text style={{fontSize:16}}>Attach file(max. 1GB)</Text>
                                                <TouchableOpacity onPress={() => this.selectFiles()}>
                                                    <View style={styles.cardView}>
                                                        {(this.state.fileResponse != undefined && this.state.fileResponse.length>0) ?
                                                        this.state.fileResponse.map((item) => {
                                                        return (
                                                            <View>
                                                                <Image resizeMode={'contain'} style={{ height:110, width:80, marginHorizontal: 10 }} source={{ uri: item.uri }} />
                                                                <TouchableOpacity onPress={() => this.removeImage(item)} style={{position:'absolute', top:5, right:13}}>
                                                                    <Icon name='delete' color='#748f9e' size={15}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )})
                                                        : 
                                                        <Text style={{color:'#748f9e', textAlign: 'center'}}>Click here to attach files</Text>
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {(this.state.fileResponse != undefined && this.state.fileResponse.length>0)&&
                                            <View style={{ flexDirection: "row",padding: 10, paddingRight: 20}}>
                                                <CheckBox
                                                    value={this.state.isSelected}
                                                    onValueChange={() => {
                                                        this.setState({withWatermark: this.state.isSelected?0:1, isSelected: !this.state.isSelected})
                                                    }}
                                                />
                                                <Text style={{marginLeft:8, marginTop:3}}>Add watermark for images, Automatically removed once buyer accept the order</Text>
                                            </View>
                                            }
                                            <View style={styles.bigTextInput}>
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Your Message to the Buyer'
                                                    onChangeText={(text) => this.setState({ deliverMsg: text })}
                                                />
                                            </View>
                                            <View style={styles.buttonGroup} >
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.deliverOrder()}>
                                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ deliverModalVisible: false }) }}>
                                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </KeyboardAvoidingView>
                                    </Modal>
                                    <Modal
                                        isVisible={this.state.extendModalVisible}
                                        animationType={"fade"}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ extendModalVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black' >
                                        <KeyboardAvoidingView style={styles.generalModalView}>
                                            <View style={styles.modalTitle}>
                                                <Text style={{ fontSize: 26}}>Extend Delivery Time</Text>
                                            </View>
                                            <View style={{ marginTop: 10, padding: 10}}>
                                                <View style={styles.smallTextInput}>
                                                    <TextInput
                                                        placeholder='I will deliver in (days)'
                                                        onChangeText={(text) => this.setState({ extendDays: text })}
                                                    />
                                                </View>
                                                <View style={styles.bigTextInput}>
                                                    <TextInput
                                                        multiline={true}
                                                        placeholder='Your Message to the Buyer'
                                                        onChangeText={(text) => this.setState({ extendMsg: text })}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.buttonGroup} >
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.extendTime()}>
                                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ extendModalVisible: false }) }}>
                                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </KeyboardAvoidingView>
                                    </Modal>
                                    <Modal
                                        isVisible={this.state.acceptOrderVisible}
                                        animationType={"fade"}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ acceptOrderVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black' >
                                        <View style={styles.generalModalView}>
                                            <View style={styles.modalTitle}>
                                                <Text style={{fontSize: 26 }}>Accept the order</Text>
                                            </View>
                                            <View style={{marginTop: 30}}>
                                                <Text style={{flexWrap: 'wrap', textAlign: 'center', paddingHorizontal: 10, fontSize: 16}}>
                                                    The image/video will be added to the seller gallery and will be seen by all users
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", paddingHorizontal: 10, marginVertical: 5}}>
                                                <CheckBox
                                                    value={this.state.isAgree}
                                                    onValueChange={() => {
                                                        this.setState({isAgree: !this.state.isAgree, isNotAgree:this.state.isAgree?true:false})
                                                    }}
                                                />
                                                <Text style={{marginLeft:8, marginTop:5}}>I AGREE</Text>
                                            </View>
                                            <View style={{ flexDirection: "row",paddingHorizontal: 10, marginVertical: 5}}>
                                                <CheckBox
                                                    value={this.state.isNotAgree}
                                                    onValueChange={() => {
                                                        this.setState({isNotAgree: !this.state.isNotAgree, isAgree: this.state.isNotAgree?true:false})
                                                    }}
                                                />
                                                <Text style={{marginLeft:8, marginTop:5}}>I DON'T AGREE</Text>
                                            </View>
                                            <View style={{borderBottomColor: '#dee2e6', borderBottomWidth: 1, marginTop: 30}}/>
                                            <View style={styles.buttonGroup} >
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.acceptOrder()}>
                                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ acceptOrderVisible: false }) }}>
                                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal
                                        isVisible={this.state.requestModificationVisible}
                                        animationType={"fade"}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ requestModificationVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black' >

                                        <View style={[styles.generalModalView, {height: 575}]}>
                                            <View style={styles.modalTitle}>
                                                <Text style={{ color: '#ffca30', fontSize: 26 }}>Request Modification</Text>
                                            </View>
                                            <View style={{marginTop: 15}}>
                                                <Text style={{flexWrap: 'wrap', textAlign: 'center',fontSize: 14}}>
                                                    You are about to request modification for this root. By using this option you are asking the seller to modify the final product that you received.
                                                </Text>
                                            </View>
                                            <View style={{ marginTop: 10, padding: 10 }}>
                                                <Text style={{fontSize:16}}>Attach file(max. 1GB)</Text>
                                                <TouchableOpacity onPress={() => this.modifiSelectFiles()}>
                                                    <View style={[styles.cardView, {height: 110}]}>
                                                        {(this.state.modification != undefined && this.state.modification.length>0) ?
                                                        this.state.modification.map((item) => {
                                                        return (
                                                            <View>
                                                                <Image resizeMode={'contain'} style={{ height:90, width:75, marginHorizontal: 10 }} source={{ uri: item.uri }} />
                                                                <TouchableOpacity onPress={() => this.removeImage(item)} style={{position:'absolute', top:5, right:13}}>
                                                                    <Icon name='delete' color='#748f9e' size={15}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )})
                                                        : 
                                                        <Text style={{color:'#748f9e', textAlign: 'center'}}>Click here to attach files</Text>
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[styles.bigTextInput, {height: 100}]}>
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Your Message to the Seller.'
                                                    onChangeText={(text) => this.setState({ modificationMsg: text })}
                                                />
                                            </View>
                                            <View style={{borderBottomColor: '#dee2e6', borderBottomWidth: 1, marginTop: 20}}/>
                                            <View style={styles.buttonGroup} >
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.sendCustomOffer()}>
                                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ requestModificationVisible: false }) }}>
                                                    <Text style={{ color: 'white' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal
                                        animationType={"fade"}
                                        transparent={true}
                                        visible={this.state.previeModelVisible}
                                        onRequestClose={() => this.setState({ previeModelVisible: false })}
                                        deviceWidth={widthPercentageToDP(100)}
                                        deviceHeight={heightPercentageToDP(100)}
                                        backdropColor='black'
                                    >
                                        {/*All views of Modal*/}
                                        <View style={styles.generalModalView}>
                                            <View>
                                                <Image style={{ height: 200, width: 200 }} resizeMode={'contain'} source={{ uri: this.state.imagePath }} />
                                                <TouchableOpacity style={styles.confirm} onPress={() => this.downloadAttachment(this.state.imagePath)}>
                                                    <Text style={{ color: 'white' }}>Download</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <View>
                                        {/* watermark model */}
                                        <Modal
                                            animationType={"fade"}
                                            transparent={false}
                                            visible={this.state.isWaterMarkModalVisible}
                                            style={{ height: 400 }}
                                        >
                                            {/*All views of Modal*/}
                                            <View style={{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center' }}>
                                                <View>
                                                    <Image style={{ height: 150, width: 150 }} source={{ uri: this.state.fileResponse.uri }} />
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <TouchableHighlight style={styles.waterMarkModel} onPress={() => this.setState({ withWatermark: 1, isWaterMarkModalVisible: false })}>
                                                        <Text style={{ color: 'white', }}>With Watermark</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.waterMarkModel, { marginTop: 10 }]} onPress={() => this.setState({ withWatermark: 0, isWaterMarkModalVisible: false })}>
                                                        <Text style={{ color: 'white', }}>Without Watermark</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text>{this.state.fileResponse.file_name}</Text>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                            </View> : <ActivityIndicator size="large" color="#10A2EF" />}
                </KeyboardAwareScrollView>
            {/* } */}
            </DrawerWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.LoginUser.userToken,
        profileData: state.userProfile.profiledata,
        type: state.LoginUser.type
    };
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width / 1.1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#748f9e',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginTop: 10,
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: '#ff6060',
        alignContent: 'center',
        borderRadius: 10
    },
    buttonInBox: {
        padding: 10,
        marginTop: 10,
        width: 50,
        backgroundColor: '#ff6060',
        alignContent: 'center',
        alignContent: 'center',
        borderRadius: 10
    },
    button2: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginTop: 10,
        width: Dimensions.get('window').width / 1.1,
        alignContent: 'center',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#748f9e'
    },
    confirm: {
        height: 35,
        width: 120,
        backgroundColor: '#2ec09c',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
        color: 'white'
    },
    cancel: {
        height: 35,
        width: 120,
        backgroundColor: '#ff6060',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
        color: 'white'
    },
    text: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        marginTop: 7
    },
    cardView: {
        borderColor: '#748F9E',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        height: 130,
        borderStyle: 'dashed',
        width:'100%',
        padding: 10,
        flexDirection:'row'
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
    timeView : {
        width: 50, 
        height:45, 
        borderRadius: 5, 
        backgroundColor: '#10a2ef', 
        justifyContent:'center'
    },
    timeTextStyle : {
        color:'#6c757d', 
        textAlign:'center', 
        fontWeight:'700'
    },
    timeDigitStyle: {
        textAlign:"center", 
        color:'#fff', 
        fontSize: 20,
        fontWeight: '700'
    },
    timeQuoteViewStyle : {
        marginHorizontal:10, 
        marginTop: 10
    },
    timeQuoteStyle: {
        fontSize: 20, 
        fontWeight:'bold', 
        color:'#6c757d'
    },
    doshline: { 
        height: 1, 
        width: '100%', 
        borderRadius: 1, 
        borderWidth: 1, 
        borderColor: '#e7e7e7', 
        borderStyle: 'dotted' 
    },
    orderButtonTextStyle: {
        fontSize: 16,
        color: 'white', 
        textAlign: 'center', 
        paddingVertical: 8, 
        fontWeight:'700' 
    },
    generalModalView: {
        flexDirection: 'column', 
        borderRadius: 10, 
        padding: 10, 
        alignContent: 'center', 
        alignSelf: 'center',
        width: '100%', 
        height:500, 
        backgroundColor: 'white'
    },
    modalTitle: {
        borderBottomWidth: 1, 
        borderBottomColor: '#dee2e6'
    },
    bigTextInput: {
        marginTop: 10, 
        height:120,
        marginHorizontal: 10, 
        borderWidth: 1, 
        borderRadius: 5, 
        padding: 5,
        borderColor: '#7F7F7F'
    },
    smallTextInput: {
        marginTop: 20, 
        padding: 5,
        marginHorizontal: 10, 
        borderWidth: 1, 
        borderColor: '#7F7F7F',
        borderRadius: 5
    },
    buttonGroup: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: 20
    }
})

export default connect(mapStateToProps)(Details)