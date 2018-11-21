import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, FlatList, Button } from 'react-native';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { connect } from 'react-redux';
import { ChatMsg } from './chat-msg';

const ChatMessagesQuery = gql`
  query messages {
    messages {
      message
      userName
    }
  }
`;

const CreateMessage = gql`
  mutation CreateMessage($userId: String!, $message: String!, $userName: String!, $timestamp: String!, ) {
  createMessage(userId: $userId, userName: $userName, message: $message, timestamp: $timestamp) {
    _id
  }
}
` 

class ChatPage extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            showNav: true,
            message: '',
            userName: '',
            userId: ''
        }
    }

    storeUserDetailsInState = () => {
        this.setState({
            userId: this.props.userId,
            userName: this.props.userName,
            timestamp: Date.now().toString(),
        })
    }

    storeMessage = (e) => {
        this.setState({
            message: e
        })
    }

    onFocus = () => {
        this.setState({
            showNav: false,
        })
    }

    onBlur = () => {
        this.setState({
            showNav: true,
        })
    }

    componentWillMount() {
        this.props.pageLoading();
    }

    componentDidMount() {
        this.props.pageLoaded();
    }
    render() {

        console.log('chat page this.state: ', this.state);

        const { userId, message, userName, timestamp} = this.state;
        return (
            <View style={styles.container}>

                <View style={styles.messagesContainer}>
                    <Query query={ChatMessagesQuery}>
                    
                        {({ loading, error, data }) => {
                            if (loading) return <Text>loading...</Text>
                            if (error) return <Text>error!</Text>

                            return <FlatList
                            inverted
                            data={data.messages.reverse()}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, i}) => 
                                <ChatMsg key={i} userName={item.userName} message={item.message} />
                            }
                            />
                        }}
                    </Query>
                </View>
                
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="message"
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}
                        style={styles.textInput}
                        onChangeText={(e) => this.storeMessage(e)}
                        />
                    <View style={styles.buttonContainer}>

                        <Mutation mutation={CreateMessage}>

                            {(createMessage, { data }) => (
                                <Button
                                    title="submit"
                                    onPress={() => createMessage({ variables: { userId: userId, message: message, userName: userName, timestamp: timestamp } })}
                                    color="white"
                                    buttonStyle={styles.button}
                                />
                            )
                        }
                        </Mutation>
                    </View>
                </View>
               
            </View>
        )
    }
}

// need to thread this up.
const mapStateToProps = (state) => ({
    userName: state.loginStatusReducer.userName,
    userId: state.loginStatusReducer.userId
})

const mapDispatchToProps = (dispatch) => ({
    pageLoading: () => dispatch({ type: 'CHAT_PAGE_LOADING'}),
    pageLoaded: () => dispatch({ type: 'CHAT_PAGE_LOADED'})
})


export default connect(null, mapDispatchToProps)(ChatPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: 'black',
    },

    messagesContainer: {
        width: '100%',
        height: '70%',
        borderWidth: 2,
        borderColor: 'gold',
    },

    textInputContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'white',
        width: '95%',
        // height: '10%',
        justifyContent: 'space-around',
    },
    textInput: {
        width: '70%',
    },
    buttonContainer: {
        borderRadius: 55,
    },
    button: {
        backgroundColor: "rgba(92, 99,216, 1)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    nav: {
        width: '100%',
        height: '11%',
        backgroundColor: colorScheme.backgroundColorLight,
    },
});
