const initialState = {
    isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT_PAGE_LOADING':
    console.log('CHAT_PAGE_LOADING');
        return {
            ...state,
            isLoading: true,
        }
        break;
    case 'CHAT_PAGE_LOADED':
    console.log('CHAT_PAGE_LOADED');
        return {
            ...state,
            isLoading: false,
        }
        break;
        
  default:
    return state
  }
}
