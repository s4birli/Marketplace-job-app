import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";


class Header extends React.Component {
  render() {
    return (
      <View style={styles.header_container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => this.props.navigation.openDrawer()}>
            <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/account.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center', flex: 1 }} onPress={() => this.props.navigation.navigate('Root')}>
            <Image
              style={{ height: 70, width: 180 }}
              resizeMode={"contain"}
              source={{uri:'https://cdn.talentsroot.com/image/mobile-logo.png'}}
            />
          </TouchableOpacity>
          <View 
            style={{ 
              borderWidth: 1, 
              borderColor: 'rgba(0,0,0,.1)',  
              borderRadius:5
            }}>
            <TouchableOpacity onPress={this.props.drawer} style={{ paddingVertical: 10, paddingHorizontal: 15}}>
              <Icon size={20} name="bars" style={{color: 'rgba(0,0,0,.5)'}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  header_container: {
    height: 70,
    backgroundColor: '#FFF',
    elevation:1
  },
});
