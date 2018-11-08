import { all } from 'redux-saga/effects';
import { watcherUserLoggingIn, watcherUserLogInSuccess } from '../src/user-auth/sagas';

function* rootSaga() {
    yield all([
        watcherUserLoggingIn(),
        watcherUserLogInSuccess(),
    ])
}

export default rootSaga;