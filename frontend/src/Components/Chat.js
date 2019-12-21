import React, { Component } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Io from '../connection';
import { Redirect } from 'react-router';
import { isNullOrUndefined } from 'util';
import Form from 'react-bootstrap/FormGroup';
import Encryption from '../Encryption/Encryption';
let io = null;
class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = '';
        this.getMessage = {};
        this.ChatRoomEncryptions = {};
        this.state = {
            getMessage: {},
            redirect: false,
            userId: null,
            props
        }
    }
    componentDidMount() {
        this.scrollLocation();
        const token = localStorage.getItem('token');
        if (!isNullOrUndefined(token)) {
            io = Io.connectionsRoom('Chat', token);
            // console.log(Encryption.Ceaser("Enis",3));
            // console.log(Encryption.Polybius("Enis"));
            // console.log(Encryption.Vigenere("Enis","at"));
            // console.log(Encryption.PicketFence("Oğuzhan bana bir mesaj attı"));
            // console.log(Encryption.Columnar("Oğuzhan bana bir mesaj attı"));
            io.on('encryption', (ChatRoomEncryptions) => {
                this.ChatRoomEncryptions = ChatRoomEncryptions.Encryption;
            });

            io.on('error', () => {
                this.setState({
                    redirect: true,
                });
            });

            const params = this.state.props.match.params
            io.emit('allMessage', ({ roomName: params.name }));

            io.on('returnedMessage', (chat) => {
                this.getMessage = chat.messageInfo
                let messageKey = Object.keys(this.getMessage);
                let orjinalText
                let messageInfo
                messageKey.forEach((key) => {
                    orjinalText = '';
                    messageInfo = this.getMessage[key];
                    orjinalText = this.decode(this.ChatRoomEncryptions, messageInfo.message.msg);
                    messageInfo = { ...messageInfo, message: { ...messageInfo.message, msg: `${orjinalText}` } }
                    this.getMessage[key] = messageInfo
                    // console.log(this.getMessage)
                })

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
        const params = this.state.props.match.params
        const encryptedText = this.encryption(this.ChatRoomEncryptions, this.sendMessage);
        document.querySelector('.form-control').value = '';
        io.emit('chatMessage', { message: encryptedText, roomName: params.name });
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
        const chatMessage = [];
        if (!this.isEmpty(message)) {
            if (message.length >= 1) {
                message.forEach((messageInfo, key) => {
                    if (this.state.userId !== messageInfo.message.userId) {
                        chatMessage.push(
                            <div className="incoming-msg" key={key}>
                                <div className="incoming-msg-user">{messageInfo.firstname + ' ' + messageInfo.lastname}</div>
                                <span className="chat-msg-left">{messageInfo.message.msg}</span>
                                <div className="incoming-msg-date">{messageInfo.message.date}</div>
                            </div>)
                    } else {
                        chatMessage.push(
                            <div className="outgoing-msg" key={key}>
                                <div className="outgoing-msg-user">{messageInfo.firstname + ' ' + messageInfo.lastname}</div>
                                <span className="chat-msg">{messageInfo.message.msg}</span>
                                <div className="outgoing-msg-date">{messageInfo.message.date}</div>
                            </div>)
                    }
                });

            }
            return chatMessage;
        }

    }

    scrollLocation = () => {
        const chatArea = document.querySelector(".chatArea");
        if (document.querySelector(".chatArea")) {
            chatArea.scrollTop = chatArea.scrollHeight
        }
    }

    encryption = (encryptions, message) => {
        let encryptionsKeys = Object.keys(encryptions);
        let encryptedText = message;
        if (encryptionsKeys) {
            encryptionsKeys.forEach((encryption) => {
                switch (encryption) {

                    case "PicketFence":
                        encryptedText = Encryption.PicketFence(encryptedText)
                        console.log(encryptedText);
                        delete encryptions.PicketFence;
                        break;

                    case "Ceaser":
                        encryptedText = Encryption.Ceaser(encryptedText, encryptions.Ceaser.iteration)
                        console.log(encryptedText);
                        delete encryptions.Ceaser;
                        break;

                    case "Vigenere":
                        encryptedText = Encryption.Vigenere(encryptedText, encryptions.Vigenere.keyword)
                        console.log(encryptedText);
                        delete encryptions.Vigenere;
                        break;

                    case "Column":
                        encryptedText = Encryption.Columnar(encryptedText)
                        console.log(encryptedText);
                        delete encryptions.Column;
                        break;

                    case "Polybius":
                        encryptedText = Encryption.Polybius(encryptedText)
                        console.log(encryptedText);
                        delete encryptions.Polybius;
                        break;

                    default:
                        break;
                }

            })

        }
        console.log(encryptedText)
        return encryptedText;

    }

    decode = (encryptions, encryptedText) => {
        let decodeKeys = Object.keys(encryptions).reverse();
        let Encryptions = {};
        Object.assign(Encryptions, encryptions)
        let orjinalText = encryptedText;
        if (decodeKeys) {
            decodeKeys.forEach((encryption) => {
                switch (encryption) {
                    case "PicketFence":
                        orjinalText = Encryption.PicketFenceDecode(orjinalText);
                        console.log(orjinalText);
                        delete encryptions.PicketFence;
                        break;

                    case "Ceaser":
                        orjinalText = Encryption.CeaserDecoding(orjinalText, encryptions.Ceaser.iteration);
                        console.log(orjinalText);
                        delete encryptions.Ceaser;
                        break;

                    case "Vigenere":
                        orjinalText = Encryption.VigenereDecode(orjinalText, encryptions.Vigenere.keyword);
                        console.log(orjinalText);
                        delete encryptions.Vigenere;
                        break;

                    case "Column":
                        orjinalText = Encryption.ColumnarDecode(orjinalText);
                        console.log(orjinalText);
                        delete encryptions.Column;
                        break;

                    case "Polybius":
                        orjinalText = Encryption.PolybiusDecode(orjinalText);
                        console.log(orjinalText);
                        delete encryptions.Polybius;
                        break;

                    default:
                        break;
                }

            })

        }
        Object.assign(encryptions, Encryptions)
        return orjinalText;

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