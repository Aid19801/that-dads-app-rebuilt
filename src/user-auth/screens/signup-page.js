import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Firebase from '../firebase-class';

class SignUpPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.Firebase = new Firebase();
    }

    signUpAndGoToLogin = (e) => {
        const { email, password } = this.state;
    }
    componentWillMount() {
        this.props.pageLoading();
    }

    componentDidMount() {
        this.props.pageLoaded();
    }
    render() {
        const { email, password } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                <View style={styles.textInputContainer}>
                    <TextInput onChangeText={(email) => this.setState({ email })} placeholder="email" />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput onChangeText={(password) => this.setState({ password })} placeholder="password" />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 290, // pushes it up from the bottom. 2/3
    },
    textInputContainer: {
        borderColor: 'black',
        borderWidth: 4,
        width: '90%',
        height: 30,
        marginBottom: 10,
    },
})

const mapStateToProps = state => ({
    isLoading: state.signup.isLoading,
    // isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
    pageLoading: () => dispatch({ type: 'LOGIN_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'LOGIN_PAGE_LOADED' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);