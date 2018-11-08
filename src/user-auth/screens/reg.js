import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import FirebaseFactory from '../firebase';
import { REG_PAGE_LOADED, REG_PAGE_LOADING, USER_REGISTERING, USER_LOGIN_SUCCESS } from '../constants';
class RegPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleEmail = (email) => {
        this.setState({
            email,
        })
    }

    handlePassword = (password) => {
        this.setState({
            password,
        })
    }

    register = async () => {
        const { email, password } = this.state;
        this.props.userRegistering();
        try {
            let regStatus = await this.props.signUp(email, password);
            console.log('reg.js | register | created User: ', regStatus);

            if (regStatus && regStatus.user.email) {
                console.log('user registered and the email is: ', regStatus.user.email);
                this.props.userLoggedIn(regStatus.user.uid);
                this.props.navigation.navigate('Home');
            }

        } catch (error) {
            console.log('reg.js | register() catch : ', error);
        }
    }

    render() {

        if (this.props.isLoading) {
            return (
                <View style={styles.container}>
                    <View style={styles.textInputContainer}>
                        <Text>LOADING... </Text>
                    </View>
                </View>
            )
        }
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

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading,
    isLoaded: state.login.isLoaded,
    uid: state.login.uid,
});

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: REG_PAGE_LOADING }),
    pageLoaded: () => dispatch({ type: REG_PAGE_LOADED }),
    userRegistering: () => dispatch({ type: USER_REGISTERING }),
    userLoggedIn: (uid) => dispatch({ type: USER_LOGIN_SUCCESS, uid }),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
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