import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Firebase from '../firebase-class';

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.Firebase = new Firebase();
    }

    componentWillMount() {
        this.props.pageLoading();
    }

    componentDidMount() {
        this.props.pageLoaded();
    }
    render() {
        const { email, password } = this.state;
        const { isLoading, isLoggedIn, navigation } = this.props;

        if (isLoading) {
            return <Text>LOADING...</Text>
        }

        if (isLoggedIn) {
            this.props.navigation.navigate('Home');
        }

        return (
            <View style={styles.container}>

                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(email) => this.setState({ email })} placeholder="email" />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(password) => this.setState({ password })} placeholder="password" />
                </View>

                <Button title="sign-in" onPress={() => this.props.userLogin(email, password)} />
                <Button title="sign-up" onPress={() => navigation.navigate('SignUp') }/>
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
        borderColor: 'grey',
        borderWidth: 4,
        borderRadius: 30,
        width: '90%',
        height: 60,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 30,
        marginLeft: 10,
    }
})

const mapStateToProps = state => ({
    isLoading: state.login.isLoading,
    isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
    pageLoading: () => dispatch({ type: 'LOGIN_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'LOGIN_PAGE_LOADED' }),
    userLogin: (email, password) => dispatch({ type: 'USER_CLICKED_LOGIN', email, password }),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);