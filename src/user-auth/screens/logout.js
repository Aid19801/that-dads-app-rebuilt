import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

class LogoutPage extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>You have logged out</Text>
                <Button>Back To Login</Button>
            </View>
        )
    }
}

export default LogoutPage;

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
  });