import { AsyncStorage } from 'react-native';
import { call, put, takeLatest }   from 'redux-saga/effects';
import Firebase from '../../user-auth/firebase-class';
let FirebaseClass = new Firebase();

export function* watcherProfilePage() {
    yield takeLatest('PROFILE_PAGE_LOADING', workerProfilePage);
}

export function* workerProfilePage() {
    
    // establish *how* logged in this user is
    const isLoggedIn = yield call(AsyncStorage.getItem, 'isLoggedIn'); // they setup an email/pw acc.
    const uid = yield call(AsyncStorage.getItem, 'uid'); // it came back as positive
    const id = yield call(FirebaseClass.getAsyncObjId); // they setup a profile with all info.

    // if we're logged in, we've saved user auth & we've previously saved
    // object ID details - then fire off the actions to retrieve them.
    
    isLoggedIn && uid && id ? yield put({ type: 'GET_ID_DETAILS_FROM_CHROMESTORE' }) : yield put({ type: 'NO_ID_DETAILS_PREV_SAVED' })

    // if we're logged in, we've saved user auth & there's no such thing
    // as an ID for object details, then just show the ID DETAILS INPUTS
    // isLoggedIn && uid && id == null ? yield 

}

// GET | ID DETAILS FROM CHROMESTORE
export function* watcherGetIDDetails() {
    yield takeLatest('GET_ID_DETAILS_FROM_CHROMESTORE', workerGetIDDetails);
}

export function* workerGetIDDetails() {
    
    try {
        console.log('You have a obj id so now firing worker *Get* IDDetails');
        const id = yield call(FirebaseClass.getAsyncObjId); // they setup a profile with all info.
        const resp = yield call(FirebaseClass.getUserDetailsObject, id);
        const { userName, tagline, likes, dislikes } = resp;
        yield put({ type: 'GOT_ID_DETAILS_FROM_CHROMESTORE', userName, tagline, likes, dislikes });   
    } catch (error) {
        console.log('error: ', error);
    }
    
}


// SET | ID DETAILS TO CHROMESTORE
export function* watcherSetIDDetails() {
    yield takeLatest('SETTING_ID_DETAILS', workerSetIDDetails);
}

export function* workerSetIDDetails(actionObj) {
    console.log('Setting ID details...actionObj :', actionObj);
    
    const { userName, tagline, likes, dislikes, uid } = actionObj;

    try {
        yield call(FirebaseClass.setUserDetailsObject, userName, tagline, likes, dislikes, uid);
    } catch (error) {
        console.log('error: ', error);
    }
}