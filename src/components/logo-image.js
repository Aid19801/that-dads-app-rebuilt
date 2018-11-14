import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class LogoImage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('/Users/ath18/Documents/projects/tda/utils/logo-image.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        width: 300,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        borderWidth: 4,
        borderColor: 'white',
    },


});