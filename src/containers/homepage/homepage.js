import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentBox } from '../../components';
import mocks from './mocks.js';
import { FlatList, AsyncStorage, View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';

class HomePage extends Component {
    
    constructor() {
        super();
        this.state = {}
    }

    componentWillMount = () => {
        this.props.pageLoading();
        this.props.isLoggedIn();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }

    render() {

        console.log('homepage | this.props :', this.props);

        // if user isnt logged in, bounce them back to Login
        if (this.props.uid === null) {
            this.props.killAsync()
            return this.props.navigation.navigate('SignIn');
        }

        // if page is loading show spinner
        if (this.props.isLoading) {

            return (
                <View style={styles.container}>

                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                </View>
            )

        }

        // if user is logged in and its not loading... show homepage.s
        return (
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    <Button title="kill async" onPress={() => this.props.killAsync()} />
                </View>

                <View style={styles.flatListContainer}>
                    <FlatList
                        data={this.props.stories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <ContentBox
                                headline={item.headline}
                                blurb={item.blurb}
                                source={item.org}
                                url={item.url}
                                imgUrl={item.imgUrl}
                            /> }
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('home page state ====> ', state);
    return {
        isLoading: state.homepage.isLoading,
        isLoaded: state.homepage.isLoaded,
        stories: state.homepage.stories,
        uid: state.homepage.uid,
        id: state.homepage.id,
    }
    
};

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'HOMEPAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'HOMEPAGE_LOADED' }),
    isLoggedIn: () => dispatch({ type: 'GET_UID' }),
    killAsync: () => dispatch({ type: 'KILL_ALL_ASYNC' })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderWidth: 5,
        borderColor: 'black',
        width: '100%',
        backgroundColor: '#CBC9D4',
    },
    loading: {
        marginTop: 100,
    },
    flatListContainer: {
        marginTop: 20,
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 90,
        height: 90,
        width: 90,
        borderWidth: 4,
        borderColor: 'black',
    }
  });