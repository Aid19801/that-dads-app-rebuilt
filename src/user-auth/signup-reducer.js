const initialState = {
    isLoading: false,
    email: '',
    password: '',
    isError: false,
}

export default signUpReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGNUP_PAGE_LOADING':
        console.log('SIGNUP_PAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case 'SIGNUP_PAGE_LOADED':
        console.log('SIGNUP_PAGE_LOADED');
            return {
                ...state,
                isLoading: false,
            }
            break;

        case 'USER_CLICKED_SIGNUP':
        console.log('USER_CLICKED_SIGNUP: ', action);
            return {
                ...state,
                isLoading: true,
                email: action.email,
                password: action.password,
            }
            break;

        case 'USER_SIGNUP_SUCCESS':
        console.log('USER_SIGNUP_SUCCESS: ', action);
            return {
                ...state,
                isLoading: false,
                uid: action.uid
            }
            break;

        case 'USER_SIGNUP_FAIL':
        console.log('USER_SIGNUP_FAIL: ', action);
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
            break;

        default:
        return state;
    }
}