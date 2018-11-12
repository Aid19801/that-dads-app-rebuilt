import { all } from 'redux-saga/effects';
import { watcherUserLogin } from '../src/user-auth/sagas';

function* rootSaga() {
    yield all([
        watcherUserLogin(),
    ])
}

export default rootSaga;