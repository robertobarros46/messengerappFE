import userReducer from './userReducer'

describe('auth reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            users: [],
            user: null,
            page: null,
            size: null,
            totalElements: null,
            totalPages: null,
            last: null,
            serverError: false,
            notFound: false,
            isLoading: false,
            error: null
        }
    });

    it('should return initial state', () => {
        expect(userReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should return initial state when creating user', () => {
        expect(userReducer(initialState, { type: 'CREATE_USER' })).toEqual(initialState);
    });

    it('should set error when creating user has errors', () => {
        expect(userReducer(initialState, {
            type: 'CREATE_USER_ERROR', error: {
                response: {
                    data: 'error'
                }
            }
        })).toEqual({
            ...initialState,
            error: 'error'
        });
    });

    it('should get users', () => {
        expect(userReducer(initialState, {
            type: 'GET_USERs', response: {
                data: {
                    content: [{
                        nome: 'test',
                        sobrenome: 'test',
                        email: 'test@test.com.br',
                        password: '123456',
                        role: 'ROLE_ADMIN'
                    }],
                    page: 0,
                    size: 1,
                    totalElements: 5,
                    totalPages: 1,
                    last: true
                }
            }
        })).toEqual(
            {
                ...initialState,
                users: [{
                    nome: 'test',
                    sobrenome: 'test',
                    email: 'test@test.com.br',
                    password: '123456',
                    role: 'ROLE_ADMIN'
                }],
                page: 0,
                size: 1,
                totalElements: 5,
                totalPages: 1,
                last: true,
            });
    });


    it('Should set notFound if status is 404 when getting users', () => {
        expect(userReducer(initialState, {
            type: 'GET_USERs_ERROR', error: {
                response: {
                    status: 404,
                    data: 'error'
                }
            }
        })).toEqual({
            ...initialState,
            notFound: true,
            isLoading: false,
            error: 'error'
        });
    });

    it('Should set serverError if status is different from 404 when getting users', () => {
        expect(userReducer(initialState, {
            type: 'GET_USERs_ERROR', error: {
                response: {
                    status: 500,
                    data: 'error'
                }
            }
        })).toEqual({
            ...initialState,
            serverError: true,
            isLoading: false,
            error: 'error'
        });
    });

    it('should get user profile', () => {
        expect(userReducer(initialState, {
            type: 'GET_USER_PROFILE', response: {
                data: {
                    id: 'sdadasdaonfo511ga65g1sd',
                    name: 'test',
                    email: 'test@test.com.br',
                    role: 'ROLE_ADMIN'
                }
            }
        })).toEqual(
            {
                ...initialState,
                user: {
                    id: 'sdadasdaonfo511ga65g1sd',
                    name: 'test',
                    email: 'test@test.com.br',
                    role: 'ROLE_ADMIN'
                },
                isLoading: false
            });
    });


    it('Should set notFound if status is 404 when getting user profile', () => {
        expect(userReducer(initialState, {
            type: 'GET_USER_PROFILE_ERROR', error: {
                response: {
                    status: 404,
                    data: 'error'
                }
            }
        })).toEqual({
            ...initialState,
            notFound: true,
            isLoading: false,
            error: 'error'
        });
    });

    it('Should set serverError if status is different from 404 when getting user profile', () => {
        expect(userReducer(initialState, {
            type: 'GET_USER_PROFILE_ERROR', error: {
                response: {
                    status: 500,
                    data: 'error'
                }
            }
        })).toEqual({
            ...initialState,
            serverError: true,
            isLoading: false,
            error: 'error'
        });
    });

    it('should delete user', () => {
        expect(userReducer(
            {
                ...initialState,
                users: [{
                    id: 'dsada1f56a1sf65as1f65a1fs',
                    nome: 'test',
                    sobrenome: 'test',
                    email: 'test@test.com.br',
                    password: '123456',
                    role: 'ROLE_ADMIN'
                },{
                    id: 'sfaf1afds651fds65g156g',
                    nome: 'test1',
                    sobrenome: 'test1',
                    email: 'test1@test.com.br',
                    password: '12345678',
                    role: 'ROLE_USER'
                }]
            }, {
            type: 'DELETE_USER', actions: { id: 'sfaf1afds651fds65g156g'}
        })).toEqual(
            {
                ...initialState,
                users: [{
                    id: 'dsada1f56a1sf65as1f65a1fs',
                    nome: 'test',
                    sobrenome: 'test',
                    email: 'test@test.com.br',
                    password: '123456',
                    role: 'ROLE_ADMIN'
                }]
            });
    });

    it('Should error when delete user has errors', () => {
        expect(userReducer(initialState, {
            type: 'DELETE_USER_ERROR', error: {
                response: {
                    data: 'error'
                }
            }
        })).toEqual({
            ...initialState,
            error: 'error'
        });
    });
});