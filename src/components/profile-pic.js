import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

const ProfilePic = (props) => (
    <View style={styles.container}>
        <Image style={styles.image} source={require('/Users/ath18/Documents/projects/tda/utils/dad.png')} />
    </View>
)
const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => {
  
}

export default connect(null, null)(ProfilePic)

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 200,
        borderColor: 'red',
        borderWidth: 2,
    },
    container: {
        width: 300,
        height: 200,
        borderColor: 'red',
        borderWidth: 2,
    },
})