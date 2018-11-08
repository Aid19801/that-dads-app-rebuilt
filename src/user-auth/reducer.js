import * as actions from './constants';
const { LOGIN_PAGE_LOADING, LOGIN_PAGE_LOADED, LOGIN_PAGE_FAIL,
    USER_LOGGING_IN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, FIREBASE_LOGIN_STARTED } = actions;

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    uid: null,
}

export default loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_PAGE_LOADING:
        console.log('LOGIN_PAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case LOGIN_PAGE_LOADED:
        console.log('LOGIN_PAGE_LOADED');
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
            }
            break;

        case LOGIN_PAGE_FAIL:
        console.log('LOGIN_PAGE_FAIL');
        return {
            ...state,
            error: action.error,
            isLoading: false,
            isLoaded: false,
        }
        break;

        case USER_LOGGING_IN:
        console.log('USER_LOGGING_IN');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case FIREBASE_LOGIN_STARTED:
        console.log('FIREBASE_LOGIN_STARTED');
        return {
            ...state,
            isLoading: true,
            isLoaded: false,
        }
        break;

        case USER_LOGIN_SUCCESS:
        console.log('USER_LOGIN_SUCCESS', action.uid);
        return {
            ...state,
            isLoading: false,
            isLoaded: true,
            uid: action.uid,
        }
        break;

        case USER_LOGIN_FAIL:
        console.log('USER_LOGIN_FAIL');
        return {
            ...state,
            isLoading: false,
            isLoaded: true,
        }
        break;


        default:
        return state;
    }
}