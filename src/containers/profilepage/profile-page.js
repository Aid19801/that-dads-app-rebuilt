import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Image, TextInput, TouchableOpacity, Platform, View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';

import  ImagePicker from 'react-native-image-picker';
require("react-native-image-picker");

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

import { LogoImage } from '../../components';  

class ProfilePage extends Component {
    
    constructor() {
        super();
        this.state = {
            userName: '',
            tagline: '',
            likes: '',
            dislikes: '',
            isUpdated: false,
            hasUpdatedProfilePic: false,
            img: '',
        }
        this.takePicture = this.takePicture.bind(this);
    }

    profilePicOrClipArt = () => {
        const { hasUpdatedProfilePic, img } = this.state;
        if (!hasUpdatedProfilePic && img === '') {
            console.log('1');
            return <LogoImage />
        } else if (!hasUpdatedProfilePic && img !== '') {
            console.log('22222 ', this.state);
            return <Image source={{ uri: img }} style={styles.image} style={styles.uploadedImage} />
        } else if (hasUpdatedProfilePic) {
            console.log('3');
            return <Image style={styles.image} source={this.props.img} style={styles.uploadedImage} />
        }
    }

    saveDetailsToChromeStore = () => {
        const { userName, tagline, likes, dislikes } = this.state;
        const { uid } = this.props;
        this.props.sendIdDetailsToChromeStore(userName, tagline, likes, dislikes, uid);
    }

    takePicture = function() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              // const source = { uri: response.uri };
          
              // You can also display the image using data:
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                img: source.uri
              });
            }
          });
    }

    sendPic = () => {
        const { img } = this.state;
        const { id } = this.props;
        this.props.sendPicToFirebase(img, id);
    }

    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== '') {
            this.setState({
                isUpdated: true,
            })
        }
    }

    render() {
        const { newUser, isLoading } = this.props;

        console.log('this props ', this.props);
        console.log('this state ', this.state);

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
                    
                    { this.profilePicOrClipArt() }

                    <Button onPress={() => this.takePicture()} title="profile pic" />
                    <Button onPress={() => this.sendPic()} title="keep?" />

                    <View style={styles.existingUserDetailsContainer}>
                        
                        <View style={styles.existingUserTextUserNameContainer}>
                            <Text style={styles.existingUserTextUserName}>{userName}</Text>
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
    img: state.profile.img,
    dislikes: state.profile.dislikes,
    tagline: state.profile.tagline,
    userName: state.profile.userName,
    newUser: state.profile.newUser,
    uid: state.homepage.uid,
    id: state.profile.id,
});
    
const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'PROFILE_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'PROFILE_PAGE_LOADED' }),
    sendPicToFirebase: (img, id) => dispatch({ type: 'SETTING_IMAGE', img, id }),
    sendIdDetailsToChromeStore: (userName, tagline, likes, dislikes, uid) => dispatch({ type: 'SETTING_ID_DETAILS', userName, tagline, likes, dislikes, uid }) // <<- put reducer action in here
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

const styles = StyleSheet.create({
    uploadedImage: {
        borderWidth: 2,
        borderColor: 'red',
        width: 200,
        height: 100,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#CBC9D4',
        borderWidth: 5,
        borderColor: 'black',
        width: '100%',
        paddingTop: 20,
    },
    loading: {
        marginTop: 100,
    },
    camContainer: {
        height: 100,
        width: 100,
        borderColor: 'red',
        borderWidth: 2,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'red',
        width: 100,
        height: 100,
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
        flex: 1,
        width: 320,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    existingUserTextUserNameContainer: {
        width: 320,
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    textInput: {
        fontSize: 30,
        marginLeft: 10,
    },
    existingUserText: {
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 25,
        color: '#423C67',
        ...Platform.select({
            ios: {
              fontFamily: 'Bradley Hand',
            },
            android: {
              fontFamily: 'gamezop',
            }
          })
    },
    existingUserTextUserName: {
        
        flex: 1,
        flexWrap: 'wrap',

        marginTop: 10,
        textAlign: 'center',
        fontSize: 40,
        color: '#423C67',
        ...Platform.select({
            ios: {
              fontFamily: 'Bradley Hand',
            },
            android: {
              fontFamily: 'gamezop',
            }
          })
    }
});