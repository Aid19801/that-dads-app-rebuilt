import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Button, Text, StyleSheet } from 'react-native';
import { HOMEPAGE_LOADING, HOMEPAGE_LOADED } from './constants';
import FirebaseFactory from '../../user-auth/firebase';

class HomePage extends Component {
    
    constructor() {
        super();
        this.state = {}
    }


    logout() {
        this.props.logout();
        this.props.navigation.navigate('LoggedOut');
    }
    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }
    render() {

        if (!this.props.uid) {
            this.props.navigation.navigate('Login');
        }


        console.log('AT | props: ', this.props);

        return (
            <View style={styles.container}>

                <View style={styles.loginInputsContainer}>
                
                    <Text>That Dads App | HOMEPAGE!</Text>
                    
                    <Button title="SignOut" onPress={() => this.logout()} />
                    <Button title="DestroyAsync" onPress={() => this.props.destroyAsync()} />
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
    pageLoading: () => dispatch({ type: HOMEPAGE_LOADING }),
    pageLoaded: () => dispatch({ type: HOMEPAGE_LOADED }),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    FirebaseFactory,
)(HomePage);

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