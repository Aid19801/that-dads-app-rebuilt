import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as appScreens from './src/containers/'
import * as userAuthScreens from './src/user-auth/'
import store from './redux/store';
import firebase from 'firebase';

import { firebaseConfig } from './src/user-auth/firebase';
import { createRootNavigator } from './router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let RootStack;

AsyncStorage.getItem('isLoggedIn').then(res => {
  if (res === 'true') {
    // logged in stack
    RootStack = createStackNavigator({
      Home: {
        screen: appScreens.HomePage,
      },
     });
  } else {
    // logged out stack
    RootStack = createStackNavigator({
      SignUp: {
        navigationOptions: {
          title: 'Sign Up',
        },
        screen: userAuthScreens.SignUpPage,
      },
      SignIn: {
        navigationOptions: {
          title: 'Sign In',
        },
        screen: userAuthScreens.LoginPage,
      },
      SignedOut: {
        navigationOptions: {
          title: 'Sign Out',
        },
        screen: userAuthScreens.LoginPage,
      },
     });
  }
})


const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('isLoggedIn')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

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
      .catch(err => alert('an error occurred'))
  }

  render() {

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