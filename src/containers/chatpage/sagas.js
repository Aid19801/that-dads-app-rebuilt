import { call, put, takeLatest }   from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
// import * as constants from '../../reducers/constants';
// import { getUserAsyncStorage } from '../../utils/utils';

let isLoaded = false;

export function* watcherLoadChatPage() {
    yield takeLatest('CHAT_PAGE_LOADING', workerLoadChatPage);
}

export function* workerLoadChatPage() {
    yield put({ type: 'CHAT_PAGE_LOADED' });
    yield put({ type: 'GET_ID_DETAILS_FROM_CHROMESTORE' })
}

// // GET | ID DETAILS FROM CHROMESTORE
// export function* watcherGetIdDetailsToSendAMessage() {
//     yield takeLatest('GET_ID_DETAILS_FROM_CHROMESTORE', workerGetIDDetails);
// }

// export function* workerGetIdDetailsToSendAMessage() {
    
//     try {
//         console.log('You have a obj id so now firing worker *Get* IDDetails');
//         const id = yield call(FirebaseClass.getAsyncObjId); // they setup a profile with all info.
//         const resp = yield call(FirebaseClass.getUserDetailsObject, id);
//         const { userName, tagline, likes, dislikes } = resp;
//         yield put({ type: 'GOT_ID_DETAILS_FROM_CHROMESTORE', userName, tagline, likes, dislikes, id });   
//     } catch (error) {
//         console.log('error: ', error);
//     }
    
// }