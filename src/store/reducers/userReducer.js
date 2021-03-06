const initState = {
    users: [],
    messages: [],
    user: null,
    page: null,
    size: null,
    totalElements: null,
    totalPages: null,
    last: null,
    chatPage: null,
    chatSize: null,
    chatTotalElements: null,
    chatTotalPages: null,
    chatLast: null,
    serverError: false,
    notFound: false,
    isLoading: false,
    error: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                ...state
            }
        case 'CREATE_USER_ERROR':
            return {
                ...state,
                error: action.error.response.data
            }
        case 'GET_USERs':
            return {
                ...state,
                users: action.response.data.content,
                page: action.response.data.page,
                size: action.response.data.size,
                totalElements: action.response.data.totalElements,
                totalPages: action.response.data.totalPages,
                last: action.response.data.last
            }
        case 'GET_USERs_ERROR':
            if (action.error.response.status === 404) {
                return {
                    ...state,
                    notFound: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            } else {
                return {
                    ...state,
                    serverError: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            }
        case 'GET_ALL_MESSAGES':
            return {
                ...state,
                messages: action.response.data.content,
                page: action.response.data.page,
                size: action.response.data.size,
                totalElements: action.response.data.totalElements,
                totalPages: action.response.data.totalPages,
                last: action.response.data.last
            }
        case 'GET_ALL_MESSAGES_ERROR':
            if (action.error.response.status === 404) {
                return {
                    ...state,
                    notFound: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            } else {
                return {
                    ...state,
                    serverError: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            }
        case 'GET_ALL_CHATS':
            return {
                ...state,
                chats: action.response.data.content,
                chatPage: action.response.data.page,
                chatSize: action.response.data.size,
                chatTotalElements: action.response.data.totalElements,
                chatTotalPages: action.response.data.totalPages,
                chatLast: action.response.data.last
            }
        case 'GET_ALL_CHATS_ERROR':
            if (action.error.response.status === 404) {
                return {
                    ...state,
                    notFound: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            } else {
                return {
                    ...state,
                    serverError: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            }
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter((row) => row.id !== action.actions.id)
            }
        case 'DELETE_USER_ERROR':
            return {
                ...state,
                error: action.error.response.data
            }
        case 'GET_USER_PROFILE':
            return {
                ...state,
                ...state.users,
                user: action.response.data,
                isLoading: false
            }
        case 'GET_USER_PROFILE_ERROR':
            if (action.error.response.status === 404) {
                return {
                    ...state,
                    notFound: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            } else {
                return {
                    ...state,
                    serverError: true,
                    isLoading: false,
                    error: action.error.response.data
                }
            }
        case 'LOGOUT':
            return {
                state: undefined
            }
        case 'LOGOUT_ERROR':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default userReducer;