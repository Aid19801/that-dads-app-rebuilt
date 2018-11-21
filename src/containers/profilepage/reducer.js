const initialState = {
    isLoading: false,
    isError: null,
    newUser: false,
    userName: '',
    tagline: '',
    likes: '',
    dislikes: '',
}

export default profilepageReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PROFILE_PAGE_LOADING':
        console.log('PROFILE_PAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case 'PROFILE_PAGE_LOADED':
        console.log('PROFILE_PAGE_LOADED');
            return {
                ...state,
                isLoading: false,
            }
            break;

        case 'GET_ID_DETAILS_FROM_CHROMESTORE':
        console.log('GET_ID_DETAILS_FROM_CHROMESTORE');
            return {
                ...state,
                isLoading: true,
            }
            break;

        case 'NO_ID_DETAILS_PREV_SAVED':
        console.log('NO_ID_DETAILS_PREV_SAVED');
            return {
                ...state,
                isLoading: false,
                newUser: true,
            }
            break;

        case 'NO_ID_DETAILS_ON_CHROMESTORE':
        console.log('NO_ID_DETAILS_ON_CHROMESTORE');
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
            break;

        case 'SETTING_ID_DETAILS':
        console.log('SETTING_ID_DETAILS');
            return {
                ...state,
                isLoading: true,
                userName: action.userName,
                tagline: action.tagline,
                likes: action.likes,
                dislikes: action.dislikes,
                uid: action.uid,
            }
            break;

        default:
        return state;
    }
}