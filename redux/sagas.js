import { all } from 'redux-saga/effects';
import { watcherUserLogin, watcherUserSignup } from '../src/user-auth/sagas';
import { watcherLoadNews, watcherKillAllAsync, watcherGetUID } from '../src/containers/homepage/sagas';
import { watcherProfilePage, watcherGetIDDetails, watcherSetIDDetails } from '../src/containers/profilepage/sagas';

function* rootSaga() {
    yield all([
        watcherLoadNews(),
        watcherGetUID(),
        watcherKillAllAsync(),
        watcherUserLogin(),
        watcherUserSignup(),
        watcherProfilePage(),
        
        // setting/getting obj id details
        watcherGetIDDetails(),
        watcherSetIDDetails(),
    ])
}

export default rootSaga;