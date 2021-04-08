import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Dash from 'react-native-dash';
import Header from '../../commons/header';
import DrawerWrapper from '../../commons/rightDrawerWrapper';

const TransactionPage = () => {
  return (
    <DrawerWrapper {...props}>
      <View>
        <ScrollView style={styles.container}>
          {/* Timer */}
          <View
            style={{
              borderRadius: 16,
              padding: 10,
              borderWidth: 1,
              borderColor: '#E8EEF1',
            }}>
            <CountDown
              until={3600 * 24 * 4 + 3600 * 10 + 60 * 10 + 30}
              size={25}
              onFinish={() => alert('Finished')}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: '#43ceaf'}}
              timeLabels={{d: '', h: '', m: '', s: ''}}
              separatorStyle={{color: '#43ceaf'}}
              timeToShow={['D', 'H', 'M', 'S']}
              showSeparator
            />
          </View>

          {/* Order Description */}
          <View
            style={{
              marginTop: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E8EEF1',
            }}>
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 105,
                    width: 146,
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{height: null, width: null, flex: 1}}
                    source={require('../../assets/images/1.png')}
                  />
                </View>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{height: null, width: null, flex: 1}}
                      source={require('../../assets/icons/avatar.png')}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>Jack Adams</Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: '#748F9E',
                      }}>
                      LOGO DESIGN
                    </Text>
                    <Text
                      style={{
                        marginTop: 20,
                        fontSize: 8,
                        textDecorationLine: 'underline',
                        color: '#748F9E',
                      }}>
                      ORDER 1212412
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <Text
                  style={{color: '#43ceaf', fontSize: 16, fontWeight: 'bold'}}>
                  $20.00
                </Text>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 10,
                      textDecorationLine: 'underline',
                      color: '#748F9E',
                    }}>
                    VIEW INVOICE
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 10,
                      textDecorationLine: 'underline',
                      color: '#748F9E',
                    }}>
                    Jul 30, 2019
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#748F9E',
                }}>
                I will design a modern, minimalist logo.
              </Text>
            </View>
            <Dash
              dashColor="#E8EEF1"
              style={{marginTop: 10, width: '100%', height: 1}}
            />

            <View style={{padding: 10}}>
              <Text style={{fontSize: 12}}>Instruction to the Buyer</Text>
              <Text style={{marginTop: 10, fontSize: 11, color: '#748F9E'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.{' '}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E8EEF1',
            }}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 10}}>SEND A MESSAGE TO JOHN SMITH</Text>
                <View
                  style={{
                    marginTop: 10,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 16,
                      width: 16,
                      borderRadius: 8,
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
                      fontSize: 10,
                      color: '#43CEAF',
                      fontWeight: 'bold',
                    }}>
                    ONLINE
                  </Text>
                </View>
              </View>
              <Text style={{fontSize: 8, color: '#748F9E'}}>
                LOCAL TIME 1:30 AM
              </Text>
            </View>
            <Dash
              dashColor="#E8EEF1"
              style={{marginTop: 10, width: '100%', height: 1}}
            />

            <View style={{padding: 10}}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{height: 14, width: 14, overflow: 'hidden'}}>
                  <Image
                    style={{height: null, width: null, flex: 1}}
                    source={require('../../assets/icons/plus.png')}
                  />
                </View>
                <TextInput
                  placeholder="Type a message..."
                  placeholderTextColor="#748F9E"
                  style={{
                    marginLeft: 10,
                    flex: 5,
                    fontSize: 10,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#DDE1EF',
                    borderRadius: 16,
                  }}
                />
              </View>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>SEND</Text>
              </View>
            </View>
          </View>

          <View style={{height: 120}} />
        </ScrollView>
      </View>
    </DrawerWrapper>
  );
};

export default TransactionPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contactContainer: {
    marginTop: 20,
    marginHorizontal: 80,
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
