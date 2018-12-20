import React, { Component } from 'react';
import { Table } from 'antd';
import { getAllMessages, getAllChats } from '../../store/actions/userActions'
import { connect } from 'react-redux';
import './RoomList.css';
import { SearchForm } from './SearchForm';

const page = 0;
const size = 8;

export class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emitter: {
                value: ''
            },
            receptor: {
                value: ''
            },
            content: {
                value: ''
            }
        }
        this.loadAllMessages = this.loadAllMessages.bind(this);
        this.loadAllChats = this.loadAllChats.bind(this);
        this.onChangeMessages = this.onChangeMessages.bind(this);
        this.onChangeChats = this.onChangeChats.bind(this);
        this.handleMessagesSubmit = this.handleMessagesSubmit.bind(this);
        this.handleChatsSubmit = this.handleChatsSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    loadAllMessages(emitter, receptor, page, size) {
        this.props.getAllMessages(emitter, receptor, page, size);
    }

    loadAllChats(emitter, receptor, content, page, size) {
        this.props.getAllChats(emitter, receptor, content, page, size);
    }

    onChangeMessages(page, pageSize) {
        this.props.getAllMessages(this.state.emitter.value, this.state.receptor.value, page - 1, pageSize);
    }

    onChangeChats(page, pageSize) {
        this.props.getAllChats(this.state.emitter.value, this.state.receptor.value, page - 1, pageSize);
    }

    componentWillMount() {
        this.loadAllMessages("", "", page, size);
        this.loadAllChats("", "", "", page, size);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue
            }
        });
    }

    handleMessagesSubmit = (e) => {
        e.preventDefault();
        this.loadAllMessages(this.state.emitter.value, this.state.receptor.value, page, size);
    }

    handleChatsSubmit = (e) => {
        e.preventDefault();
        this.loadAllChats(this.state.emitter.value, this.state.receptor.value, this.state.content.value, page, size);
    }

    render() {
        let messagesData = [];
        let chatsData = [];
        let messages = [];
        let chats = [];
        if (this.props.reducerState.messages) {
            messages = this.props.reducerState.messages;
        }

        for (let i = 0; i < messages.length; i++) {
            messagesData.push({
                key: messages[i].messageId,
                email: messages[i].fromName,
                content: messages[i].content
            })
        }

        const messagesColumns = [{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        }];

        if (this.props.reducerState.chats) {
            chats = this.props.reducerState.chats;
        }

        for (let i = 0; i < chats.length; i++) {
            chatsData.push({
                key: chats[i].chatId,
                chatName: chats[i].chatsName[0],
            })
        }

        const chatsColumns = [{
            title: 'Nome do Chat',
            dataIndex: 'chatName',
            key: 'chatName',
        }];

        return (
            <div>
                <div>
                    <SearchForm onSubmit={this.handleMessagesSubmit} onHandleInputChange={this.handleInputChange} />
                    <Table dataSource={messagesData} columns={messagesColumns} pagination={
                        {
                            pageSize: this.props.reducerState.size,
                            onChange: this.onChangeMessages,
                            total: this.props.reducerState.totalElements
                        }
                    } />
                </div>
                <div>
                    <SearchForm onSubmit={this.handleChatsSubmit} onHandleInputChange={this.handleInputChange} content/>
                    <Table dataSource={chatsData} columns={chatsColumns} pagination={
                        {
                            pageSize: this.props.reducerState.size,
                            onChange: this.onChangeChats,
                            total: this.props.reducerState.totalElements
                        }
                    } />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reducerState: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMessages: (emitter, receptor, page, size) => dispatch(getAllMessages(emitter, receptor, page, size)),
        getAllChats: (emitter, receptor, content, page, size) => dispatch(getAllChats(emitter, receptor, content, page, size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);