import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight, FlatList, TouchableOpacity, Alert } from 'react-native';
import HTML from 'react-native-render-html';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const SCREEN_WIDTH = Dimensions.get('window').width;
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Button } from 'native-base';
import { Rating, CheckBox, Badge } from 'react-native-elements';
import styles from './index.style';
import ProgressCircle from 'react-native-progress-circle'
import ReadMore from 'react-native-read-more-text';
import moment from 'moment';
import { 
    get_conversation 
} from '../../services/getConversation';
import { connect } from 'react-redux';

const ProfileCard = props => {
    
    const { data, lastPingTime } = props;

    const [time, setTime] = useState(moment().format("hh:mm A"))
    const [online, setOnline] = useState( data.is_online == 1 ? true : false)

    const renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: 'blue', marginTop: 5 , alignSelf : 'center'}} onPress={handlePress}>
            See more
          </Text>
        );
      }

    const renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{ color : 'blue', marginTop: 5 ,  alignSelf : 'center'}} onPress={handlePress}>
            See less
          </Text>
        );
    }
   
    const handleContact = async (username) => {
        const response = await get_conversation(props.token, username);
        if (response.status === 1) {
          props.navigation.navigate('ChatScreen', { 'user': response.data.opponent, 'user_data': data })
        } else {
          Alert.alert('Error while contact.')
        }
    }

    useEffect(() => {
        const socket = global.socket
        socket.on('user_message', (data) => {
          const userMessage = JSON.parse(data)
          if (userMessage.type == "user_login") {
            if (props.data.id == userMessage.data.user_id) {
              console.log("in root card socket connection use online...............", data)
              setOnline(true)
            }
          } else if (userMessage.type == "user_logout") {
            if (props.data.id == userMessage.data.user_id) {
              console.log("in root card socket connection use offline...............", data)
              setOnline(false)
            }
          }
        })
      }, [])

    useEffect(() => {
        setInterval(() => {
           setTime(moment().format("hh:mm A"))
        }, 6000)
    }, [])

    console.log('data',data)
    const getContactView = () => {
        return (
            <View style={styles.card}>
                <View style={styles.onlineOfflineViewStyle}>
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius : 50
                        }}
                        source={
                            online ?
                                require('../../assets/icons/online.png') :
                                require('../../assets/images/cross.png')}
                    />
                    <Text style={{ color: online ? 'gray' : 'red', fontWeight: '700', marginLeft: 5 }}>
                        {online ? 'ONLINE' : 'OFFLINE'}
                    </Text>
                </View>
                <View style={styles.profileDetailsViewStyle}>
                    <Image
                        style={styles.contactProfileImageStyle}
                        source={ data.profile ? { uri : data.profile } :  require('../../assets/images/profilepic.png')}
                    />
                    <TouchableOpacity
                    onPress={() =>{
                    console.log('openprofile',props.r_user_id)  
                    props.navigation.navigate('Profile', {
                    user_id: data.id,
                    root_id: props.rootId
                    })}}
                    style={{flexDirection: 'row', justifyContent:'center',alignItems:'center' }}>
                    <Text style={styles.profileNameStyle}>
                        {data.name}
                    </Text>
                    </TouchableOpacity>
                    <View style={{ 
                        display: 'flex' , 
                        flexDirection: 'row' , 
                        justifyContent: 'center',
                        alignContent:'center' 
                    }}>
                    {
                        data.rating ? 
                            <>
                            <Rating
                            readonly
                            imageSize={20}
                            startingValue={data.rating}
                           /> 
                             <Text style={styles.ratingTextStyle}>{data.rating}</Text>
                             <Text style={{ fontSize: 14, paddingLeft: 5 }}>({data.rating_count})</Text>
                           </>
                           : null
                    }
                    </View>
                   
                    <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={renderTruncatedFooter}
                    renderRevealedFooter={renderRevealedFooter}
                    >
                    <Text
                        style={styles.descriptionStyle} >
                        {data.description}
                    </Text>
                    </ReadMore>
                </View>
                <View style={styles.doshline} />
                    {/* {
                         data.isPrifilePage ? 
                         <>
                         <View style={styles.progressViewStyle}>
                            <View
                                style={styles.progressContainerStyle}
                            >
                                <ProgressCircle
                                    percent={30}
                                    radius={50}
                                    borderWidth={8}
                                    color="#2EC09C"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text style={styles.progressTitleStyle}>{'30%'}</Text>
                                </ProgressCircle>
                                <Text style={styles.progressSubitleStyle}>Completed Orders</Text>
                            </View>
                            <View
                                style={styles.progressContainerStyle}
                            >
                                <ProgressCircle
                                    percent={30}
                                    radius={50}
                                    borderWidth={8}
                                    color="#2EC09C"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text style={styles.progressTitleStyle}>{'30%'}</Text>
                                </ProgressCircle>
                                <Text style={styles.progressSubitleStyle}>Delivared On Time</Text>
                            </View>
                        </View>
                        <View style={styles.doshline} />
                        </>
                        : null
                    } */}
               
                <View style={styles.tableContent}>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Country</Text>
                        <View style={styles.tableItemRightSide}>
                            <Image
                                style={{ width: 20, height: 20, paddingLeft: 10 }}
                                source={{ uri : data.flag }}
                            />
                            <Text style={styles.tableItemRightText}> {data.country}</Text>
                        </View> 
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Response Time</Text>
                        <View style={styles.tableItemRightSide}>
                            {
                                data.response_time ? <Text style={styles.tableItemRightText}>{data.response_time}</Text> : null
                            }
                        </View>
                    </View>
                    {
                        data.recent_delivery ? 
                        <View style={styles.tableItem} >
                            <Text style={styles.tableItemTitle}>Recent Delivery</Text>
                            <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}>{data.recent_delivery}</Text>
                            </View>
                        </View>
                        : null
                    }
                    {
                        !online ? 
                        <View style={styles.tableItem} >
                            <Text style={styles.tableItemTitle}>Last Seen</Text>
                            <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}>{lastPingTime}</Text>
                            </View>
                        </View>
                        : null
                    }
                  
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Local Time</Text>
                        <View style={styles.tableItemRightSide}>
                          <Text style={styles.tableItemRightText}>{time}</Text>
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Language</Text>
                        <View style={styles.tableItemRightSide}>
                        <Text style={styles.tableItemRightText}>{ `${data.preffered_language}` } { data.additional_language ? ` , ${data.additional_language}` : null  }</Text>
                        </View>
                    </View>
                    {/* { data.skills.length > 0 ? 
                        <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }} >
                        { data.skills.map(item=>(
                                <Badge
                                    status="primary"
                                    value={item.toUpperCase()}
                                    badgeStyle={{ borderRadius: 2, margin: 3 , padding : 5 }}
                                />
                            ))}
                        </View>
                        :
                        null
                    }   */}
                    <>
                        {data.id != props.id && <Button onPress={() => handleContact(data.name)} info style={styles.buttons}>
                            <Text style={styles.buttonsText}> 
                            CONTACT 
                            </Text>
                        </Button>}
                        <View style={styles.doshline} />
                        <View style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'center',
                            alignContent:'center'
                        }} >
                           <Image style={{ 
                               flex:1,
                               marginTop: 15, 
                               justifyContent: 'flex-end'
                            }} 
                            resizeMode={'contain'} 
                             source={{uri : 'https://cdn.talentsroot.com/image/secure-icon.png'}}/>
                            <View style={{
                                flex:4,
                                flexDirection: 'column', 
                                marginLeft: 20,
                                paddingVertical:10
                            }}>
                                <Text 
                                 style={{fontSize: 17,  marginTop: 15 ,fontWeight: 'bold'}}>
                                    100% Secure
                                </Text>
                                <Text 
                                 style={{ fontSize: 12, color : '#748f9e'}}>
                                     If you never accept any communications or payments outside talentsroots.
                                </Text>
                            </View>
                        </View> 
                    </>
                        
                </View>
            </View>
        )
    }

    return (
        <>
        {/*Contact Section*/}
        {getContactView(data)}
        </>
    );
};

const mapStateToProps = state => {
    return {
      token: state.LoginUser.userToken,
      id: state.LoginUser.user_id,
      review: state.addRoot,
    };
  };
  
  
export default connect (mapStateToProps)(ProfileCard);
