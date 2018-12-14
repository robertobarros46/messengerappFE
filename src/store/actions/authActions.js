import axios from '../../utils/axios/axios'
import { notification } from 'antd';

export const doLogin = (loginRequest) => {
    return dispatch => {
        let bodyForm = new FormData();
        bodyForm.set('username', loginRequest.usernameOrEmail);
        bodyForm.set('password', loginRequest.password);
        axios({
            method: 'post',
            url: '/login',
            data: bodyForm,
            config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        }).then(response => {
            notification.success({
                message: 'Messenger App',
                description: "Login realizado com sucesso!",
            });
            localStorage.setItem("CurrentUser", loginRequest.usernameOrEmail)
            loadCurrentUser(dispatch);
            dispatch({
                type: 'LOGIN', response
            });
        }).catch(error => {
            if (error.response.status === 401) {
                notification.error({
                    message: 'Messenger App',
                    description: 'Email ou senha estão incorretos. Por favor tente novamente!'
                });
            } else {
                notification.error({
                    message: 'Messenger App',
                    description: error.response.data || 'Desculpe! Algo inesperado aconteceu. Por favor tente novamente!'
                });
            }
            dispatch({ type: 'LOGIN_ERROR', error });;
        });
    }
}

function loadCurrentUser(dispatch) {
    axios({
        method: 'get',
        url: '/api/v1/users/current',
    }).then(response => {
        localStorage.setItem("ROLE", response.data.authorities[0].authority)
        localStorage.setItem("NAME", response.data.name)
        dispatch({
            type: 'GET_CURRENT_USER', response
        });
    }).catch(error => {
        dispatch({
            type: 'GET_CURRENT_USER_ERROR', error
        });
    });
}

export const doLogout = (email) => {
    return (dispatch, getState) => {
        // killUserSession(dispatch, email);
        axios({
            method: 'get',
            url: '/logout',
        }).then(response => {
            localStorage.clear();
            notification.success({
                message: 'Messenger App',
                description: "Logout realizado com sucesso!",
            });
            dispatch({
                type: 'LOGOUT', response
            });
        }).catch(error => {
            dispatch({
                type: 'LOGOUT_ERROR', error
            });
        });
    }
}

// function killUserSession(dispatch, email){
//     axios({
//         method: 'get',
//         url: '/api/v1/users/logout/' + email,
//     }).then(response => {
//         console.log("seesion killed")
//         console.log(response)
//     }).catch(error => {
//         console.log("Error!!!" + error)
//     });
// }

export const loggedUsers = () => {
    return dispatch => {
        axios({
            method: 'get',
            url: '/api/v1/users/loggedusers',
        }).then(response => {
            dispatch({ type: 'GET_LOGGED_USERs', response });
        }).catch(error => {
            dispatch({ type: 'GET_LOGGED_USERs_ERROR', error });
        });;
    }
}