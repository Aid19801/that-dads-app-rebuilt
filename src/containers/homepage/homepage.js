import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContentBox } from '../../components';
import mocks from './mocks.js';
import { FlatList, AsyncStorage, View, Button, Text, StyleSheet } from 'react-native';

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

        console.log('this props yo', this.props);

        if (this.props.isLoading) {

            return (
                <View style={styles.container}>

                    <View style={styles.flatListContainer}>
                        <Text>Loading...</Text>
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
                
                <Button title="kill async" onPress={() => AsyncStorage.setItem('isLoggedIn', 'false')} />

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.homepage.isLoading,
    isLoaded: state.homepage.isLoaded,
    stories: state.homepage.stories,
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
    heading: {
        marginTop: 100,
    },
    flatListContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '95%',
        borderColor: 'grey',
        alignItems: 'center',
    }
  });