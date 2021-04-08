import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const SCREEN_WIDTH = Dimensions.get('window').width;
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { Button } from 'native-base';
import { Rating, CheckBox, Badge } from 'react-native-elements';
import styles from './index.style';
import ProgressCircle from 'react-native-progress-circle'
import ReadMore from 'react-native-read-more-text';
import moment from 'moment';

const ProfileCard = props => {
   
    const renderTruncatedFooter = (handlePress) => {
        return (
            <View style={styles.seeMoreView}>
                <Text style={styles.seeMoreText} onPress={handlePress}>
                    See more
                </Text>
                <View
                 style={styles.downArrow}
                >
                    <Icon 
                    name='sort-down' 
                    size={15} 
                    color='#10A2EF' />
                </View>
          </View>
        );
    }

    const renderRevealedFooter = (handlePress) => {
        return (
            <View style={styles.seeMoreView}>
            <Text style={styles.seeMoreText} onPress={handlePress}>
                See less
            </Text>
            <View
             style={styles.upArrow}
            >
                <Icon 
                name='sort-up' 
                size={15} 
                color='#10A2EF' />
            </View>
           </View>
        );
    }
    
    const { data , handleContact , isContact } = props;
    const [online, setOnline] = useState( data.is_online == 1 ? true : false)

    useEffect(() => {
        const socket = global.socket
        socket.on('user_message', (data) => {
          const userMessage = JSON.parse(data)
          if (userMessage.type == "user_login") {
            if (props.data.id == userMessage.data.user_id) {
              console.log("in profile card socket connection use online...............", data)
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
                                require('../../../../assets/icons/online.png') :
                                require('../../../../assets/images/cross.png')}
                    />
                    <Text style={{ color: online ? 'gray' : 'red', fontWeight: '700', marginLeft: 5 }}>
                        {online ? 'ONLINE' : 'OFFLINE'}
                    </Text>
                </View>
                <View style={styles.doshline} />
                <View style={styles.profileDetailsViewStyle}>
                    <Image
                        style={styles.contactProfileImageStyle}
                        source={ data.profile ? 
                        { uri : data.profile } :  
                        require('../../../../assets/images/profilepic.png')
                        }
                    />
                    <Text style={styles.profileNameStyle}>
                        {data.name}
                    </Text>
                    <View style={{alignItems:'center'}}>
                    {
                        data.rating_count != '' && (
                        <View style={{flexDirection: 'row', alignContent:'center'}}>
                            <Rating
                            readonly
                            imageSize={20}
                            startingValue={data.rating}
                            />
                            <Text style={{color:'#fcb059'}}>{JSON.stringify(data.rating).length == 1 ?data.rating+'.0':data.rating}</Text>
                            <Text style={{fontWeight: '700', marginLeft:3}}>({data.rating_count})</Text>
                        </View>)
                    }
                    </View>
                    <Text style={{textAlign:'center', color:'#748f9e', fontWeight: '700'}}>{data.orders_in_queue} orders in queue</Text>
                    {
                        data.type === 1 ? 
                        <Text style={styles.buyerText}>
                            Buyer
                        </Text>
                        : 
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
                    }
                    {
                        !isContact ? 
                        <Button 
                        onPress={() => props.navigation.navigate('EditProfile')} 
                        style={styles.editButtonStyle}>
                            <Text style={styles.buttonsText}> 
                             EDIT PROFILE 
                            </Text>
                        </Button>
                        : 
                        <>
                        <Button onPress={() => handleContact(data.name)} info style={styles.buttons}>
                            <Text style={styles.buttonsText}> 
                              CONTACT 
                            </Text>
                        </Button>
                        {/* <View style={styles.doshline} />
                        <View style={{ display: 'flex', justifyContent: 'center' }} >
                            <Image
                                style={styles.securityImageStyle}
                                source={require('../../../../assets/images/secureText.png')}
                            />
                        </View>  */}
                        </>
                    }
                </View>
                <View style={styles.doshline} />
                {
                    parseInt(data.completedOrderPercentage) !== 0 || parseInt(data.deliveredOnTimePercentage) !== 0 ? 
                    <>
                        <View style={styles.progressViewStyle}>
                            {
                                parseInt(data.completedOrderPercentage) !== 0 ? 
                                <View
                                    style={styles.progressContainerStyle}
                                >
                                    <ProgressCircle
                                        percent={data.completedOrderPercentage}
                                        radius={50}
                                        borderWidth={8}
                                        color="#2ec09c"
                                        shadowColor="#f8fafc"
                                        bgColor="#fff"
                                    >
                                        <Text style={styles.progressTitleStyle}>{`${data.completedOrderPercentage}%`}</Text>
                                    </ProgressCircle>
                                    <Text style={styles.progressSubitleStyle}>Completed Orders</Text>
                                </View>
                                : null
                            }
                            {
                                parseInt(data.deliveredOnTimePercentage) !== 0 ? 
                                <View
                                    style={styles.progressContainerStyle}
                                >
                                    <ProgressCircle
                                        percent={data.deliveredOnTimePercentage}
                                        radius={50}
                                        borderWidth={8}
                                        color="#2ec09c"
                                        shadowColor="#f8fafc"
                                        bgColor="#fff"
                                    >
                                        <Text style={styles.progressTitleStyle}>{`${data.deliveredOnTimePercentage}%`}</Text>
                                    </ProgressCircle>
                                    <Text style={styles.progressSubitleStyle}>Delivered On Time</Text>
                                </View> : null
                            }
                     </View>
                    <View style={styles.doshline} />
                    </>
                    : null
                }
                <View style={styles.tableContent}>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Country</Text>
                        <View style={styles.tableItemRightSide}>
                            <Image
                                style={{ width: 32, height: 20, paddingLeft: 10 }}
                                source={{ uri : data.flag }}
                            />
                            <Text style={styles.tableItemRightText}> {data.country}</Text>
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Member Since</Text>
                        <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}>{data.member_since}</Text>
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
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Recent Delivery</Text>
                        <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}> Since 1 month</Text>
                        </View>
                    </View>
                    {
                        !online ? 
                        <View style={styles.tableItem} >
                            <Text style={styles.tableItemTitle}>Last Seen</Text>
                            <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}>{moment.unix(data.last_ping_time).fromNow()}</Text>
                            </View>
                        </View>
                        : null
                    }
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Local Time</Text>
                        <View style={styles.tableItemRightSide}>
                        <Text style={styles.tableItemRightText}>{data.local_time}</Text>
                        </View>
                    </View>
                        <View style={styles.tableItem} >
                            <Text style={styles.tableItemTitle}>Languages</Text>
                            <View style={styles.tableItemRightSide}>
                                <Text style={styles.tableItemRightText}>{ `${data.preffered_language ? data.preffered_language : ''}` } { data.additional_language ? ` , ${data.additional_language}` : ''  }</Text>
                            </View>
                        </View>
                    <View style={{ display: 'flex', flexDirection: 'row',flexWrap: 'wrap', paddingTop: 20}} >
                      { data.skills && data.skills.length > 0 ? 
                        data.skills.map(item=>(
                        <Badge
                        value={(item).toUpperCase()}
                        badgeStyle={{ borderRadius: 2, margin: 5,paddingVertical:10 ,backgroundColor:'#00C19D'  }}
                        />
                        )) :
                        null
                      }  
                        {/* <Badge
                            status="primary"
                            value='LARAVEL'
                            badgeStyle={{ borderRadius: 2, margin: 5 }}
                        /> */}
                    </View>
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

export default ProfileCard;
