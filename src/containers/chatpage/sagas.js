import { call, put, takeLatest }   from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import * as constants from '../../reducers/constants';
import { getUserAsyncStorage } from '../../utils/utils';

let isLoaded = false;

export function* watcherLoadChatPage() {
    yield takeLatest('LOADED_CHAT_PAGE', workerLoadChatPage);
}

export function* workerLoadChatPage() {
    yield put({ type: 'LOADING_CHAT_PAGE' });
    isLoaded = true;
    // originally was going to pull userId from async storage here
    // but we can get that from redux in the chat page component directly.
    isLoaded ? yield put({ type: 'LOADED_CHAT_PAGE' }) : yield put({ type: 'LOAD_CHAT_PAGE_FAIL' })
}
