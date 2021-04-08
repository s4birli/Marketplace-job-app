import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';
const UserProfileCard = props => {
  return (
    <View>
      <View style={styles.profileCardEnd}>
        {props.profileData.skills != '' &&
          renderSkills(props.profileData.skills)}
      </View>
    <View style={styles.profileCard}>
      <View style={styles.profileCardUpper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
            {props.profileData.is_online ? (
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 9,
                overflow: 'hidden',
              }}>
              <Image
                style={{height: null, width: null, flex: 1}}
                source={require('../../assets/icons/online.png')}
              />
            </View>
            <Text
              style={{
                marginLeft: 6,
                fontSize: 12,
                color: '#43CEAF',
                fontWeight: 'bold',
              }}>
              ONLINE
            </Text>
          </View>
            ): <Text style = {{color: 'red'}}>Offline</Text>}
          
          <View style={{flex: 3, alignItems: 'center'}}>
            <View
              style={{
                height: 128,
                width: 128,
                borderRadius: 64,
                overflow: 'hidden',
              }}>
              <Image
                style={{height: null, width: null, flex: 1}}
                source={
                  props.profileData.profile
                    ? {uri: props.profileData.profile}
                    : require('../../assets/icons/extraLargeAvatar.png')
                }
              />
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{height: 26, width: 16}}
              source={require('../../assets/icons/badge.png')}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text>
            {props.profileData.first_name} {props.profileData.last_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <View>
            <AirbnbRating
              selectedColor="#ffd700"
              count={5}
              showRating={false}
              size={16}
              defaultRating={props.profileData.rating}
              isDisabled
            />
          </View>
          <Text style={{marginLeft: 10, fontSize: 12, color: '#FCB059'}}>
            ({props.profileData.rating_count})
          </Text>
        </View>

        <View
          style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
          <Text style={{fontSize: 9, color: '#748F9E', textAlign: 'center'}}>
            {props.profileData.description &&
              props.profileData.description.replace(/<[^>]*>?/gm, '')}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#E8EEF1',
          borderBottomWidth: 1,
          width: '100%',
        }}
      />

      <View style={styles.profileCardLower}>
        <View>
          <Text style={{marginBottom: 5, fontSize: 10}}>FROM</Text>
          <Text style={{marginBottom: 5, fontSize: 10}}>AVG RESPONSE TIME</Text>
          {/* <Text style={{marginBottom: 5, fontSize: 10}}>RECENT DELIVERY</Text> */}
          <Text style={{marginBottom: 5, fontSize: 10}}>LAST ONLINE</Text>
          <Text style={{marginBottom: 5, fontSize: 10}}>LANGUAGES</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            {/* <View>
                        <Image source = {require('../../assets/icons/flag.png')}/>
                    </View> */}
            <Text style={{marginLeft: 10, marginBottom: 5, fontSize: 12}}>
              {props.profileData.country &&
                props.profileData.country.toUpperCase()}
            </Text>
          </View>
          <Text style={{marginBottom: 5, fontSize: 10, alignSelf: 'flex-end'}}>
            1 hour
          </Text>
          {/* <Text style={{marginBottom: 5, fontSize: 10, alignSelf: 'flex-end'}}>
            1 MONTH AGO
          </Text> */}
          <Text style={{marginBottom: 5, fontSize: 10, alignSelf: 'flex-end'}}>
            {renderTime(props.profileData.last_ping_time)}
          </Text>
          <Text style={{marginBottom: 5, fontSize: 10, alignSelf: 'flex-end'}}>
            ENGLISH
          </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#E8EEF1',
          borderBottomWidth: 1,
          width: '100%',
        }}
      />

      <View style={{margin:10,justifyContent:'center'}}>
          <Image 
          resizeMode={'center'}
          source={require('../../assets/images/secureText.png')}
          style={{height:70,width:'100%'}}
          />
      </View>
    </View>
    <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Inbox', {
              name:
                props.profileData.first_name +
                ' ' +
                props.profileData.last_name,
              profile:props.profileData.profile,
              responseTime:props.profileData.responseTime
            })
          }
          style={styles.contactContainer}>
          <Text style={styles.contactText}>CONTACT</Text>
        </TouchableOpacity>
    </View>
  );
};

const renderTime = time => {
  const tim = new Date(time);
  let t = tim.toString();
  return t.slice(0, 11);
};

const renderSkills = skills => {
  let skill = skills.split(',');
  return (
    <View
      style={{
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginBottom: 20,
      }}>
      {skill.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              marginHorizontal: 5,
              backgroundColor: '#2EC09C',
              borderRadius: 2,
            }}>
            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold'}}>
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  profileCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8EEF1',
    borderRadius: 16,
    marginBottom: 20,
  },
  profileCardUpper: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileCardLower: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileCardEnd: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contactContainer: {
    marginHorizontal: 25,
    borderRadius: 6,
    backgroundColor: '#10A2EF',
    paddingVertical: 10,
  },
  contactText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
