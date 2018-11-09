import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

import * as actions from '../constants';
import FirebaseFactory from '../firebase';
const { LOGIN_PAGE_LOADING, LOGIN_PAGE_LOADED, LOGIN_PAGE_FAIL,
    USER_LOGGING_IN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } = actions;


class LoginPage extends Component {
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

    login = async () => {
        this.props.userLoggingIn();
        const { email, password } = this.state;
        try {
            let loginStatus = await this.props.login(email, password);
            if (loginStatus && loginStatus.user.email) {
                console.log('there *IS* a loginstatus and the email is: ', loginStatus.user);
                this.props.userLoggedIn(loginStatus.user.uid);
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            console.log('login.js | login() | error', error);
            alert('wrong email / password');
            this.props.userLoginFail();
            this.props.destroyAsync();
            this.props.navigation.navigate('LoginError');
        }
    }

    ifUserLoggedInBounceToHomepage = async () => {
        try {
            let uid = await this.props.checkAsync();
            console.log('Login js | checkAsync uid: ', uid);
            if (uid) {
                this.props.navigation.navigate('Home')
            } else {
                return;
            }
        } catch(error) {
            console.log('login.js | ifUserLoggedInBounceToHomepage() : ', error);
        }
    }

    componentWillMount = () => {
        this.props.pageLoading();
        this.ifUserLoggedInBounceToHomepage();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }
    render() {
        const { isLoading, error } = this.props;
        if (isLoading) {
            return (
                <View style={styles.container}>

                <View style={styles.loginInputsContainer}>

                    <View style={styles.textInputContainer}>
                        <Text>Loading...</Text>
                    </View>
                </View>
            </View>
            )
        };

        if (error) {
            return (
                <View style={styles.container}>
                    <View style={styles.loginInputsContainer}>

                        <View style={styles.textInputContainer}>
                            <Text>Error</Text>
                        </View>
                    </View>
                </View>
            )
        };

        return (
            <View style={styles.container}>

                <View style={styles.loginInputsContainer}>
                
                <Text>That Dads App | Login</Text>

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

                    <Button title="Submit" onPress={this.login} />
                    <Button title="SignOut" onPress={() => this.props.logout()} />
                    <Button title="DestroyAsync" onPress={() => this.props.destroyAsync()} />
                    <Button title="AddToDB" onPress={() => this.props.addToDatabase()} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading,
    isLoaded: state.login.isLoaded,
    error: state.login.error,
    uid: state.login.uid,
});

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: LOGIN_PAGE_LOADING }),
    pageLoaded: () => dispatch({ type: LOGIN_PAGE_LOADED }),
    userLoggingIn: () => dispatch({ type: USER_LOGGING_IN }),
    userLoggedIn: (uid) => dispatch({ type: USER_LOGIN_SUCCESS, uid }),
    userLoginFail: () => dispatch({ type: actions.USER_LOGIN_FAIL }),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    FirebaseFactory,
)(LoginPage);

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