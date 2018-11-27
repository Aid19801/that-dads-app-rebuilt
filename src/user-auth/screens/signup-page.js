import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { LogoImage } from '../../components';
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

    signUpAndGoToLogin = () => {
        const { email, password } = this.state;
        this.props.signUp(email, password);
    }

    componentWillMount() {
        this.props.pageLoading();
    }

    componentDidMount() {
        this.props.pageLoaded();
    }
    render() {
        const { email, password } = this.state;
        const { navigation, isError } = this.props;

        return (
            <View style={styles.container}>

                <Text style={styles.mainTitle}>#ThatDadsApp</Text>
                <LogoImage />

                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(email) => this.setState({ email })} placeholder="email" />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} onChangeText={(password) => this.setState({ password })} placeholder="password" />
                </View>
                <Button title="Sign Up!" onPress={this.signUpAndGoToLogin}/>
                { isError && <Text>Something Went Wrong </Text> }
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
        marginBottom: 200, // pushes it up from the bottom. 2/3
    },
    mainTitle: {
        fontSize: 30,
        marginTop: 60,
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
        fontSize: 40,
        marginLeft: 10,
        alignContent: 'center',
    }
})

const mapStateToProps = state => ({
    isLoading: state.signup.isLoading,
    isLoggedIn: state.login.isLoggedIn,
    isError: state.signup.isError,
})

const mapDispatchToProps = dispatch => ({
    pageLoading: () => dispatch({ type: 'SIGNUP_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'SIGNUP_PAGE_LOADED' }),
    signUp: (email, password) => dispatch({ type: 'USER_CLICKED_SIGNUP', email, password }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);