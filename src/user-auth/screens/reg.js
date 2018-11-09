import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import FirebaseFactory from '../firebase';
import { REG_PAGE_LOADED, REG_PAGE_LOADING, USER_REGISTERING, USER_REGISTRATION_FAIL, RESET_REGPAGE_STATE, USER_LOGIN_SUCCESS } from '../constants';

class RegPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            likes: '',
            dislikes: '',
            tagline: '',
            userName: '',
            pageOne: true,
            pageTwo: false,
            pageThree: false,

        }
    }

    goToPageTwo = () => {
        this.register();
        this.setState({
            pageOne: false,
            pageTwo: true,
        })
    }

    goToPageThree = () => {
        this.setState({
            pageTwo: false,
            pageThree: true,
        })
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

    handleLikes = (likes) => {
        this.setState({
            likes,
        })
    }

    handleDislikes = (dislikes) => {
        this.setState({
            dislikes,
        })
    }

    handleUserName = (userName) => {
        this.setState({
            userName,
        })
    }

    handleTagline = (tagline) => {
        this.setState({
            tagline,
        })
    }

    componentWillMount() {
        this.props.pageLoading();
    }

    componentDidMount() {
        this.props.pageLoaded();
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

                // this.props.navigation.navigate('Home');
            }

        } catch (error) {
            this.props.userRegFail();
        }
    }

    saveToDatabase = async () => {
        const { uid } = this.props;
        const { email, password, likes,
            dislikes, tagline, userName } = this.state;
        const docId = await this.props.addToDatabase(email, password, likes, dislikes, tagline, userName, uid);
        console.log('AT | docId: ', docId);
    }

    render() {

        return (
            <View style={styles.container}>

            <View style={styles.innerContainer}>
            
            <Text>That Dads App | Register </Text>

            { this.props.regError && <Text style={styles.errorText}>invalid email</Text> }

            { this.state.pageOne && 
                <View style={styles.pageContainer}>
                    <View style={styles.singleTextInputContainer}>
                        <TextInput 
                            placeholder="email"
                            style={styles.textInput}
                            onChangeText={this.handleEmail}
                            />
                    </View>

                    <View style={styles.singleTextInputContainer}>
                        <TextInput
                            placeholder="password"
                            style={styles.textInput}
                            secureTextEntry={false}
                            onChangeText={this.handlePassword}
                            />
                    </View>
                    <Button title="Next" onPress={() => this.goToPageTwo()} />
                </View>
            }

            { this.state.pageTwo && 
                <View style={styles.pageContainer}>

                    <View style={styles.singleTextInputContainer}>
                        <TextInput 
                            placeholder="likes"
                            style={styles.textInput}
                            onChangeText={this.handleLikes}
                            />
                    </View>

                    <View style={styles.singleTextInputContainer}>
                        <TextInput
                            placeholder="dislikes"
                            style={styles.textInput}
                            onChangeText={this.handleDislikes}
                            />
                    </View>
                    <Button title="Next" onPress={() => this.goToPageThree()} />
                </View>
            }

            { this.state.pageThree && 
                <View style={styles.pageContainer}>

                    <View style={styles.singleTextInputContainer}>
                        <TextInput 
                            placeholder="userName"
                            style={styles.textInput}
                            onChangeText={this.handleUserName}
                            />
                    </View>

                    <View style={styles.singleTextInputContainer}>
                        <TextInput
                            placeholder="tagline"
                            style={styles.textInput}
                            onChangeText={this.handleTagline}
                            />
                    </View>
                    <Button title="Register Me!" onPress={() => this.saveToDatabase()} />
                </View>
            }

            


                { this.props.isLoading && <Text>LOADING... </Text> }

            </View>
            <View style={styles.buttonsContainer}>
                    <Button title="DestroyAsync" onPress={() => this.props.destroyAsync()} />
                    <Button title="SignOut" onPress={() => this.props.logout()} />
            </View>
        </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading,
    isLoaded: state.login.isLoaded,
    uid: state.login.uid,
    regError: state.login.regError,
});

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: REG_PAGE_LOADING }),
    pageLoaded: () => dispatch({ type: REG_PAGE_LOADED }),
    userRegistering: () => dispatch({ type: USER_REGISTERING }),
    userRegFail: () => dispatch({ type: USER_REGISTRATION_FAIL }),
    resetRegPageLoadingState: () => dispatch({ type: RESET_REGPAGE_STATE }),
    userLoggedIn: (uid) => dispatch({ type: USER_LOGIN_SUCCESS, uid }),
    addToDatabase: () => dispatch({ type: 'ADDING_TO_DATABASE' }),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    FirebaseFactory,
)(RegPage);


const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 200,
    },
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
    errorText: {
        color: 'red',
    },
    pageContainer: {
        width: '100%',
        alignItems: 'center',
    },
    innerContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        marginTop: 150,
        paddingTop: 20,
        paddingBottom: 30,
    },
    singleTextInputContainer: {
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