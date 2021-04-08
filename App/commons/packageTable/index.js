import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const SCREEN_WIDTH = Dimensions.get('window').width;
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Button } from 'native-base';
import { Rating, CheckBox, Badge } from 'react-native-elements';
import styles from './package_table.styles';
import ProgressCircle from 'react-native-progress-circle'

const PackageTable = props => {

    const { data , handleContact } = props;

    const OtherRootsCard = ({ item }) => {
        return (
            <View style={styles.otherRootsCardStyle}>
                <View style={styles.otherRootsImageViewStyle}>
                    <Image
                        style={styles.otherRootsImageStyle}
                        source={{ uri: data.r_root_image }}
                    />
                </View>
                <Text style={styles.otherRootsCardTitleStyle}>
                    I Will Elevate your Ranking, Monthly SEO Services
                </Text>
                <View style={styles.otherRootsProfileViewStyle} >
                    <View style={styles.otherRootsProfileLeftViewStyle} >
                        <Image
                            style={styles.otherRootsProfileLeftViewImageStyle}
                            source={require('../../assets/images/profilepic.png')}
                        />
                        <Text style={styles.otherRootsProfileLeftViewNameStyle}>
                            {data.name}
                        </Text>
                    </View>
                    <View style={styles.otherRootsProfileRightViewStyle} >
                        <Text style={styles.otherRootsProfileRightViewTitleStyle}>
                            New Root
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={styles.otherRootsProfileRightViewSubtitleStyle}>
                            WEB PROGRAMMER
                        </Text>
                    </View>
                </View>
                <View style={styles.doshline} />
                <Text style={styles.otherRootsCardFooterStyle}>
                    $5
                </Text>
            </View>
        )
    }

    const RatingWithCount = ({ rating }) => {
        return (
            <Rating
                readonly
                imageSize={15}
                style={{ alignSelf: 'center', paddingLeft: 10 }}
                startingValue={rating}
            />
        )
    }

    const getContactView = () => {
        return (
            <View style={styles.card}>
                <View style={styles.onlineOfflineViewStyle}>
                    <Image
                        style={{
                            width: 20,
                            height: 20
                        }}
                        source={
                            data.is_online === 1 ?
                                require('../../assets/icons/online.png') :
                                require('../../assets/images/cross.png')}
                    />
                    <Text style={{ color: data.is_online === 1 ? 'gray' : 'red', fontWeight: '700', marginLeft: 5 }}>
                        {data.is_online === 1 ? 'ONLINE' : 'OFFLINE'}
                    </Text>
                </View>
                <View style={styles.profileDetailsViewStyle}>
                    <Image
                        style={styles.contactProfileImageStyle}
                        source={ data.profile ? { uri : data.profile } :  require('../../assets/images/profilepic.png')}
                    />
                    <Text style={styles.profileNameStyle}>
                        {data.name}
                    </Text>
                    <Rating
                        readonly
                        imageSize={20}
                        startingValue={data.r_rating_count}
                    />
                    <Text style={styles.companyNameStyle}>Technology</Text>
                    {
                        data.isPrifilePage ? 
                        <Button info style={styles.editButtonStyle} onPress={()=>{props.navigation.navigate('EditProfile')}}><Text style={styles.buttonsText}> EDIT PROFILE </Text></Button>
                        : null
                    }
                </View>
                <View style={styles.doshline} />
                    {
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
                    }
               
                <View style={styles.tableContent}>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Country</Text>
                        <View style={styles.tableItemRightSide}>
                            <Image
                                style={{ width: 20, height: 20, paddingLeft: 10 }}
                                source={require('../../assets/images/flag.jpg')}
                            />
                            <Text style={styles.tableItemRightText}> {data.country}</Text>
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Member Since</Text>
                        <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}>January 01,2020</Text>
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Response Time</Text>
                        <View style={styles.tableItemRightSide}>
                            {
                                data.response_time ? <Text style={styles.tableItemRightText}> {Math.floor(data.response_time * 0.00027777778)} hours</Text> : null
                            }
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Recent Delivery</Text>
                        <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}> Since 1 month</Text>
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Local Time</Text>
                        <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}> 4:59 pm</Text>
                        </View>
                    </View>
                    <View style={styles.tableItem} >
                        <Text style={styles.tableItemTitle}>Language</Text>
                        <View style={styles.tableItemRightSide}>
                            <Text style={styles.tableItemRightText}>English,Hindi</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }} >
                        <Badge
                            status="primary"
                            value='PHP'
                            badgeStyle={{ borderRadius: 2, margin: 5 }}
                        />
                        <Badge
                            status="primary"
                            value='LARAVEL'
                            badgeStyle={{ borderRadius: 2, margin: 5 }}
                        />
                    </View>
                    {
                         !data.isPrifilePage ? 
                         <>
                        <Button onPress={() => handleContact(data.name)} info style={styles.buttons}>
                            <Text style={styles.buttonsText}> 
                              CONTACT 
                            </Text>
                        </Button>
                        <View style={styles.doshline} />
                        <View style={{ display: 'flex', justifyContent: 'center' }} >
                            <Image
                                style={styles.securityImageStyle}
                                resizeMode={'contain'}
                                source={require('../../assets/images/secureText.png')}
                            />
                        </View> 
                        </>
                        : null
                    }
                </View>
            </View>
        )
    }

    return (
        <>
                {/*Contact Section*/}
                {getContactView(data)}
                {/*Reviews Section*/}
                <View style={styles.card}>
                    <View style={styles.reviewSectionViewStyle}>
                        <View style={styles.reviewSectionHeaderViewStyle}>
                            <View style={styles.reviewSectionHeaderTitleViewStyle}>
                                <Text style={styles.description}>Reviews</Text>
                                <Rating
                                    readonly
                                    imageSize={25}
                                    style={{ alignSelf: 'center', paddingLeft: 10 }}
                                    startingValue={data.r_rating_count}
                                />
                                <Text style={{ fontSize: 15, paddingLeft: 10 }}>(1)</Text>
                            </View>
                            <View style={styles.reviewSectionHeaderSubtitleViewStyle}>
                                <Text style={styles.reviewSectionHeaderSubtitleTextStyle}>
                                    COMMUNICATION LEVEL
                                </Text>
                                <RatingWithCount rating={data.r_rating_count} />
                            </View>
                            <View style={styles.reviewSectionHeaderSubtitleViewStyle}>
                                <Text style={styles.reviewSectionHeaderSubtitleTextStyle}>
                                    QUALITY OF WORK
                                </Text>
                                <RatingWithCount rating={data.r_rating_count} />
                            </View>
                            <View style={styles.reviewSectionHeaderSubtitleViewStyle}>
                                <Text style={styles.reviewSectionHeaderSubtitleTextStyle}>
                                    RECOMMEND TO OTHERS
                                </Text>
                                <RatingWithCount rating={data.r_rating_count} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.doshline} />
                    <View style={styles.reviewMessagesViewStyle}>
                        <View style={styles.reviewMessageViewStyle} >
                            <Image
                                style={styles.profileImageStyle}
                                source={require('../../assets/images/profilepic.png')}
                            />
                            <View style={styles.profileDetailViewStyle}>
                                <View style={{ display: 'flex', flexDirection: 'row' }} >
                                    <Text style={styles.profileDetailTextStyle}>
                                        Himanshu
                                    </Text>
                                    <RatingWithCount rating={data.r_rating_count} />
                                </View>
                                <Text style={styles.reviewMessageTextStyle} >Great Job</Text>
                                <Text style={styles.reviewMessageTimeStyle} >Since 1 month</Text>
                            </View>
                        </View>
                        <View style={[styles.reviewMessageViewStyle, { paddingLeft: 50, paddingTop: 20 }]} >
                            <Image
                                style={styles.profileImageStyle}
                                source={require('../../assets/images/profilepic.png')}
                            />
                            <View style={styles.profileDetailViewStyle}>
                                <View style={{ display: 'flex', flexDirection: 'row' }} >
                                    <Text style={styles.profileDetailTextStyle}>
                                        {data.name}
                                    </Text>
                                    <RatingWithCount rating={data.r_rating_count} />
                                </View>
                                <Text style={styles.reviewMessageTextStyle} >Thanks</Text>
                                <Text style={styles.reviewMessageTimeStyle} >Since 1 month</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/*Other Roots Section*/}
                <View>
                    <View style={styles.otherRootsTitleStyle}>
                        <Text style={styles.description}>
                            Other roots by
                        </Text>
                        <Text style={[styles.description, { color: 'blue', paddingLeft: 10 }]}>
                            {data.name}
                        </Text>
                    </View>
                    {/*Other roots Section*/}
                    {
                        data.rootFiles && data.rootFiles.length > 0 ?
                            <View style={{ paddingVertical: 10 }}>
                                <FlatList
                                    horizontal
                                    data={data.rootFiles}
                                    renderItem={({ item }) => <OtherRootsCard item={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            : null
                    }
                </View>
        </>
    );
};

export default PackageTable;
