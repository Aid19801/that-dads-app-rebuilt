import { combineReducers } from 'redux';
import loginReducer from '../src/user-auth/reducer';
import homepageReducer from '../src/containers/homepage/reducer';

const reducers = combineReducers({
    login: loginReducer,
    home: homepageReducer,
})

export default reducers;