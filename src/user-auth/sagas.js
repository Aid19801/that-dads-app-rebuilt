import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Firebase from './firebase-class';
let FirebaseClass = new Firebase();

export function* watcherUserLogin() {
    yield takeLatest('USER_CLICKED_LOGIN', workerUserLogin);
}

function* workerUserLogin(actionObject) {
    const { email, password } = actionObject;
    console.log('actionObject ', actionObject);
    
    try {
        yield call(FirebaseClass.login, email, password);
        yield call(AsyncStorage.setItem, 'isLoggedIn', 'true');
        yield put({ type: 'USER_LOGGED_IN' });
    } catch (error) {
        yield put({ type: 'USER_LOGIN_FAIL', error });
    }
}

// how do you set async storage inside a saga?