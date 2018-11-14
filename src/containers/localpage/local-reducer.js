const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default localpageReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOCAL_PAGE_LOADING':
        console.log('LOCAL_PAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;

        case 'LOCAL_PAGE_LOADED':
        console.log('LOCAL_PAGE_LOADED');
            return {
                ...state,
                isLoading: false,
            }
            break;

        default:
        return state;
    }
}