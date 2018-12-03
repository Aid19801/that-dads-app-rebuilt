import React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
  } from "react-navigation";
import SignUp from './src/user-auth/screens/signup-page';
import SignInPage from './src/user-auth/screens/signin-page';
import { HomePage, ChatPage, PlaceHolder, LocalPage, ProfilePage } from './src/containers';
import Foo from './src/containers/profilepage/foo';

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
  SignIn: {
    screen: SignInPage,
    navigationOptions: {
      title: "Sign In",
    }
    },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
    }
  },
  });

export const SignedIn = createBottomTabNavigator(
  {
  Home: { screen: Foo },
  Local: { screen: LocalPage },
  Chat: { screen: ChatPage },
  Profile: { screen: ProfilePage },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#5B5494',
      inactiveBackgroundColor: '#837EB1',
      style: {
        borderColor: 'black',
        borderWidth: 1,
        // flex: 1,
      },
      labelStyle: {
        fontSize: 30,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        
      }
    }
  }
);


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
  