import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './constants';
import { saveAsync } from './firebase';

export function* watcherUserLoggingIn() {
    yield takeLatest(actions.USER_LOGGING_IN, workerUserLoggingIn);
}

export function* workerUserLoggingIn() {
    yield put({ type: actions.FIREBASE_LOGIN_STARTED });
}

export function* watcherUserLogInSuccess() {
    yield takeLatest(actions.USER_LOGIN_SUCCESS, workerUserLogInSuccess);
}

export function* workerUserLogInSuccess(actionObj) {
    console.log('AT | actionObj: ', actionObj);
    yield put({ type: actions.SAVING_UID_TO_ASYNC_STORAGE });
    yield call(saveAsync, actionObj.uid);
    
}
