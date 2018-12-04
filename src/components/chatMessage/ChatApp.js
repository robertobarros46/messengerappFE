import React, { Component } from "react";
import './ChatApp.css'
import { getMessages, addMessage } from '../../store/actions/chatActions'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SockJsClient from 'react-stomp';
import { connect } from 'react-redux';



export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleClick() {
    const message = this.createMessage(this.state.message);
    this.clientRef.sendMessage('/messenger/chat', JSON.stringify(message));
    this.addMessage(message);
  }

  createMessage(message){
    return {
      key: Math.random(),
      fromName: this.props.authReducerState.currentUser.name,
      fromUserId: this.props.authReducerState.currentUser.id,
      content: message,
      chatId: this.props.chatReducerState.currentChat
    }
  }

  addMessage(message){
    this.props.addMessage(message);
    this.setState({
      message: '',
    });
  }

  receivesMessage(message) {
    let newMessage = {
      key: Math.random(),
      fromName: message.fromName,
      fromUserId: message.fromUserId,
      content: message.content,
      chatId: message.chatId
    }
    this.props.addMessage(newMessage);
  }

  componentDidMount() {
    const element = document.getElementById("message-container");
    element.scrollTop = element.offsetTop + element.offsetHeight
    this.props.getMessages(this.props.chatReducerState.currentChat)
  }

  componentDidUpdate() {
    const element = document.getElementById("message-container");
    element.scrollTop = element.offsetTop + element.offsetHeight
  }

  render() {
    const data = [];
    const messages = this.props.chatReducerState.messages;
    for (let i = 0; i < messages.length; i++) {
      data.push({
        key: messages[i].messageId,
        fromName: messages[i].fromName,
        content: messages[i].content
      })
    }
    return (
      <div>
        <AppBar position="static" className="messenger-appbar" id="messenger-appbar">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {this.props.chatReducerState.currentChatName}
          </Typography>
          </Toolbar>
        </AppBar>
        <div className="message-container" id="message-container">
          <List id="messagelist">
            {data.map(({ key, fromName, content }) => (
              <div key={key}>
                <ListItem button>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                  <ListItemText primary={fromName} secondary={content} />
                </ListItem>
                <Divider inset component="li" />
              </div>
            ))}
          </List>
        </div>
        <div>
          <TextField
            id="outlined-textarea"
            label="Mensagem"
            className="message-textfield"
            placeholder="Escreva..."
            name="message"
            value={this.state.message || ""}
            multiline
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
          <Button variant="contained" color="primary" className="send-button" onClick={this.handleClick} disabled={!this.state.message}>
            <SendIcon />
          </Button>
        </div>
        <SockJsClient url='http://localhost:8080/socket'
          topics={['/queue/chats/user-messages/' + this.props.authReducerState.currentUser.id]}
          onMessage={(message) => { this.receivesMessage(message); }}
          ref={(client) => { this.clientRef = client }} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authReducerState: state.auth,
    chatReducerState: state.chat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (chatId) => dispatch(getMessages(chatId)),
    addMessage: (message) => dispatch(addMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);