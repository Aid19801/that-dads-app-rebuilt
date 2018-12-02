import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Platform } from 'react-native';

const ContentBox = (props) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => Linking.openURL(props.url)}>
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
                <Text style={styles.source}>The {props.source}</Text>
            </View>
        </TouchableOpacity>
    </View>
)
export default ContentBox;


const styles = StyleSheet.create({
    container: {
        // height: 400,
        width: 320,
        flex: 1,
        flexDirection: 'column',
        marginTop: 24,
        paddingBottom: 54,
        padding: 9,
        backgroundColor: 'white',

        ...Platform.select({
            ios: {
                borderRadius: 10,
            },
            android: {
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 23,
                borderBottomWidth: 0,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 10,
            },
        })
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
              fontFamily: 'sans-serif-light',
              marginLeft: 18,
              fontSize: 30,
              color: '#423C67',
            }
          })
    },
    source: {
        ...Platform.select({
            ios: {
              fontFamily: 'Bradley Hand',
              fontSize: 15,
              color: 'black',
            },
            android: {
              fontFamily: 'monospace',
              fontSize: 15,
              color: 'black',
            }
          })
    },
    imageAndBlurbContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // textAlign: 'center',
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