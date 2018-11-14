import { combineReducers } from 'redux';
import homepageReducer from '../src/containers/homepage/reducer';
import localpageReducer from '../src/containers/localpage/local-reducer';
import loginReducer from '../src/user-auth/login-reducer';
import signUpReducer from '../src/user-auth/signup-reducer';

const reducers = combineReducers({
    homepage: homepageReducer,
    local: localpageReducer,
    login: loginReducer,
    signup: signUpReducer,

})

export default reducers;