import {
    createStackNavigator,
    createSwitchNavigator,
  } from "react-navigation";

import SignUp from './src/user-auth/screens/signup-page';
import LoginPage from './src/user-auth/screens/login-page';
import { HomePage } from './src/containers';
import { AsyncStorage } from 'react-native';

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('isLoggedIn')
      .then(res => {
        if (res === 'false' || res === null) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(err => reject(err));
  });
};

export const SignedOut = createStackNavigator({
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Sign Up",

      }
    },
    SignIn: {
      screen: LoginPage,
      navigationOptions: {
        title: "Sign In",
      }
    }
  });

  export const SignedIn = createStackNavigator({
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: "Home Page",
      }
    },
  });

  export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };
  