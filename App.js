import Reactotron from 'reactotron-react-native'
import React from 'react';
import { Platform } from 'react-native';

import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';

import { firebaseConfig } from './src/user-auth/firebase';
import { createRootNavigator, isSignedIn } from './router';


if (Platform.OS === 'android') {
  console.log('Platform.OS is ', Platform.OS);
      if (typeof Symbol === 'undefined') {
        if (Array.prototype['@@iterator'] === undefined) {
          Array.prototype['@@iterator'] = function() {
            let i = 0;
            return {
              next: () => ({
                done: i >= this.length,
                value: this[i++],
              }),
            };
          };
        }
      }
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

Reactotron.log(process.env.NODE_ENV)

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      checkedSignIn: false,
    }
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => console.log('err: ', err))
  }

  render() {
    Reactotron.log('Hello worlllllld');
    Reactotron.warn('*glares*')
    Reactotron.warn({ numbers: [1, 2, 3] })

    Reactotron.display({
      name: 'KNOCK KNOCK',
      preview: 'Who\'s there?',
      value: 'Orange.'
    })

    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }
    
    const Layout = createRootNavigator(signedIn);

    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

export default App;
