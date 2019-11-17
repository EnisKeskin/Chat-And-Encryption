import React, { Component } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Io from '../connection';
import { Redirect } from 'react-router';
import { isNullOrUndefined } from 'util';
import Form from 'react-bootstrap/FormGroup';
let io = null;
class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = '';
        this.getMessage = {};
        this.state = {
            getMessage: {},
            redirect: false,
            userId: '',
        }
    }
    componentDidMount() {
        this.scrollLocation();
        const token = localStorage.getItem('token');
        if (!isNullOrUndefined(token)) {

            io = Io.connectionsRoom('Chat', token);

            io.on('error', () => {
                this.setState({
                    redirect: true,
                });
            });
            io.emit('allMessage');

            io.on('returnedMessage', (chat) => {
                this.getMessage = chat.messageInfo
                if (chat.userId == null) {
                    this.setState({
                        getMessage: this.getMessage
                    });

                } else {
                    this.setState({
                        userId: chat.userId,
                        getMessage: this.getMessage
                    });
                }
                this.scrollLocation();
            });

        } else {
            this.setState({
                redirect: true,
            })
        }

    }

    onChangeEventChat = (e) => {
        const message = e.target.value;
        this.sendMessage = message
    }

    onClickEventSend = (e) => {
        e.preventDefault();
        document.querySelector('.form-control').value = '';
        io.emit('chatMessage', { message: this.sendMessage });
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    chatMessageShow = () => {
        const message = this.state.getMessage;
        console.log(message)
        const chatMessage = [];
        if (!this.isEmpty(message)) {
            if (message.length > 1) {
                message.forEach((messageInfo, key) => {
                    if (this.state.userId !== messageInfo.userId) {
                        chatMessage.push(
                            <div className="incoming-msg" key={key}>
                                <div className="incoming-msg-user">{messageInfo.firstname + ' ' + messageInfo.lastname}</div>
                                <span className="chat-msg-left">{messageInfo.message}</span>
                                <div className="incoming-msg-date">{messageInfo.date}</div>
                            </div>)
                    } else {
                        chatMessage.push(
                            <div className="outgoing-msg" key={key}>
                                <div className="outgoing-msg-user">{messageInfo.firstname + ' ' + messageInfo.lastname}</div>
                                <span className="chat-msg">{messageInfo.message}</span>
                                <div className="outgoing-msg-date">{messageInfo.date}</div>
                            </div>)
                    }
                });

            }
            return chatMessage;
        }

    }

    scrollLocation = () => {
        const chatArea = document.querySelector(".chatArea");
        chatArea.scrollTop = chatArea.scrollHeight
    }

    render() {
        return (
            <div className="mainChat">
                {this.state.redirect ?
                    <Redirect to='/' />
                    :
                    <div className="chat">
                        <div className="chatArea">
                            {this.chatMessageShow()}
                        </div>
                        <Form>
                            <InputGroup className="chatInput" >
                                <FormControl placeholder="Mesaj" onChange={this.onChangeEventChat.bind(this)} />
                                <InputGroup.Append>
                                    <Button variant="primary" onClick={this.onClickEventSend.bind(this)}>Gönder</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </div>
                }
            </div>

        )
    }
}

export default Chat;