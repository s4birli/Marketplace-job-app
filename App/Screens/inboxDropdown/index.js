import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

import Header from '../../commons/header';
import DrawerWrapper from '../../commons/rightDrawerWrapper';

componentDidMount = ( ) => {
  console.log("toekn",this.props);
}

const INBOX = [
  {
    id: 1,
    name: 'Taylor Davis',
    avatar: require('../../assets/icons/largeAvatar.png'),
    message: 'Ordered From you',
  },

  {
    id: 2,
    name: 'Taylor Davis',
    avatar: require('../../assets/icons/largeAvatar.png'),
    message:
      'We dont check replies to this email address, so please dont reply in this message. If you have a question, go to Help & Contact.',
  },

  {
    id: 3,
    name: 'Taylor Davis',
    avatar: require('../../assets/icons/largeAvatar.png'),
    message:
      'We dont check replies to this email address, so please dont reply in this message. If you have a question, go to Help & Contact.',
  },
  {
    id: 4,
    name: 'Taylor Davis',
    avatar: require('../../assets/icons/largeAvatar.png'),
    message:
      'We dont check replies to this email address, so please dont reply in this message. If you have a question, go to Help & Contact.',
  },
];

const MyReviews = props => {
  console.log("++++++++++++++++++++++++++++++++++++++++", props)
  return (
    <DrawerWrapper {...props}>
      <View>
        <View>
          <FlatList
            data={INBOX}
            renderItem={({item}) => (
              <View>
                <View style={styles.inboxEach}>
                  <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={styles.avatarContainer}>
                      <Image style={styles.avatar} source={item.avatar} />
                    </View>
                    <View style={{marginLeft: 20}}>
                      <Text style={styles.userName}>{item.name}</Text>
                      <Text numberOfLines={1} style={styles.message}>
                        {item.message}
                      </Text>
                    </View>
                  </View>

                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={styles.time}>1.54 PM</Text>
                  </View>
                </View>
                <View style={styles.separator} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{marginTop: 20}}>
            <Text style={styles.seeAll}>SEE ALL</Text>
          </View>
        </View>
      </View>
    </DrawerWrapper>
  );
};

export default MyReviews;

const styles = StyleSheet.create({
  inboxEach: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  userName: {
    fontSize: 14,
    color: '#748F9E',
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
});
