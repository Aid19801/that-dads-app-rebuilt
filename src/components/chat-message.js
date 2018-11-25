import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, AsyncStorage, Button, FlatList, KeyboardAvoidingView, Platform } from 'react-native';


const ChatMessage = (props) => (
    <View style={styles.container}>
        <Text style={styles.userName}>{props.userName}</Text>
        <Text style={styles.font}>{props.message}</Text>
    </View>
);

export default ChatMessage;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 8,
        borderRadius: 10,
    },
    userName: {
        color: 'lightgrey',
        fontSize: 20,
        textAlign: 'right',
    },
    font: {
        ...Platform.select({
          ios: {
            fontFamily: 'Bradley Hand',
            marginLeft: 18,
            fontSize: 40,
            color: '#423C67',
          },
          android: {
            fontFamily: 'gamezop',
            marginLeft: 18,
            fontSize: 30,
            color: '#423C67',
          }
        })
      }
});