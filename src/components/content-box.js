import React from 'react';
import { Platform, Linking, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ContentBox = (props) => {
    // const imgUrl = `/Users/adrianthompson/Documents/projects/that-dads-app/src/mocks/${props.imgUrl}`;
    const linkUrl = props.url;
    return (
            <View style={styles.storyBox}>

                <TouchableOpacity onPress={() => Linking.openURL(linkUrl)}>
                    <View style={styles.titleAndImage}>
                        <Text style={styles.title}>{props.title}</Text>

                        <Image
                            style={styles.image}
                            source={{ uri: props.imgUrl }}
                        />

                    </View>
                    <Text style={styles.blurb}>{props.synopsis}</Text>
                    <Text style={styles.source}>{props.source}</Text>
                </TouchableOpacity> 

            </View>
    );
};

export default ContentBox;

const styles = StyleSheet.create({
    storyBox: {
        borderWidth: 0.5,
        borderColor: 'black',
        width: '100%',

        flex: 1,
        flexDirection: 'column',
        borderWidth: 2,
        marginTop: 24,
        padding: 9,
        backgroundColor: 'grey',
    },
    titleAndImage: {
        borderWidth: 1,
        borderColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'rgba(26, 26, 89, 0.4)',
    },
    title: {
        fontSize: 25,
        color: 'white',
        flexWrap: 'wrap',
        width: '50%',

        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,


    ...Platform.select({
        ios: {
            fontFamily: 'American Typewriter',
        },
        android: {
            fontFamily: 'monospace',
        }
    })
    },
    image: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        width: '50%',
        height: '50%',
    },
    blurb: {
        color: 'white',
        fontSize: 23,

        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        
        ...Platform.select({
            ios: {
                color: 'white',
                fontSize: 23,
            },
            android: {
                color: 'white',
                fontSize: 23,
            }
        })
    },
    source: {
        justifyContent: 'flex-end',
    }
});
