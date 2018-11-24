import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, AsyncStorage, Button, FlatList, KeyboardAvoidingView } from 'react-native';
import SocketIOClient from 'socket.io-client';

export class ChatPlaceHolder extends Component {
  constructor() {
      super();
      this.state = {
          messages: [],
          newMessage: '',
      }
    this.socket = SocketIOClient('http://127.0.0.1:4001');

    this.socket.on('messages', messages => {
        this.setState({
            messages,
        })
    })
  }  

  sendMessage = async () => {
    const { newMessage } = this.state;
    try {
        await this.socket.emit('newMessage', newMessage);
    } catch (error) {
        console.log('websocket send msg error: ', error);
    } 
  }

  render() {

    console.log('THIS STATE ', this.state);
    return (
        <KeyboardAvoidingView style={styles.container}
        behavior="padding">
            <View style={styles.messagesContainer}>
                    <FlatList
                        inverted
                        data={this.state.messages.reverse()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, i}) => 
                        <View>
                            <Text key={i}>{item.userName}</Text>
                            <Text>{item.message}</Text>
                        </View>
                        }
                    />
                <View style={styles.textInputContainer}>
                    <TextInput onChangeText={(newMessage) => this.setState({ newMessage })} 
                        style={styles.textInput}
                        placeholder="type here..."
                    />
                    <Button title="Send" onPress={() => this.sendMessage()} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
  }
}

export default ChatPlaceHolder;
// onBlur={() => this.keyboardIsHidden()}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: 'black',
    },
    messagesContainer: {
        borderWidth: 2,
        borderColor: 'gold',
        width: '95%',
        height: '90%',
    },
    textInputContainer: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderColor: 'gold',
    },
    textInput: {
        borderWidth: 2,
        borderColor: 'blue',
        height: 60,
        width: '70%',
        fontSize: 30,
    },
    button: {
        borderColor: 'red',
        borderWidth: 2,
        width: '30%',
    }

});