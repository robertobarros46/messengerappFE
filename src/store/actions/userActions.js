import axios from '../../utils/axios/axios'
import { notification } from 'antd';

export const createUser = (user) => {
    return dispatch => {
        axios({
            method: 'post',
            url: "/api/v1/users",
            data: JSON.stringify(user),
            config: { headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'} }
        }).then(response => {
            notification.success({
                message: 'Messenger App',
                description: "Obrigado! Você está cadastro com sucesso. Faça o login para continuar!",
            });
            dispatch({ type: 'CREATE_USER', response });
        }).catch(error => {
            notification.error({
                message: 'Messenger App',
                description: error.response.data || 'Desculpe! Algo inesperado aconteceu. Por favor tente novamente!'
            });
            dispatch({ type: 'CREATE_USER_ERROR', error });
        });
    }
}

export const getUsers = (page, size) => {
    return dispatch => {
        axios({
            method: 'get',
            url: "/api/v1/users?page=" + page + "&size=" + size,
        }).then(response => {
            dispatch({ type: 'GET_USERs', response });
        }).catch(error => {
            dispatch({ type: 'GET_USERs_ERROR', error });
        });
    }
}

export const deleteOneUser = (email, id) => {
    return dispatch => {
        axios({
            method: 'delete',
            url: "/api/v1/users?email=" + email,
        }).then(response => {
                notification.success({
                    message: 'Messenger App',
                    description: 'Usuário deletado com sucesso'
                });
                dispatch({ type: 'DELETE_USER', actions: { email, id, response } });
            }).catch(error => {
                if (error.response.status === 404) {
                    notification.error({
                        message: 'Messenger App',
                        description: 'Não foi possível deletar esse usuário, ele não se encontra em nossa base de dados!'
                    });
                } else {
                    notification.error({
                        message: 'Messenger App',
                        description: error.response.data || 'Desculpe! Algo inesperado aconteceu. Por favor tente novamente!'
                    });
                }
                dispatch({ type: 'DELETE_USER_ERROR', error });
            });
    }
}

export const loadProfile = (email) => {
    return dispatch => {
        axios({
            method: 'get',
            url: '/api/v1/users/' + email,
        }).then(response => {
            dispatch({type: 'GET_USER_PROFILE', response});
        }).catch(error => {
            dispatch({ type: 'GET_USER_PROFILE_ERROR', error });;
        });
    }
}