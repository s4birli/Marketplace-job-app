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
    TouchableOpacity,
    Alert
} from 'react-native';
import DrawerWrapper from '../../commons/rightDrawerWrapper'
import Modal from "react-native-modal";
import { orderCancel } from '../../services/order';
import { connect } from 'react-redux';
import { widthPercentageToDP, heightPercentageToDP } from '../../commons/responsive_design';
import Icon from 'react-native-vector-icons/FontAwesome';

class OrderSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'active',
            details: [],
            modalVisible: false,
            messageToSeller: '',
            orderCancelled: true
        }
    }

    componentDidMount = () => {
        this.setState(prevState => ({
            details: [...prevState.details, this.props.navigation.state.params.orderDetails]
        }));
    }

    cancelOrder = async () => {
        console.log("this.props.navigation.state.params.orderDetails", this.props.navigation.state.params.orderDetails)
        this.setState({ modalVisible: false })
        let response = await orderCancel(
            this.props.token,
            this.props.navigation.state.params.orderDetails.o_seller_id,
            this.props.navigation.state.params.orderDetails.o_buyer_id,
            this.state.messageToSeller,
            this.props.navigation.state.params.orderDetails.o_id
        )
        console.log("==========>>>>>>.", response)
        if (response.status == 1) {
            Alert.alert("Order has been cancelled successfully")
            this.setState({ orderCancelled: true })
        } else {
            Alert.alert("Something went wrong, please try again later")
        }
    }

    render() {
        console.log("orderDetails", this.props.navigation.state.params.orderDetails)
        return (
            <DrawerWrapper>
                <ScrollView>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        {
                            this.state.details.map((item, index) => {
                                let total = item.o_amount + item.o_processing_fees
                                return (
                                    <View style={styles.container}>
                                        <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                            <Image style={{ height: 200, width: 200 }} source={{ uri: item.r_root_image }} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 20, width: 200, fontWeight: 'bold', color: '#748f9e' }}>{item.r_title}</Text>
                                            <Text style={{ color: '#2ec09c', fontSize: 20 }}>${total}</Text>
                                        </View>
                                        <View>
                                            <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: 'https://cdn.talentsroot.com/upload_staging/profile/thumb_1578047682_3434201858400469.jpeg' }} />
                                            <Text style={{ color: '#748f9e' }}>Seller: </Text>
                                            <Text style={{ color: '#748f9e' }}>{item.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <Text style={{ color: '#748f9e', fontWeight: '500' }}>Order #{item.o_order_id}</Text>
                                            <Text style={{ color: '#748f9e', fontWeight: '500' }}>{item.sold_on}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        {this.state.orderCancelled ?
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', backgroundColor: 'red' }}>
                                    <Icon name="hand" size={50} color='red' style={{ padding: 5, marginLeft: 15 }} />
                                </View>
                                <Text >You have cancelled this order</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity style={styles.button} onPress={() => { this.setState({ modalVisible: true }) }}>
                                    <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', padding: 10 }}>CANCEL THE ORDER</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        <View>
                            <Modal isVisible={this.state.modalVisible} style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'black' }} >
                                <View style={{ flex: 1, margin: 0 }}>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F7F7F' }}>
                                        <Text style={{ color: 'red', fontSize: 30 }}>Cancel the order</Text>
                                    </View>
                                    <View style={{ padding: 10 }}>
                                        <Text>You are about to request cancellation for this root. By using this option you are asking the seller to mutually cancel the order.</Text>
                                    </View>
                                    <View style={{ marginTop: 20, padding: 10 }}>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={5}
                                            placeholder='Your Message to the seller'
                                            style={{ borderWidth: 1, borderColor: '#7F7F7F' }}
                                            onChangeText={(text) => this.setState({ messageToSeller: text })}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} >
                                        <TouchableOpacity style={styles.confirm} onPress={() => this.cancelOrder()}>
                                            <Text style={{ color: 'white' }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.cancel, { marginLeft: 10 }]} onPress={() => { this.setState({ modalVisible: false }) }}>
                                            <Text style={{ color: 'white' }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
            </DrawerWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.LoginUser.userToken,
        profileData: state.userProfile.profiledata,
    };
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width / 1.2,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#748f9e',
    },
    button: {
        padding: 10,
        marginTop: 10,
        width: Dimensions.get('window').width / 1.2,
        backgroundColor: '#ff6060',
        alignContent: 'center',
        alignContent: 'center',
        borderRadius: 10
    },
    confirm: {
        height: 35,
        width: 120,
        backgroundColor: '#2ec09c',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20,
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
        marginTop: 20,
        padding: 10,
        color: 'white'
    },
    text: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        marginTop: 7
    }

})

export default connect(mapStateToProps)(OrderSuccess)