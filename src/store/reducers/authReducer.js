const initState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    notFound: false,
    serverError: false,
    loggedUsers: []
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true
            }
        case 'LOGIN_ERROR':
            return {
                ...state
            }
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false
            }
        case 'LOGOUT_ERROR':
            return {
                ...state
            }
        case 'GET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.response.data,
                isAuthenticated: true
            }
        case 'GET_CURRENT_USER_ERROR':
            return {
                ...state
            }
        case 'GET_LOGGED_USERs':
            return {
                ...state,
                loggedUsers: action.response.data
            }
        case 'GET_LOGGED_USERs_ERROR':
            if (action.error.response.status === 404) {
                return {
                    ...state,
                    notFound: true,
                    isLoading: false
                }
            } else {
                return {
                    ...state,
                    serverError: true,
                    isLoading: false
                }
            }
        default:
            return state;

    }
}

export default authReducer;