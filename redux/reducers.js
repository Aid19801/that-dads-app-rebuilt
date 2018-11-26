import { combineReducers } from 'redux';

import chatPageReducer from '../src/containers/chatpage/reducer';
import homepageReducer from '../src/containers/homepage/reducer';
import localpageReducer from '../src/containers/localpage/local-reducer';
import loginReducer from '../src/user-auth/login-reducer';
import profilepageReducer from '../src/containers/profilepage/reducer';
import signUpReducer from '../src/user-auth/signup-reducer';

const reducers = combineReducers({
    homepage: homepageReducer,
    local: localpageReducer,
    login: loginReducer,
    profile: profilepageReducer,
    signup: signUpReducer,
    chat: chatPageReducer,
})

export default reducers;