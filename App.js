import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import * as userAuthScreens from './src/user-auth';
import * as appScreens from './src/containers';
import store from './redux/store';
import firebase from 'firebase';

import { firebaseConfig } from './src/user-auth/firebase';
firebase.initializeApp(firebaseConfig);

const Routes = createStackNavigator({
  RegPage: {
    screen: userAuthScreens.RegPage
  },
  Home: {
    screen: appScreens.HomePage,
  },
  Login: {
    screen: userAuthScreens.LoginPage,
  },
  LoggedOut: {
    screen: userAuthScreens.LogoutPage,
  },
  LoginError: {
    screen: userAuthScreens.LoginError,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });


const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);


export default App;

