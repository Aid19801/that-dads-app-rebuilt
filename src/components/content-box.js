import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// source={{ uri: props.imgUrl }}

const ContentBox = () => (
    <View style={styles.container}>
        <Text>i am some content</Text>
        <Image
            style={styles.image}
        />
    </View>
)
export default ContentBox;


const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: 'green',

        flex: 1,
        flexDirection: 'column',
        marginTop: 24,
        padding: 9,
        backgroundColor: 'lightgrey',
    },
    image: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'red',
        width: '50%',
        height: '50%',
    },
});