import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
  } from "react-navigation";
import React from 'react';
import SignUp from './src/user-auth/screens/signup-page';
import LoginPage from './src/user-auth/screens/login-page';
import { HomePage } from './src/containers';
import { AsyncStorage, Text, View } from 'react-native';

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
    screen: LoginPage,
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

class OtherScreen extends React.Component{
  render(){
      return(
          <View>
              <Text>
                  Hello this is working!
              </Text>
          </View>
      );
  }
}

  export const SignedIn = createBottomTabNavigator({
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: "Home Page",
      }
    },
    Welcome: { screen: OtherScreen },
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
  