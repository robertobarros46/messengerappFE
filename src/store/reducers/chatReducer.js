const initState = {
    currentChat: '',
    currentChatName: '',
    chats: [],
    messages: [],
    currentMessages: [],
    error: null
}

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_CHATs':
            return {
                ...state,
                chats: action.response.data
            }
        case 'GET_CHATs_ERROR':
            return {
                ...state
            }
        case 'GET_MESSAGEs':
            return {
                ...state,
                messages: action.createdMessages,
            }
        case 'GET_MESSAGEs_ERROR':
            return {
                ...state
            }
        // case 'GET_CURRENT_MESSAGEs':
        //     return {
        //         ...state,
        //         currentMessages: action.createdMessages,
        //     }
        // case 'GET_CURRENT_MESSAGEs_ERROR':
        //     return {
        //         ...state
        //     }
        case 'CREATE_CHAT':
            return {
                ...state,
            }
        case 'CREATE_CHAT_ERROR':
            return {
                ...state,
                error: action.error.response
            }
        case 'SET_CURRENT_CHAT':
            return {
                ...state,
                messages: [],
                currentChat: action.payload.chatId,
                currentChatName: action.payload.email
            }
        case 'ADD_MESSAGE':
            let messages = [...state.messages, action.message]
            return {
                ...state,
                messages,
            }
        default:
            return state;
    }
}

export default chatReducer;