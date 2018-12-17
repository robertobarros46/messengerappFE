const initState = {
    currentChat: '',
    currentChatName: '',
    chats: [],
    messages: [],
    roomUsersEmail: [],
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
        case 'GET_USERs_BY_CHAT':
            return {
                ...state,
                roomUsersEmail: action.response.data,
            }
        case 'GET_USERs_BY_CHAT_ERROR':
            return {
                ...state,
                error: action.error.response
            }
        case 'ROOM_USERS':
            return {
                ...state,
                roomUsersEmail: []
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
        case 'DELETE_CHAT':
            return {
                ...state,
                chats: state.chats.filter((row) => row.id !== action.actions.id)
            }
        case 'DELETE_CHAT_ERROR':
            return {
                ...state,
                error: action.error.response
            }
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