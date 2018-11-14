import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, Button, Text, StyleSheet } from 'react-native';

class ProfilePage extends Component {
    
    constructor() {
        super();
        this.state = {}
    }

    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.loginInputsContainer}>
                
                    <Text>Profile Page</Text>
                    <Button title="kill async" onPress={() => AsyncStorage.setItem('isLoggedIn', 'false')} />
                </View>

            </View>
        )
    }
}

// const mapStateToProps = (state) => ({
//     isLoading: state.homepage.isLoading,
//     isLoaded: state.homepage.isLoaded,
// });

// const mapDispatchToProps = (dispatch) => ({
//     pageLoading: () => dispatch({ type: 'HOMEPAGE_LOADING' }),
//     pageLoaded: () => dispatch({ type: 'HOMEPAGE_LOADED' }),
// });

export default connect(null, null)(ProfilePage);

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
    },
    nav: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '11%',
        backgroundColor: 'skyblue',
    }
  });