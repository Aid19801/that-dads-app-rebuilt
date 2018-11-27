import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, TextInput, ActivityIndicator, Button, FlatList, KeyboardAvoidingView } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { ChatMessage } from '../../components';

export class ChatPage extends Component {
  constructor() {
      super();
      this.state = {
          messages: [],
          newMessage: '',
      }

    // chat mocks
    // this.socket = SocketIOClient('http://127.0.0.1:4001');
    this.socket = SocketIOClient('https://that-dads-chat-server.herokuapp.com');

    this.socket.on('messages', messages => {
        this.setState({
            messages,
        })
    })
  }  

  sendMessage = async () => {
    const { newMessage } = this.state;
    const { userName, id } = this.props;

    let msgObject = {
      userId: id,
      userName: userName,
      message: newMessage,
      timestamp: Date.now().toString(),
    };

    try {
        await this.socket.emit('newMessage', msgObject);
    } catch (error) {
        console.log('websocket send msg error: ', error);
    }

    this.setState({
        newMessage: '',
    })
  }

  componentWillMount = () => {
    this.props.pageLoading();
  }

  render() {

    console.log('chat | THIS STATE ', this.state);
    console.log('chat | this.props ', this.props);

    if (this.state.messages.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior="padding">
            <View style={styles.messagesContainer}>
                    <FlatList
                        inverted
                        data={this.state.messages.reverse()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, i}) => 
                        
                        
                        <ChatMessage
                            userName={item.userName}
                            message={item.message}
                        />

                        }
                    />
                <View style={styles.textInputContainer}>
                    <TextInput onChangeText={(newMessage) => this.setState({ newMessage })} 
                        style={styles.textInput}
                        value={this.state.newMessage}
                        placeholder="type msg here..."
                    />
                    <View style={styles.buttonContainer}>
                        <Button color="white" title="Send" onPress={() => this.sendMessage()} />
                    </View>
                    
                </View>
            </View>
        </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.chat.isLoading,
        uid: state.homepage.uid,
        id: state.profile.id,
        userName: state.profile.userName,
    }   
}


const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'CHAT_PAGE_LOADING'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: '#CBC9D4',
    },
    loading: {
        marginTop: 100,
    },
    messagesContainer: {
        width: '95%',
        height: '90%',
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        width: '100%',
        marginTop: 15,
    },
    textInput: {
        height: 60,
        width: '70%',
        fontSize: 30,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 1,
    },
    buttonContainer: {
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    button: {
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        width: '30%',
    }

});