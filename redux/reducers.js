import { combineReducers } from 'redux';
import loginReducer from '../src/user-auth/login-reducer';
import signUpReducer from '../src/user-auth/signup-reducer';

const reducers = combineReducers({
    login: loginReducer,
    signup: signUpReducer,
})

export default reducers;