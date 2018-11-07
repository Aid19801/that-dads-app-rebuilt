import { createStore } from 'redux';
import { combineReducers } from 'redux';
import loginReducer from '../src/user-auth/reducer';

const RootReducer = combineReducers({
    login: loginReducer
})

const store = createStore(RootReducer)

export default store;