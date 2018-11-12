import { combineReducers } from 'redux';
import loginReducer from '../src/user-auth/login-reducer';

const reducers = combineReducers({
    login: loginReducer,
})

export default reducers;