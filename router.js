import {
    createStackNavigator,
    createSwitchNavigator,
  } from "react-navigation";

import SignUp from './src/user-auth/screens/signup-page';
import LoginPage from './src/user-auth/screens/login-page';
import { HomePage } from './src/containers';

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
  