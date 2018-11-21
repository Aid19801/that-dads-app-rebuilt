import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';

import { firebaseConfig } from './src/user-auth/firebase';
import { createRootNavigator, isSignedIn } from './router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const uid = () => {
  AsyncStorage.getItem('uid')
    .then(res => {
      if (res === 'false' || res === null) {
        return null;
      } else {
        return res;
      }
    })
    .catch(err => console.log(err));
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
      .catch(err => console.log('err: ', err))
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