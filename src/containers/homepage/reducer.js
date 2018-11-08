import * as actions from './constants';
const { HOMEPAGE_LOADED, HOMEPAGE_LOADING } = actions;

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default homepageReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOMEPAGE_LOADING:
        console.log('HOMEPAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case HOMEPAGE_LOADED:
        console.log('HOMEPAGE_LOADED');
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