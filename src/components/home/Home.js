import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, notification, Drawer, Form, Col, Row, Input, Select, Modal } from 'antd';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';
import { getChats, setCurrentChat, createChat, deleteChat, getUsersByChat, setRoomUsers } from '../../store/actions/chatActions';
import SockJsClient from 'react-stomp';
import './Home.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleChatDrawer: false,
            visibleRoomDrawer: false,
            visibleEditModel: false,
            messageGot: false,
            chatName: {
                value: ''
            },
            roomUsers: []
        };
        this.showChatDrawer = this.showChatDrawer.bind(this);
        this.showRoomDrawer = this.showRoomDrawer.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    showChatDrawer() {
        let page = 0;
        let size = 10;
        this.props.getUsers(page, size);
        this.setState({
            visibleChatDrawer: true,
        });
    };

    showRoomDrawer() {
        this.setState({
            visibleRoomDrawer: true,
        });
    };

    showEditModal(chatId, chatName) {
        this.props.setCurrentChat(chatName);
        this.props.getUsersByChat(chatId, this.props.reducerState.auth.currentUser.email);
        this.setState({
            visibleEditModel: true,
        });

    };

    onChange(page, pageSize) {
        this.props.getUsers(page - 1, pageSize);
    }

    onClose() {
        this.setState({
            visibleRoomDrawer: false,
            visibleChatDrawer: false,
            visibleEditModel: false
        });
    };

    componentWillMount() {
        this.props.setCurrentChat('', '');
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

    notificationOpenChat(chatId, key, email) {
        this.props.history.push("/chat");
        this.props.setCurrentChat(chatId, email);
        notification.close(key);
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
                userId: this.props.reducerState.auth.currentUser.id,
                chatType: "CHAT"
            },
            {
                chatName: this.props.reducerState.auth.currentUser.email,
                userId: id,
                chatType: "CHAT"
            }
        ]
    }

    receivesMessage(message) {
        console.log(message.chatId + ": " + this.props.reducerState.chat.currenChat)
        if (this.props.reducerState.chat.currenChat !== message.chatId) {
            this.openNotification(message)
        }
    };

    openNotification(message) {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => this.notificationOpenChat(message.chatId, key, message.fromName)}>
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

    close() {
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
    };

    deleteChatOrRoom(chatId, email) {
        this.props.deleteChat(chatId);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputValue = target.value;

        this.setState({
            chatName: {
                value: inputValue
            }
        });
    }

    handleChange(value) {
        this.setState({
            roomUsers: value
        });
    }

    createRoom() {
        if (this.state.roomUsers.length < 2) {
            notification.error({
                message: "Erro",
                description: "Para criar uma sala, deve-se conter um número maior ou igual a dois usuários",
                duration: 0,
                onClose: this.close(),
            });
        } else {
            let roomRequest = this.createRoomRequest();
            this.props.createChat(roomRequest);
            this.setState({
                visibleRoomDrawer: false,
                roomUsers: []
            })
        }
    }

    createRoomRequest() {
        let roomRequest = [];
        for (let i = 0; i < this.state.roomUsers.length; i++) {
            roomRequest.push({
                chatName: this.state.chatName.value,
                userId: this.state.roomUsers[i],
                chatType: "ROOM"
            })
        }
        return [...roomRequest, {
            chatName: this.state.chatName.value,
            userId: this.props.reducerState.auth.currentUser.id,
            chatType: "ROOM"
        }];
    }

    render() {
        const { Option } = Select;
        const children = [];
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
                    children.push(<Option key={users[i].id}>{users[i].email}</Option>)
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
            key: 'add',
            render: (record) => {
                return (
                    <Button type="primary" icon="plus" onClick={() => this.addChat(record.key, record.email)}></Button>
                )
            }
        }];

        const chatsData = [];
        const chats = this.props.reducerState.chat.chats;
        for (let i = 0; i < chats.length; i++) {
            chatsData.push({
                key: chats[i].chatId,
                userId: chats[i].userId,
                email: chats[i].chatName,
                chatId: chats[i].chatId,
                chatType: chats[i].chatType
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
                return (
                    <Button type="primary" onClick={() => this.chat(record.chatId, record.email)} shape="circle" icon="message" />
                )
            }
        }, {
            title: 'Deletar',
            dataIndex: '',
            key: 'deletar',
            render: (record) => {
                return (
                    <Button type="danger" onClick={() => this.deleteChatOrRoom(record.chatId, record.email)} shape="circle" icon="delete" />
                )
            }
        }, {
            title: 'Editar',
            dataIndex: '',
            key: 'editar',
            render: (record) => {
                if (record.chatType === "CHAT") {
                    return (
                        <Button onClick={() => this.showEditModal(record.chatId, record.email)} shape="circle" icon="edit" disabled />
                    )
                } else {
                    return (
                        <Button onClick={() => this.showEditModal(record.chatId, record.email)} shape="circle" icon="edit" />
                    )
                }
            }
        }
        ];

        if (this.props.reducerState.auth.currentUser) {
            return (
                <div>
                    <div className="table-operations">
                        <Button type="primary" icon="plus" onClick={this.showChatDrawer}>Adicionar chat</Button>
                        <Button type="primary" icon="plus" onClick={this.showRoomDrawer}>Criar sala</Button>
                        <Drawer
                            title="Adicione uma conversa"
                            placement="right"
                            width={500}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visibleChatDrawer}
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
                        <Drawer
                            title="Adicione uma sala"
                            width={500}
                            onClose={this.onClose}
                            visible={this.state.visibleRoomDrawer}
                            className="room-drawer"
                        >
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="Nome da sala">
                                            <Input placeholder="Nome do chat"
                                                onChange={(event) => this.handleInputChange(event)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="Adicione pessoas à sala">
                                            <Select
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                placeholder="Selecione por favor"
                                                onChange={this.handleChange}
                                            >
                                                {children}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: '100%',
                                    borderTop: '1px solid #e9e9e9',
                                    padding: '10px 16px',
                                    background: '#fff',
                                    textAlign: 'right',
                                }}
                            >
                                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                    Cancel
                                </Button>
                                <Button onClick={this.createRoom} type="primary">
                                    Submit
                                </Button>
                            </div>
                        </Drawer>
                        <Modal
                            title="Edição de sala"
                            visible={this.state.visibleEditModel}
                            onOk={this.handleOk}
                            onCancel={this.onClose}
                        >
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="Nome da sala">
                                            <Input placeholder="Nome do chat" value={this.props.reducerState.chat.currentChat}
                                                onChange={(event) => this.handleInputChange(event)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="Adicione pessoas à sala">
                                            <Select
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                placeholder="Selecione por favor"
                                                value={this.props.reducerState.chat.roomUsersEmail}
                                                onChange={this.handleChange}
                                            >
                                                {children}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
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
        createChat: (createChatRequest) => dispatch(createChat(createChatRequest)),
        deleteChat: (chatId) => dispatch(deleteChat(chatId)),
        getUsersByChat: (chatId, email) => dispatch(getUsersByChat(chatId, email)),
        setRoomUsers: () => dispatch(setCurrentChat())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);