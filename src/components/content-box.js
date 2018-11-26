import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
// source={{ uri: props.imgUrl }}

const ContentBox = (props) => (
    <View style={styles.container} onPress={() => alert('clicked!')}>
        <Text style={styles.headline}>{props.headline}</Text>
        <View style={styles.imageAndBlurbContainer}>
            <Image
                style={styles.image}
                source={{ uri: props.imgUrl }}
                style={{ width: 200, height: 170 }}
            />
            <View style={styles.blurbContainer}>
                <Text style={styles.blurb}>{props.blurb}</Text>
            </View>
            
        </View>
    </View>
)
export default ContentBox;


const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 320,
        flex: 1,
        flexDirection: 'column',
        marginTop: 24,
        paddingBottom: 54,
        padding: 9,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    headline: {
        ...Platform.select({
            ios: {
              fontFamily: 'Bradley Hand',
              marginLeft: 18,
              fontSize: 30,
              color: '#423C67',
            },
            android: {
              fontFamily: 'gamezop',
              marginLeft: 18,
              fontSize: 30,
              color: '#423C67',
            }
          })
    },
    imageAndBlurbContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    image: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    blurbContainer: {
        // borderWidth: 2,
        // borderColor: 'red',
        marginTop: 5,
        marginBottom: 5,
    },
    blurb: {
        ...Platform.select({
            ios: {
              fontFamily: 'Bradley Hand',
              fontSize: 18,
              color: '#423C67',
            },
            android: {
              fontFamily: 'gamezop',
              fontSize: 18,
              color: '#423C67',
            }
          })
    }
});