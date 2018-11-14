import { combineReducers } from 'redux';
import homepageReducer from '../src/containers/homepage/reducer';
import loginReducer from '../src/user-auth/login-reducer';
import signUpReducer from '../src/user-auth/signup-reducer';

const reducers = combineReducers({
    homepage: homepageReducer,
    login: loginReducer,
    signup: signUpReducer,

})

export default reducers;