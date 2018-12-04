const initialState = {
    isLoading: false,
    isError: null,
    newUser: false,
    userName: '',
    tagline: '',
    likes: '',
    dislikes: '',
    id: '',
    uid: '',
    profilePicExists: false,
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

        case 'GOT_ID_DETAILS_FROM_CHROMESTORE':
        console.log('GOT_ID_DETAILS_FROM_CHROMESTORE');
            return {
                ...state,
                isLoading: false,
                userName: action.userName,
                tagline: action.tagline,
                likes: action.likes,
                dislikes: action.dislikes,
                id: action.id,
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

        case 'ID_DETAILS_SET':
        console.log('ID_DETAILS_SET: ', action);
            return {
                ...state,
                isLoading: false,
                id: action.id,
                newUser: false,
            }
            break;

        case 'SETTING_IMAGE':
        console.log('SETTING_IMAGE: ', action);
            return {
                ...state,
                isLoading: true,
            }
            break;

        case 'IMAGE_SET':
        console.log('IMAGE_SET: ', action);
            return {
                ...state,
                isLoading: false,
                profilePicExists: true,
            }
            break;

        case 'IMAGE_FAILED':
        console.log('IMAGE_SET: ', action);
            return {
                ...state,
                isLoading: false,
                
            }
            break;

        default:
        return state;
    }
}