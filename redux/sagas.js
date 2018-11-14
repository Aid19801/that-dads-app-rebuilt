import { all } from 'redux-saga/effects';
import { watcherUserLogin, watcherUserSignup } from '../src/user-auth/sagas';
import { watcherLoadNews } from '../src/containers/homepage/sagas';

function* rootSaga() {
    yield all([
        watcherLoadNews(),
        watcherUserLogin(),
        watcherUserSignup(),
    ])
}

export default rootSaga;