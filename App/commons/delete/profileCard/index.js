import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProfileCard = props => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileCardUpper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
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
          {
            props.profileData.level ? (
              <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image style = {{height: 26, width: 26}} source={{uri: props.profileData.level}} />
              </View>
            ): <View style = {{height: 26, width: 26, flex: 1, alignItems: 'flex-end'}}/>
          }
          
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
            <Text>
            {props.profileData.first_name} {props.profileData.last_name}
          </Text>
          {/* <View>
            <Image source={require('../../assets/icons/star.png')} />
          </View>
          <Text style={{marginLeft: 10, fontSize: 12, color: '#FCB059'}}>
            4.5 (19)
          </Text> */}
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
          <Text style={{marginBottom: 5, fontSize: 10}}>TIME ZONE</Text>
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
            {props.profileData.timezone}
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

      <View style={styles.profileCardEnd}>
        {/* {props.profileData.skills !="" && renderSkills(props.profileData.skills)} */}
        {/* <View style={styles.contactContainer}>
          <Text style={styles.contactText}>CONTACT</Text>
        </View> */}
      </View>
    </View>
  );
};

// const renderSkills = skills => {
//   let skill = skills.split(',');
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 20,
//       }}>
//       {skill.map((item, index) => {
//         return (
//           <View
//             key={index}
//             style={{
//               paddingVertical: 5,
//               paddingHorizontal: 10,
//               backgroundColor: '#2EC09C',
//               borderRadius: 2,
//             }}>
//             <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold'}}>
//               {item}
//             </Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

export default ProfileCard;

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
    paddingHorizontal: 24,
    paddingVertical: 24,
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
