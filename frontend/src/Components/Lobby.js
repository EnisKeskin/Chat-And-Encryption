import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import Io from '../connection';
import { isNullOrUndefined } from 'util';
let io = null;
class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CreateLobbyName: "",
            Ceaser: false,
            CeaserIterator: 0,
            Polybius: false,
            Vigenere: false,
            VigenereKeyword: "",
            PicketFence: false,
            Column: false,
            MatrixInserve: false,
            LoginLobbyName: "",
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!isNullOrUndefined(token)) {

            io = Io.connectionsRoom('Chat', token);
        }
    }

    onClickEventCreate = (e) => {
        e.preventDefault();
        io.emit('CreateChatRoom', { name: "enis" });
    }

    onClickEventLogin = (e) => {
        e.preventDefault();
    }

    render() {
        const type = "checkbox";
        return (
            <div className="lobby">
                <div className="LobbyLogin">
                    <Form className="lobbylogin">
                        <Form.Group className="lobbyFormGroup">
                            <Form.Label className="loobyLabel">Login Lobby</Form.Label>
                            <Form.Control type="email" placeholder="Lobby Name" />
                            <Form.Text className="text-muted"></Form.Text>
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
                                    <Form.Check inline label="Ceasar" type={type} id={`inline-${type}-1`} checked={this.state.Ceaser} onChange={e => { this.setState({ Ceaser: !this.state.Ceaser }); }} />
                                    <Form.Control size="sm" type="text" placeholder="iteration number" value={this.state.CeaserIterator} onChange={e => { if (e.target.value >= 0 && e.target.value.length !== 5) { this.setState({ CeaserIterator: e.target.value }) } }} />
                                </div>
                                <Form.Check inline label="Polybius" type={type} id={`inline-${type}-2`} checked={this.state.Polybius} onChange={e => { this.setState({ Polybius: !this.state.Polybius }); }} />
                                <div className="sideByside">
                                    <Form.Check inline label="Vigenere" type={type} id={`inline-${type}-3`} checked={this.state.Vigenere} onChange={e => { this.setState({ Vigenere: !this.state.Vigenere }); }} />
                                    <Form.Control size="sm" type="text" placeholder="keyword" onChange={e => { this.setState({ VigenereKeyword: e.target.value }) }} />
                                </div>
                                <Form.Check inline label="Picket Fence" type={type} id={`inline-${type}-4`} checked={this.state.PicketFence} onChange={e => { this.setState({ PicketFence: !this.state.PicketFence }); }} />
                                <Form.Check inline label="Column" type={type} id={`inline-${type}-5`} checked={this.state.Column} onChange={e => { this.setState({ Column: !this.state.Column }); }} />
                                <Form.Check inline label="Matrix Inserve" type={type} id={`inline-${type}-6`} checked={this.state.MatrixInserve} onChange={e => { this.setState({ MatrixInserve: !this.state.MatrixInserve }); }} />
                            </div>
                        </div>


                    </Form>
                </div>
            </div>
        )
    }
}
export default Lobby;