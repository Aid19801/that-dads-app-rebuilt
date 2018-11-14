const initialState = {
    isLoading: false,
    email: '',
    password: '',
    error: null,
    isLoggedIn: false,
}

export default loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_PAGE_LOADING':
        console.log('LOGIN_PAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case 'LOGIN_PAGE_LOADED':
        console.log('LOGIN_PAGE_LOADED');
            return {
                ...state,
                isLoading: false,
            }
            break;

        case 'USER_CLICKED_LOGIN':
        console.log('USER_CLICKED_LOGIN');
            return {
                ...state,
                isLoading: true,
                email: action.email,
                password: action.password,
            }
            break;

        case 'USER_LOGGED_IN':
        console.log('USER_LOGGED_IN');
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
            }
            break;

        case 'USER_LOGIN_FAIL':
        console.log('USER_LOGIN_FAIL', action.error);
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
            break;

        default:
        return state;
    }
}