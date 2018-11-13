import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, Button, Text, StyleSheet } from 'react-native';
import Footer from '../../components/footer';

class HomePage extends Component {
    
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
                
                    <Text>That Dads App | HOMEPAGE!</Text>
                    <Button title="kill async" onPress={() => AsyncStorage.setItem('isLoggedIn', 'false')} />
                </View>

                <View style={styles.nav}>
                    <Footer navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading,
    isLoaded: state.login.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'HOMEPAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'HOMEPAGE_LOADED' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

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
    loginInputsContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        marginTop: 150,
        paddingTop: 20,
        paddingBottom: 30,
    },
    textInputContainer: {
        borderWidth: 4,
        borderColor: 'grey',
        width: '90%',
        height: '50%',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    textInput: {
        color: 'black',
        fontSize: 30,
        height: '100%',
    },
    nav: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '11%',
        backgroundColor: 'skyblue',
    }
  });