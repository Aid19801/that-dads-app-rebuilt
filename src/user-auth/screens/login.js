import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

import * as actions from '../constants';
const { LOGIN_PAGE_LOADING, LOGIN_PAGE_LOADED, LOGIN_PAGE_FAIL,
    USER_LOGGING_IN } = actions;

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {}
    }

    login = () => {
        this.props.userLoggingIn();
    }

    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.loginInputsContainer}>
                
                <Text>That Dads App | Login</Text>

                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} placeholder="email" />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            placeholder="password" />
                    </View>

                    <Button title="Submit" onPress={this.login} />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: LOGIN_PAGE_LOADING }),
    pageLoaded: () => dispatch({ type: LOGIN_PAGE_LOADED }),
    userLoggingIn: () => dispatch({ type: USER_LOGGING_IN }),
})
export default connect(null, mapDispatchToProps)(LoginPage);

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
        // borderWidth: 2,
        // borderColor: 'red',
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
        color: 'white',
        fontSize: 30,
        height: '100%',
    }
  });