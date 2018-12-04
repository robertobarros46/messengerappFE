import authReducer from './authReducer'

describe('auth reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            notFound: false,
            serverError: false,
            loggedUsers: []
        }
    });
    it('should return initial state', () => {
        expect(authReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('Should set isAuthenticated to true upon login', () => {
        expect(authReducer(initialState, { type: 'LOGIN', response: '' })).toEqual({
            currentUser: null,
            isAuthenticated: true,
            isLoading: false,
            notFound: false,
            serverError: false,
            loggedUsers: []
        });
    });

    it('Should return initialstate if login has error', () => {
        expect(authReducer(initialState, { type: 'LOGIN_ERROR', response: '' })).toEqual({
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            notFound: false,
            serverError: false,
            loggedUsers: []
        });
    });

    it('Should set isAuthenticated to true and set current user when getting it', () => {
        expect(authReducer(initialState, {
                type: 'GET_CURRENT_USER', response: {
                    data: {
                        id: 'sada65d1ad651a65d1sa6',
                        name: 'test',
                        email: 'test@test.com.br'
                    }
                }
            })).toEqual({
                currentUser: {
                    id: 'sada65d1ad651a65d1sa6',
                    name: 'test',
                    email: 'test@test.com.br'
                },
                isAuthenticated: true,
                isLoading: false,
                notFound: false,
                serverError: false,
                loggedUsers: []
            });
    });
    it('Should return initialstate if get current user has error', () => {
        expect(authReducer(initialState, { type: 'GET_CURRENT_USER_ERROR', response: '' })).toEqual({
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            notFound: false,
            serverError: false,
            loggedUsers: []
        });
    });
    it('Should set loggedUsers when getting logged users', () => {
        expect(authReducer(initialState, {
                type: 'GET_LOGGED_USERs', response: {
                    data: [{
                        id: 'sada65d1ad651a65d1sa6',
                        name: 'test',
                        email: 'test@test.com.br'
                    },
                    {
                        id: 'sada6dsd5d1ad651a65d1sa6',
                        name: 'test1',
                        email: 'test1@test.com.br'
                    }]
                }
            })).toEqual({
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
                notFound: false,
                serverError: false,
                loggedUsers: [{
                    id: 'sada65d1ad651a65d1sa6',
                    name: 'test',
                    email: 'test@test.com.br'
                },
                {
                    id: 'sada6dsd5d1ad651a65d1sa6',
                    name: 'test1',
                    email: 'test1@test.com.br'
                }]
            });
    });
    it('Should set notFound if status is 404 when getting logged users', () => {
        expect(authReducer(initialState, {
            type: 'GET_LOGGED_USERs_ERROR', error: {
                response: {
                    status: 404
                }
            }
            })).toEqual({
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
                notFound: true,
                serverError: false,
                loggedUsers: []
            });
    });

    it('Should set serverError if status is different from 404 when getting logged users', () => {
        expect(authReducer(initialState, {
            type: 'GET_LOGGED_USERs_ERROR', error: {
                response: {
                    status: 500
                }
            }
            })).toEqual({
                currentUser: null,
                isAuthenticated: false,
                isLoading: false,
                notFound: false,
                serverError: true,
                loggedUsers: []
            });
    });
});