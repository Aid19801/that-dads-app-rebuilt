const initialState = {
    isLoading: false,
    userTyping: false,
    error: null,
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
        
    case 'USER_TYPING_MSG':
    console.log('USER_TYPING_MSG');
        return {
            ...state,
            userTyping: true,
        }
        break;
        
    case 'USER_SENDING_MSG':
    console.log('USER_SENDING_MSG');
        return {
            ...state,
            isLoading: true,
            userTyping: false,
        }
        break;
        
    case 'MESSAGE_SENT':
    console.log('MESSAGE_SENT');
        return {
            ...state,
            isLoading: false,
        }
        break;
        
        
    case 'MESSAGE_FAILED':
    console.log('MESSAGE_FAILED');
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;
        
  default:
    return state
  }
}
