import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, notification, Drawer } from 'antd';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';
import { getChats, setCurrentChat, createChat } from '../../store/actions/chatActions';
import SockJsClient from 'react-stomp';
import './Home.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            messageGot: false
        };
        this.showDrawer = this.showDrawer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    showDrawer() {
        let page = 0;
        let size = 10;
        this.props.getUsers(page, size);
        this.setState({
            visible: true,
        });
    };

    onChange(page, pageSize) {
        this.props.getUsers(page - 1, pageSize);
    }

    onClose() {
        this.setState({
            visible: false,
        });
    };

    componentWillMount() {
        this.props.setCurrentChat('','');
        if (localStorage.getItem("CurrentUser")) {
            this.props.getChats(this.props.reducerState.auth.currentUser.id);
        }
    }

    componentDidUpdate(nextProps) {
        if (localStorage.getItem("CurrentUser")) {
            if (this.props.reducerState.auth.currentUser !== nextProps.reducerState.auth.currentUser) {
                this.props.getChats(this.props.reducerState.auth.currentUser.id);
            }
        }
    }

    chat(chatId, email) {
        this.props.history.push("/chat");
        this.props.setCurrentChat(chatId, email);
    }

    addChat(id, email) {
        let chatRequest = this.createChatRequest(id, email);
        this.props.createChat(chatRequest);
        this.setState({
            visible: false
        })
    }

    createChatRequest(id, email) {
        return [
            {
                chatName: email,
                userId: this.props.reducerState.auth.currentUser.id
            },
            {
                chatName: this.props.reducerState.auth.currentUser.email,
                userId: id
            }
        ]
    }

    receivesMessage(message) {
        if (this.props.reducerState.chat.currenChat !== message.chatId) {
            this.openNotification(message)
        }
    };

    openNotification(message){
        console.log(message)
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => this.chat(message.chatId)}>
                Open chat
            </Button>
        );
        notification.open({
            message: message.fromName,
            description: message.content.slice(0, 20) + '...',
            btn,
            key,
            duration: 0,
            onClose: this.close(),
        });
    };

    close(){
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
    };



    render() {
        const usersData = [];
        let users = [];
        if (this.props.reducerState.user.users) {
            users = this.props.reducerState.user.users;
        }

        for (let i = 0; i < users.length; i++) {
            if (this.props.reducerState.auth.currentUser) {
                if (users[i].email !== this.props.reducerState.auth.currentUser.email) {
                    usersData.push({
                        key: users[i].id,
                        name: users[i].name,
                        email: users[i].email
                    })
                }
            }
        }

        const usersColumns = [{
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '',
            dataIndex: '',
            key: 'delete',
            render: (record) => {
                if (record.role === "ADMIN") {
                    return (
                        <Button type="primary" icon="plus" onClick={() => this.addChat(record.key, record.email)} disabled></Button>
                    )
                } else {
                    return (
                        <Button type="primary" icon="plus" onClick={() => this.addChat(record.key, record.email)}></Button>
                    )
                }
            }
        }];

        const chatsData = [];
        const chats = this.props.reducerState.chat.chats;
        for (let i = 0; i < chats.length; i++) {
            chatsData.push({
                key: Math.random(),
                id: chats[i].userId,
                email: chats[i].chatName,
                chatId: chats[i].chatId
            })
        }

        const columns = [{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Conversar',
            dataIndex: '',
            key: 'conversar',
            render: (record) => {
                if (record.email === localStorage.getItem("CurrentUser")) {
                    return (
                        <Button type="primary" onClick={() => this.chat(record.chatId, record.email)} shape="circle" icon="message" disabled />
                    )
                } else {
                    return (
                        <Button type="primary" onClick={() => this.chat(record.chatId, record.email)} shape="circle" icon="message" />
                    )
                }
            }
        }];

        if (this.props.reducerState.auth.currentUser) {
            return (
                <div>
                    <div className="table-operations">
                        <Button type="primary" icon="plus" onClick={this.showDrawer}>Adicionar chat</Button>
                        <Drawer
                            title="Adicione uma conversa"
                            placement="right"
                            width={720}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <div>
                                <Table dataSource={usersData} columns={usersColumns} pagination={
                                    {
                                        pageSize: this.props.reducerState.user.size,
                                        onChange: this.onChange,
                                        total: this.props.reducerState.user.totalElements
                                    }
                                } />
                            </div>
                        </Drawer>
                    </div>
                    <div>
                        <Table dataSource={chatsData} columns={columns} pagination={{ pageSize: 10 }} />
                        <SockJsClient url='http://localhost:8080/socket'
                            topics={['/queue/chats/user-messages/' + this.props.reducerState.auth.currentUser.id]}
                            onMessage={(message) => { this.receivesMessage(message); }} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="home-container">
                    <h1>Messenger App</h1>
                    <div className="signup">Vire Membro
                    <Link to="/signup"> agora!</Link>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        reducerState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChats: (userId) => dispatch(getChats(userId)),
        getUsers: (page, size) => dispatch(getUsers(page, size)),
        setCurrentChat: (chatId, email) => dispatch(setCurrentChat(chatId, email)),
        createChat: (createChatRequest) => dispatch(createChat(createChatRequest))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);