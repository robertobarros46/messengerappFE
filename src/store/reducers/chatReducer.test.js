import chatReducer from './chatReducer'

describe('auth reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            currentChat: '',
            currentChatName: '',
            chats: [],
            messages: [],
            currentMessages: [],
            error: null
        }
    });

    it('should return initial state', () => {
        expect(chatReducer(undefined, { type: '' })).toEqual({
            currentChat: '',
            currentChatName: '',
            chats: [],
            messages: [],
            currentMessages: [],
            error: null
        });
    });

    it('should set chats when getting them', () => {
        expect(chatReducer(initialState, {
            type: 'GET_CHATs', response: {
                data: [{
                    chatId: 'dsadasda56465as4d5a156-da15',
                    chatName: 'test',
                    userId: '654dsada165da4sd984'
                },
                {
                    chatId: 'das541da8da10fs0a320f3asf2-da15',
                    chatName: 'test1',
                    userId: 'dsa165afs1fas0f2asf3'
                }]
            }
        })).toEqual({
            currentChat: '',
            currentChatName: '',
            chats: [{
                chatId: 'dsadasda56465as4d5a156-da15',
                chatName: 'test',
                userId: '654dsada165da4sd984'
            },
            {
                chatId: 'das541da8da10fs0a320f3asf2-da15',
                chatName: 'test1',
                userId: 'dsa165afs1fas0f2asf3'
            }],
            messages: [],
            currentMessages: [],
            error: null
        });
    });
    it('should return initial state when get chats has error', () => {
        expect(chatReducer(initialState, { type: 'GET_CHATs_ERROR', error: {} })).toEqual(initialState);
    });

    it('should set messages when getting them', () => {
        expect(chatReducer(initialState, {
            type: 'GET_MESSAGEs', createdMessages:
                [{
                    messageId: 'dsadasda56465as4d5a156-da15',
                    chatId: 'jk611hat65h15t1a651ht6',
                    fromUser: '65154g1f651gd11gd651g1',
                    content: 'test',
                    fromName: 'tester'
                },
                {
                    messageId: 'hgfhfghg1651shg003gh-da15',
                    chatId: 'jk611hat65h15t1a651ht6',
                    fromUser: '65154g1f651gd11gd651g1',
                    content: 'test1',
                    fromName: 'tester'
                }]
        })).toEqual({
            currentChat: '',
            currentChatName: '',
            chats: [],
            messages: [{
                messageId: 'dsadasda56465as4d5a156-da15',
                chatId: 'jk611hat65h15t1a651ht6',
                fromUser: '65154g1f651gd11gd651g1',
                content: 'test',
                fromName: 'tester'
            },
            {
                messageId: 'hgfhfghg1651shg003gh-da15',
                chatId: 'jk611hat65h15t1a651ht6',
                fromUser: '65154g1f651gd11gd651g1',
                content: 'test1',
                fromName: 'tester'
            }],
            currentMessages: [],
            error: null
        });
    });
    it('should return initial state when get messages has error', () => {
        expect(chatReducer(initialState, { type: 'GET_MESSAGEs_ERROR', error: {} })).toEqual(initialState);
    });

    it('should return initial state when create chat', () => {
        expect(chatReducer(initialState, { type: 'CREATE_CHAT', response: {} })).toEqual(initialState);
    });

    it('should set error when get create chat has error', () => {
        expect(chatReducer(initialState, { type: 'CREATE_CHAT_ERROR', error: { response: 'error' } })).toEqual({
            ...initialState,
            error: 'error'
        });
    });

    it('should set current chat', () => {
        expect(chatReducer(initialState, {
            type: 'SET_CURRENT_CHAT', payload: {
                chatId: 'dsad651dsg1s31gd56a1-g51ag-221gfd',
                email: 'test@test.com.br'
            }
        })).toEqual({
            currentChat: 'dsad651dsg1s31gd56a1-g51ag-221gfd',
            currentChatName: 'test@test.com.br',
            chats: [],
            messages: [],
            currentMessages: [],
            error: null
        });
    });

    it('should add message', () => {
        expect(chatReducer({
            currentChat: '',
            currentChatName: '',
            chats: [],
            messages: [{
                messageId: 'dsadasda56465as4d5a156-da15',
                chatId: 'jk611hat65h15t1a651ht6',
                fromUser: '65154g1f651gd11gd651g1',
                content: 'test',
                fromName: 'tester'
            }],
            currentMessages: [],
            error: null
        }, {
                type: 'ADD_MESSAGE', message: {
                    messageId: 'hgfhfghg1651shg003gh-da15',
                    chatId: 'jk611hat65h15t1a651ht6',
                    fromUser: '65154g1f651gd11gd651g1',
                    content: 'test1',
                    fromName: 'tester'
                }
            })).toEqual({
                currentChat: '',
                currentChatName: '',
                chats: [],
                messages: [{
                    messageId: 'dsadasda56465as4d5a156-da15',
                    chatId: 'jk611hat65h15t1a651ht6',
                    fromUser: '65154g1f651gd11gd651g1',
                    content: 'test',
                    fromName: 'tester'
                },
                {
                    messageId: 'hgfhfghg1651shg003gh-da15',
                    chatId: 'jk611hat65h15t1a651ht6',
                    fromUser: '65154g1f651gd11gd651g1',
                    content: 'test1',
                    fromName: 'tester'
                }],
                currentMessages: [],
                error: null
            });
    });
});