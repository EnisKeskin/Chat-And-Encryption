import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import Io from '../connection';
import { isNullOrUndefined } from 'util';
let io = null;
class Lobby extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            CreateLobbyName: "",
            Ceaser: false,
            CeaserIterator: 1,
            Polybius: false,
            Vigenere: false,
            VigenereKeyword: "",
            PicketFence: false,
            Column: false,
            MatrixInserve: false,
            LoginLobbyName: "",
            roomName: "",
            loginCheck: false,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!isNullOrUndefined(token)) {
            io = Io.connectionsRoom('Chat', token);
            io.on('goToChat', (roomName) => {
                this.setState({
                    loginCheck: true,
                    roomName
                });
            })
        }
    }

    onClickEventCreate = (e) => {
        e.preventDefault();
        let encryption = this.selectedEncryption();
        io.emit('CreateChatRoom', { name: this.state.CreateLobbyName, encryption });
    }

    onClickEventLogin = (e) => {
        e.preventDefault();
        io.emit('loginChatRoom', { name: this.state.LoginLobbyName });
    }

    selectedEncryption = () => {
        let selected = {};
        let state = this.state
        Object.keys(state).forEach((key) => {
            if (key === 'Ceaser' && state[key] === true) {
                selected['Ceaser'] = { iteration: state.CeaserIterator };
            } else if (key === 'Polybius' && state[key] === true) {
                selected['Polybius'] = true;
            } else if (key === 'Vigenere' && state[key] === true) {
                selected['Vigenere'] = { keyword: state.VigenereKeyword };
            } else if (key === 'PicketFence' && state[key] === true) {
                selected['PicketFence'] = true;
            } else if (key === 'Column' && state[key] === true) {
                selected['Column'] = true;
            } else if (key === 'MatrixInserve' && state[key] === true) {
                selected['MatrixInserve'] = true;
            }
        })
        return selected;
    }

    render() {
        const type = "checkbox";
        let state = this.state;
        return (
            <div className="lobby">
                {state.loginCheck ?
                    <Redirect to={`/Chat/${state.roomName}`} /> :
                    <div className="lobby">
                        <div className="LobbyLogin">
                            <Form className="lobbylogin">
                                <Form.Group className="lobbyFormGroup">
                                    <Form.Label className="loobyLabel">Login Lobby</Form.Label>
                                    <Form.Control type="email" placeholder="Lobby Name" onChange={e => { this.setState({ LoginLobbyName: e.target.value }) }} />
                                    <Form.Text className="text-muted" ></Form.Text>
                                    <Button variant="primary" type="submit" onClick={this.onClickEventLogin.bind(this)}>Submit</Button>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="LobbyRegister">
                            <Form className="lobbyEncryptionForm">
                                <Form.Group className="lobbyFormGroup">
                                    <Form.Label className="loobyLabel">Create Lobby</Form.Label>
                                    <Form.Control type="text" placeholder="Lobby Name" onChange={e => { this.setState({ CreateLobbyName: e.target.value }) }} />
                                    <Form.Text className="text-muted"></Form.Text>
                                    <Button variant="primary" type="submit" onClick={this.onClickEventCreate.bind(this)}>Submit</Button>
                                </Form.Group>

                                <div className="mainEncryption">
                                    <div className="Encryption">
                                        <div>Select Encrypt</div>
                                        <div className="sideByside">
                                            <Form.Check inline label="Ceasar" type={type} id={`inline-${type}-1`} checked={state.Ceaser} onChange={e => { this.setState({ Ceaser: !state.Ceaser }); }} />
                                            <Form.Control size="sm" type="text" placeholder="iteration number" value={state.CeaserIterator} onChange={e => { if (e.target.value >= 0 && e.target.value.length !== 5 && e.target.value > 0) { this.setState({ CeaserIterator: e.target.value.trim() }) } }} />
                                        </div>
                                        <Form.Check inline label="Polybius" type={type} id={`inline-${type}-2`} checked={state.Polybius} onChange={e => { this.setState({ Polybius: !state.Polybius }); }} />
                                        <div className="sideByside">
                                            <Form.Check inline label="Vigenere" type={type} id={`inline-${type}-3`} checked={state.Vigenere} onChange={e => { this.setState({ Vigenere: !state.Vigenere }); }} />
                                            <Form.Control size="sm" type="text" placeholder="keyword" onChange={e => { this.setState({ VigenereKeyword: e.target.value }) }} />
                                        </div>
                                        <Form.Check inline label="Picket Fence" type={type} id={`inline-${type}-4`} checked={state.PicketFence} onChange={e => { this.setState({ PicketFence: !state.PicketFence }); }} />
                                        <Form.Check inline label="Column" type={type} id={`inline-${type}-5`} checked={state.Column} onChange={e => { this.setState({ Column: !state.Column }); }} />
                                        <Form.Check inline label="Matrix Inserve" type={type} id={`inline-${type}-6`} checked={state.MatrixInserve} onChange={e => { this.setState({ MatrixInserve: !state.MatrixInserve }); }} />
                                    </div>
                                </div>


                            </Form>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default Lobby;