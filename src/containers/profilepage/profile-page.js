import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, TextInput, AsyncStorage, View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LogoImage } from '../../components';

class ProfilePage extends Component {
    
    constructor() {
        super();
        this.state = {
            userName: '',
            tagline: '',
            likes: '',
            dislikes: '',
        }
    }

    saveDetailsToChromeStore = () => {
        const { userName, tagline, likes, dislikes } = this.state;
        const { uid } = this.props;
        this.props.sendIdDetailsToChromeStore(userName, tagline, likes, dislikes, uid);
    }

    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }

    render() {
        const { newUser, isLoading } = this.props;
        console.log('ProfilePage uid ', this.props.uid);

        if (this.props.isLoading) {

            return (
                <View style={styles.container}>

                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                </View>
            )

        }

        if (newUser) {
            return (
                <View style={styles.container}>
                    
                    <View style={styles.newUserDetailsContainer}>
                        
                        <Text>New User | PROFILE | Please fill out fields below! </Text>
    
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput} onChangeText={(userName) => this.setState({ userName })} placeholder="userName" />
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput} onChangeText={(tagline) => this.setState({ tagline })} placeholder="tagline" />
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput} onChangeText={(likes) => this.setState({ likes })} placeholder="likes" />
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput} onChangeText={(dislikes) => this.setState({ dislikes })} placeholder="dislikes" />
                        </View>
                        <Button title="Save" onPress={() => this.saveDetailsToChromeStore()} />
                    </View>          
    
                </View>
            )
        }
        if (!newUser) {

            const { userName, tagline, likes, dislikes } = this.props;
            return (
                <View style={styles.container}>
                    
                    <LogoImage />

                    <View style={styles.existingUserDetailsContainer}>
    
                        <View style={styles.existingUserTextContainer}>
                            <Text style={styles.existingUserText}>{userName}</Text>
                        </View>
                        <View style={styles.existingUserTextContainer}>
                            <Text style={styles.existingUserText}>"{tagline}..."</Text>
                        </View>
                        <Text>Likes: </Text>
                        <View style={styles.existingUserTextContainer}>
                            <Text style={styles.existingUserText}>{likes}</Text>
                        </View>
                        <Text>Dislikes: </Text>
                        <View style={styles.existingUserTextContainer}>
                            <Text style={styles.existingUserText}>{dislikes}</Text>
                        </View>
                        <Button title="Update" onPress={() => this.saveDetailsToChromeStore()} />
                    </View>          
    
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.profile.isLoading,
    isLoaded: state.profile.isLoaded,
    likes: state.profile.likes,
    dislikes: state.profile.dislikes,
    tagline: state.profile.tagline,
    userName: state.profile.userName,
    newUser: state.profile.newUser,
    uid: state.homepage.uid,
});
    
const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'PROFILE_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'PROFILE_PAGE_LOADED' }),
    sendIdDetailsToChromeStore: (userName, tagline, likes, dislikes, uid) => dispatch({ type: 'SETTING_ID_DETAILS', userName, tagline, likes, dislikes, uid }) // <<- put reducer action in here
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

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
        paddingTop: 20,
    },
    loading: {
        marginTop: 100,
    },
    newUserDetailsContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '95%',
        borderColor: 'grey',
        borderWidth: 5,
        alignItems: 'center',
        marginTop: 90,
    },
    existingUserDetailsContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '95%',
        borderColor: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 0,
    },
    textInputContainer: {
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 4,
        borderRadius: 30,
        width: '90%',
        height: 60,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    existingUserTextContainer: {
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 30,
        width: '90%',
        height: 60,
        marginBottom: 10,
        backgroundColor: '#09093B',
    },
    textInput: {
        fontSize: 30,
        marginLeft: 10,
    },
    existingUserText: {
        fontSize: 30,
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
    }
});