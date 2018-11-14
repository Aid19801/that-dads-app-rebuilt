import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { connect } from 'react-redux';

class LocalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }


    render() {

        const { navigation, longitude, latitude } = this.props;

        return (
            <View style={styles.container}>

                <View style={styles.mapContainer}>
                    <Image style={styles.mapImage} source={require('/Users/ath18/Documents/projects/tda/utils/map-ldn.png')} />
                </View>

            </View>

        )
    }
}

const mapStateToProps = (state) => ({
    longitude: state.userLocationReducer.longitude,
    latitude: state.userLocationReducer.latitude,
});

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'LOCAL_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'LOCAL_PAGE_LOADING' }),
})

export default connect(null, mapDispatchToProps)(LocalPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'flex-end',

        borderWidth: 5,
        borderColor: 'pink',
        backgroundColor: 'skyblue',

    },
    mapContainer: {
        width: '90%',
        height: '80%',

        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapImage: {
        flex: 1,
        width: '100%',
        height: 'auto',
    },
})