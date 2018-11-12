const initialState = {
    isLoading: false,
    email: '',
    password: '',
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
        console.log('USER_CLICKED_SIGNUP: ', action);
            return {
                ...state,
                isLoading: false,
                uid: action.uid
            }
            break;

        case 'USER_SIGNUP_FAIL':
        console.log('USER_CLICKED_SIGNUP: ', action);
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