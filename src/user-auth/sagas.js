import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Firebase from './firebase-class';
let FirebaseClass = new Firebase();

export function* watcherUserSignup() {
    yield takeLatest('USER_CLICKED_SIGNUP', workerUserLogin);
}

export function* workerUserSignup(actionObject) {
    const { email, password } = actionObject;
    console.log('workerUserSignup actionObject ', actionObject);
    
    try {
        const user = yield call(FirebaseClass.registerUser, email, password);
        console.log('user returned from firebase is: ', user);
        // yield call(AsyncStorage.setItem, 'isLoggedIn', 'true');
        // yield put({ type: 'USER_LOGGED_IN', user: 'blah' });
    } catch (error) {
        yield put({ type: 'USER_LOGIN_FAIL', error });
    }
}


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