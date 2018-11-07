import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

class LoginError extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>An Error Has Occurred</Text>
            <Text>Please try logging in again...</Text>
                <Button>Back To Login</Button>
            </View>
        )
    }
}

export default LoginError;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 1,
        borderColor: 'blue',
        width: '100%',
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: 'pink',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        width: '70%',
        height: '10%',
    },
    textInput: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
        height: '100%',
    },
  });