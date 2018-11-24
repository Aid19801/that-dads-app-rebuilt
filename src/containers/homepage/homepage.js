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

        // console.log('homepage props uid:', this.props.uid);
        // console.log('homepage props id:', this.props.id);

        if (this.props.isLoading) {

            return (
                <View style={styles.container}>

                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                </View>
            )

        }

        return (
            <View style={styles.container}>

                <View style={styles.flatListContainer}>
                    <FlatList
                        data={this.props.stories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <ContentBox
                                title={item.headline}
                                synopsis={item.blurb}
                                source={item.org}
                                url={item.url}
                                imgUrl={item.imgUrl}
                            /> }
                    />
                </View>
                
                <Button title="kill async" onPress={() => this.props.killAsync()} />

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.homepage.isLoading,
    isLoaded: state.homepage.isLoaded,
    stories: state.homepage.stories,
    uid: state.homepage.uid,
    id: state.homepage.id,
});

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

        backgroundColor: 'skyblue',
        borderWidth: 2,
        borderColor: 'red',
        width: '100%',
    },
    loading: {
        marginTop: 100,
    },
    flatListContainer: {
        marginTop: 20,
        justifyContent: 'flex-start',
        // flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    }
  });