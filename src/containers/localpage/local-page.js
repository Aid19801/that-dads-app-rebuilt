import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';

class LocalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount = () => {
        this.props.pageLoading();
    }

    componentDidMount = () => {
        this.props.pageLoaded();
    }


    render() {

        const { navigation, isLoading } = this.props;

        // if (isLoading) {
        //     return (
        //         <View style={styles.container}>

        //             <View style={styles.titleContainer}>
        //                 <Text style={styles.title}>Loading...</Text>
        //             </View>
                    
        //             <View style={styles.loading}>
        //                 <ActivityIndicator size="large" color="#0000ff" />
        //             </View>

        //         </View>
        //     )
        // }


        return (
            <View style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>#Local</Text>
                </View>
                
                <View style={styles.mapContainer}>
                    <Image style={styles.mapImage} source={require('/Users/ath18/Documents/projects/tda/utils/map-ldn.png')} />
                </View>

            </View>

        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.local.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'LOCAL_PAGE_LOADING' }),
    pageLoaded: () => dispatch({ type: 'LOCAL_PAGE_LOADING' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#CBC9D4',
        borderWidth: 5,
        borderColor: 'black',
        width: '100%',
        paddingTop: 50,
    },
    loading: {
        marginTop: 100,
    },
    titleContainer: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 60,
        color: '#423C67',
        ...Platform.select({
            ios: {
              fontFamily: 'Bradley Hand',
            },
            android: {
              fontFamily: 'gamezop',
            }
          })
    },
    mapContainer: {
        width: '90%',
        height: '80%',
        borderWidth: 7,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapImage: {
        flex: 1,
        width: '100%',
        height: 'auto',
    },
})