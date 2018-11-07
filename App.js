import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import * as userAuthScreens from './src/user-auth';
import store from './redux/store';
import firebase from 'firebase';

import firebaseConfig from './src/user-auth/firebase';
firebase.initializeApp(config);

const Routes = createStackNavigator({
  Login: {
    screen: userAuthScreens.LoginPage,
  },
  RegPage: {
    screen: userAuthScreens.RegPage
  },
  LoggedOut: {
    screen: userAuthScreens.LogoutPage,
  },
  LoginError: {
    screen: userAuthScreens.LoginError,
  }
});


const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);


export default App;


