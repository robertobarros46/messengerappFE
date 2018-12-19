const initState = {
    currentChat: '',
    currentChatName: '',
    chats: [],
    messages: [],
    roomUsersEmail: [],
    roomUsersId: [],
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
                roomUsersId: action.response.data.map(user => user.id),
                roomUsersEmail: action.response.data.map(user => user.email)
            }
        case 'GET_USERs_BY_CHAT_ERROR':
            return {
                ...state,
                error: action.error.response
            }
        case 'ROOM_USERS':
            return {
                ...state,
                roomUsers: []
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
                chats: state.chats.filter((row) => row.chatId !== action.actions.chatId)
            }
        case 'DELETE_CHAT_ERROR':
            return {
                ...state,
                error: action.error.response
            }
        case 'CREATE_CHAT':
            return {
                ...state,
                chats: [...state.chats, {
                    row: '',
                    chatId: action.actions.response.data[0].chatId,
                    chatName: action.actions.email,
                    userId: action.actions.createChatRequest.userId,
                    chatType: action.actions.createChatRequest.chatType,
                    timestamp: ''
                }]
            }
        case 'CREATE_CHAT_ERROR':
            return {
                ...state,
                error: action.error.response
            }
        case 'EDIT_CHAT':
            state.chats.forEach(function (chat) {
                if (action.actions.chatId === chat.chatId) {
                    chat.chatName = action.actions.email
                }
            });
            return {
                ...state
            }
        case 'EDIT_CHAT_ERROR':
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