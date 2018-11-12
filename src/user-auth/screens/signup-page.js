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

    componentWillMount() {
        // this.props.pageLoading();
    }

    componentDidMount() {
        // this.props.pageLoaded();
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

                <Button title="Go To Login..." onPress={() => navigation.navigate('SignIn')} />
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

// const mapStateToProps = state => ({
//     isLoading: state.login.isLoading,
//     isLoggedIn: state.login.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => ({
//     pageLoading: () => dispatch({ type: 'LOGIN_PAGE_LOADING' }),
//     pageLoaded: () => dispatch({ type: 'LOGIN_PAGE_LOADED' }),
//     userLogin: (email, password) => dispatch({ type: 'USER_CLICKED_LOGIN', email, password }),
// })

export default connect(null, null)(SignUpPage);