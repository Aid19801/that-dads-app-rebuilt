import React, { Component } from 'react';
import { compose } from 'redux';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import FirebaseFactory from '../firebase';

class RegPage extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    register = async () => {
        try {
            let user = await this.props.signUp();
            console.log('reg.js | register | created User: ', user);
        } catch (error) {
            console.log('reg.js | register() catch : ', error);
        }
    }

    render() {
        return (
            <View style={styles.container}>

            <View style={styles.loginInputsContainer}>
            
            <Text>That Dads App | Register </Text>

                <View style={styles.textInputContainer}>
                    <TextInput 
                        placeholder="email"
                        style={styles.textInput}
                        onChangeText={this.handleEmail}
                        />
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="password"
                        style={styles.textInput}
                        secureTextEntry={false}
                        onChangeText={this.handlePassword}
                        />
                </View>

                <Button title="Register Me!" onPress={() => this.register()} />
                <Button title="DestroyAsync" onPress={() => this.props.destroyAsync()} />
            </View>
        </View>
        )
    }
}

export default compose(
    FirebaseFactory,
)(RegPage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        backgroundColor: 'skyblue',
        borderWidth: 2,
        borderColor: 'blue',
        width: '100%',
    },
    loginInputsContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        marginTop: 150,
        paddingTop: 20,
        paddingBottom: 30,
    },
    textInputContainer: {
        borderWidth: 4,
        borderColor: 'grey',
        width: '90%',
        height: '50%',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    textInput: {
        color: 'black',
        fontSize: 30,
        height: '100%',
    }
  });