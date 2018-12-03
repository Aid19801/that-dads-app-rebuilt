import React, { Component } from 'react'
import { Image, TextInput, TouchableOpacity, Platform, View, Button, Text, StyleSheet, ActivityIndicator, CameraRoll, Dimensions, } from 'react-native';
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
  

export default class Foo extends Component {

    constructor() {
        super()
        this.state = {
            avatarSource: '',
        }
        this.takePicture = this.takePicture.bind(this);
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
                avatarSource: source,
              });
            }
          });
    }


    render() {

        console.log('this state ', this.state.avatarSource);

        return (
            <View style={styles.container}>

                <Button onPress={() => this.takePicture()} title="select photo" />

                <Image source={this.state.avatarSource} style={styles.uploadedImage}/>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#CBC9D4',
        borderWidth: 5,
        borderColor: 'black',
        width: '100%',
        paddingTop: 70,
    },
    uploadedImage: {
        borderWidth: 2,
        borderColor: 'red',
        width: 200,
        height: 100,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        // height: 100,
    },
    capture: {
        borderWidth: 5,
        borderColor: 'green',
    }
});