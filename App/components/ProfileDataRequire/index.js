import React from 'react';
import {
    Text,
    View
} from 'react-native';
import styles from './index.styles'

const ProfileDataRequire = (props) => {
    return(
        <>
         <View 
          style={styles.container}
         >
             <Text 
              style={styles.titleText}
             >
               Please complete your profile to post a new root,
             </Text>
             <Text
             style={styles.link}
             onPress={() => props.navigation.navigate('EditProfile')}
             >
              Click here to fill all mandatory fields
             </Text>
         </View>
        </>
    )
}

export default ProfileDataRequire;

