import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export const ChatMsg = (props) => (
    <View style={styles.container}>
        <Text style={styles.userNameText}>{props.userName}</Text>
        <Text style={styles.text}>{props.message}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '90%',
        height: 'auto',
        marginRight: 10,
        marginLeft: 10,

        borderWidth: 1,
        borderColor: 'blue',
    },
    userNameText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 25,
    }
});
