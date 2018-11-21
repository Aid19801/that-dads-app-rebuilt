import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Firebase from './firebase-class';
let FirebaseClass = new Firebase();

export function* watcherUserSignup() {
    yield takeLatest('USER_CLICKED_SIGNUP', workerUserSignup);
}

export function* workerUserSignup(actionObject) {
    const { email, password } = actionObject;
    console.log('workerUserSignup actionObject ', actionObject);
    
    try {
        const user = yield call(FirebaseClass.registerUser, email, password);
        if (user.user.uid) {
            yield put({ type: 'USER_SIGNUP_SUCCESS', uid: user.user.uid });
            yield call(AsyncStorage.setItem, 'isLoggedIn', 'true');
            yield call(AsyncStorage.setItem, 'uid', user.user.uid);
            yield put({ type: 'USER_LOGGED_IN', uid: user.user.uid });
        }
    } catch (error) {
        yield put({ type: 'USER_SIGNUP_FAIL', error });
    }
}


export function* watcherUserLogin() {
    yield takeLatest('USER_CLICKED_LOGIN', workerUserLogin);
}

function* workerUserLogin(actionObject) {
    const { email, password } = actionObject;
    console.log('actionObject ', actionObject);
    
    try {
        const resp = yield call(FirebaseClass.login, email, password);
        yield call(AsyncStorage.setItem, 'isLoggedIn', 'true');
        yield call(AsyncStorage.setItem, 'uid', resp.user.uid);
        yield put({ type: 'USER_LOGGED_IN', uid: resp.user.uid });
    } catch (error) {
        yield put({ type: 'USER_LOGIN_FAIL', error });
    }
}

// adrian@ade1.com
// how do you set async storage inside a saga?