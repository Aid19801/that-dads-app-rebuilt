const initialState = {
    isLoading: false,
    error: null,
}

export default homepageReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'HOMEPAGE_LOADING':
        console.log('HOMEPAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case 'HOMEPAGE_LOADED':
        console.log('HOMEPAGE_LOADED');
            return {
                ...state,
                isLoading: false,
            }
            break;

        case 'NEWS_LOADING':
        console.log('NEWS_LOADING');
            return {
                ...state,
                isLoading: true,
            }
            break;

        case 'NEWS_LOADED':
        console.log('NEWS_LOADED: ', action.stories);
            return {
                ...state,
                isLoading: false,
                stories: action.stories,
            }
            break;

        case 'NEWS_FAILED':
        console.log('NEWS_FAILED: ');
            return {
                ...state,
                isLoading: false,
            }
            break;

        case 'KILL_ALL_ASYNC':
        console.log('KILL_ALL_ASYNC');
            return {
                ...state,
            }
            break;

        default:
        return state;
    }
}