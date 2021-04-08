import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import DrawerWrapper from '../../commons/rightDrawerWrapper';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.navigation.getParam('name', '');
    this.profile = this.props.navigation.getParam('profile', '');
    this.responseTime = this.props.navigation.getParam('responseTime', '');
    this.state = {
      messages: [],
      hide: false,
    };
  }

  componentWillReceiveProps = props => {
    console.log("receive props chat",props)
    this.name = props.navigation.getParam('name', '');
    this.profile = props.navigation.getParam('profile', '');
    this.responseTime = props.navigation.getParam('responseTime', '');
    this.componentDidMount()
  };
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello , How can I help you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: this.name,
            avatar: this.profile,
          },
        },
      ],
      hide: false
    });
  }

  onSend(messages) {
    this.sendMessage(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      hide: true,
    }));
  }
  sendMessage = messages => {
    console.log('messages', messages);
    return fetch('https://socket.lembits.in/send', {
      method: 'POST',
      headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        'Content-Type': 'application/json',
        'auth-token': this.props.token,
      },
      body: JSON.stringify({
        data: messages,
      }),
    })
      .then(response => {
        console.log('chat', response);
        return response.json();
      })
      .then(json => {
        return json;
      });
  };

  renderActions = () => {
    return (
      <View style={{paddingVertical: 6, paddingLeft: 10}}>
        <TouchableOpacity style={{marginBottom: 6}}>
          <Image source={require('../../assets/icons/smile.png')} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Image source={require('../../assets/icons/file.png')} />
        </TouchableOpacity> */}
      </View>
    );
  };

  render() {
    return (
      <DrawerWrapper {...this.props}>
        {/* <ScrollView style={{ flex: 1 }}> */}
        <View style={{flex: 1}}>
          {!this.state.hide && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View
                style={{
                  marginTop: 10,
                  height: 60,
                  width: 60,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{height: null, width: null, flex: 1}}
                  source={
                    this.profile
                      ? {uri: this.profile}
                      : require('../../assets/icons/largeAvatar.png')
                  }
                />
              </View>
              <Text style={{marginTop: 6}}>{this.name}</Text>
              <Text style={{marginTop: 6, color: '#a1a1a1'}}>
                {/* AVERAGE RESPONSE TIME {new Date(this.responseTime).getHours()} */}
              </Text>
            </View>
          )}
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            alwaysShowSend
            renderActions={this.renderActions}
            user={{
              _id: 1,
            }}
          />
          {/* </ScrollView> */}
        </View>
        {/* </ScrollView> */}
      </DrawerWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.LoginUser.userToken,
  };
};

const chat = connect(mapStateToProps, null)(ChatScreen);
export default chat;
