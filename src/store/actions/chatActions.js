import axios from '../../utils/axios/axios';

export const getChats = (userId) => {
    return dispatch => {
        axios({
            method: 'get',
            url: '/api/v1/chats/' + userId,
        }).then(response => {
            dispatch({ type: 'GET_CHATs', response });
        }).catch(error => {
            dispatch({ type: 'GET_CHATs_ERROR', error });
        });;
    }
}

export const getMessages = (chatId) => {
    return dispatch => {
        axios({
            method: 'get',
            url: '/api/v1/chats/' + chatId + '/messages'
        }).then(response => {
            const createdMessages = createMessages(response.data._embedded.messageList);
            dispatch({ type: 'GET_MESSAGEs', createdMessages });
        }).catch(error => {
            dispatch({ type: 'GET_MESSAGEs_ERROR', error });
        });;
    }
}

export const getUsersByChat = (chatId, email) => {
    return dispatch => {
        axios({
            method: 'get',
            url: '/api/v1/chats/' + chatId + '/' + email +'/users'
        }).then(response => {
            dispatch({ type: 'GET_USERs_BY_CHAT', response });
        }).catch(error => {
            dispatch({ type: 'GET_USERs_BY_CHAT_ERROR', error });
        });;
    }
}

export const setRoomUsers = () => {
    return dispatch => {
        dispatch({ type: 'ROOM_USERS' });
    }
}

// export const getCurrentMessages = (chatId) => {
//     return dispatch => {
//         axios({
//             method: 'get',
//             url: '/api/v1/chats/' + chatId + '/messages'
//         }).then(response => {
//             const createdMessages = createMessages(response.data._embedded.messageList);
//             dispatch({ type: 'GET_CURRENT_MESSAGEs', createdMessages });
//         }).catch(error => {
//             dispatch({ type: 'GET_CURRENT_MESSAGEs_ERROR', error });
//         });;
//     }
// }

function createMessages(response) {
    let data = [];
    for (let i = 0; i < response.length; i++) {
        data.push({
            key: Math.random(),
            messageId: response[i].messageId,
            fromName: response[i].fromName,
            fromUserId: response[i].fromUserId,
            content: response[i].content,
            chatId: response[i].chatId
        })
    }
    return data;
}

export const createChat = (createChatRequest, email) => {
    return dispatch => {
        axios({
            method: 'put',
            url: '/api/v1/chats',
            data: JSON.stringify(createChatRequest),
            config: { headers: { 'Content-Type': 'application/json' } }
        }).then(response => {
            dispatch({ type: 'CREATE_CHAT', actions:{response, createChatRequest, email}});
        }).catch(error => {
            dispatch({ type: 'CREATE_CHAT_ERROR', error });
        });;
    }
}

export const editChat = (editChatRequest, email, chatId) => {
    return dispatch => {
        axios({
            method: 'put',
            url: '/api/v1/chats/' + chatId,
            data: JSON.stringify(editChatRequest),
            config: { headers: { 'Content-Type': 'application/json' } }
        }).then(response => {
            dispatch({ type: 'EDIT_CHAT', actions:{response, email, chatId}});
        }).catch(error => {
            dispatch({ type: 'EDIT_CHAT_ERROR', error });
        });;
    }
}

export const deleteChat = (chatId) => {
    return dispatch => {
        axios({
            method: 'delete',
            url: '/api/v1/chats/' + chatId,
        }).then(response => {
            dispatch({ type: 'DELETE_CHAT', actions: { chatId, response } });
        }).catch(error => {
            dispatch({ type: 'DELETE_CHAT_ERROR', error });
        });
    }
}

export const setCurrentChat = (chatId, email) => {
    let payload = {
        chatId: chatId,
        email: email
    }
    return dispatch => {
        dispatch({ type: 'SET_CURRENT_CHAT', payload });
    }
}

export const addMessage = (message) => {
    return dispatch => {
        dispatch({ type: 'ADD_MESSAGE', message });
    }
}