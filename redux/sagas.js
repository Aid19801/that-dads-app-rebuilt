import { all } from 'redux-saga/effects';
import { watcherUserLogin, watcherUserSignup } from '../src/user-auth/sagas';

function* rootSaga() {
    yield all([
        watcherUserLogin(),
        watcherUserSignup(),
    ])
}

export default rootSaga;