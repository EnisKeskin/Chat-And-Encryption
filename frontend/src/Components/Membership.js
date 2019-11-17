import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Io from '../connection';
import { Redirect } from 'react-router';
let io = null;
class Membership extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singIn: {
                email: '',
                password: '',
            },
            singUp: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
            },
            loginError: '',
            registerError: '',
            redirect: false,
        }
    }

    componentDidMount() {

        io = Io.connectionsRoom('membership');
        io.on('loginError', (info) => {
            this.setState({
                loginError: info.msg,
            })
        });

        io.on('token', (token) => {
            console.log(token);
            if (isNaN(token)) {
                localStorage.removeItem('token');
                localStorage.setItem('token', token);
                this.setState({
                    redirect: true,
                });
            }
        })
    }

    onChangeEventLoginEmail = (e) => {
        const email = e.target.value;
        this.setState(prevState => ({
            singIn: {
                ...prevState.singIn,
                email
            }
        }));
    }

    onChangeEventLoginPassword = (e) => {
        const password = e.target.value;
        this.setState(prevState => ({
            singIn: {
                ...prevState.singIn,
                password
            }
        }));
    }

    onClickEventLogin = (e) => {
        e.preventDefault();
        io.emit('login', this.state.singIn);
    }

    onChangeEventRegisterFirstname = (e) => {
        const firstname = e.target.value;
        this.setState(prevState => ({
            singUp: {
                ...prevState.singUp,
                firstname
            }
        }));
    }

    onChangeEventRegisterLastname = (e) => {
        const lastname = e.target.value;
        this.setState(prevState => ({
            singUp: {
                ...prevState.singUp,
                lastname
            }
        }));
    }

    onChangeEventRegisterEmail = (e) => {
        const email = e.target.value;
        this.setState(prevState => ({
            singUp: {
                ...prevState.singUp,
                email
            }
        }));
    }

    onChangeEventRegisterPassword = (e) => {
        const password = e.target.value;
        this.setState(prevState => ({
            singUp: {
                ...prevState.singUp,
                password
            }
        }));
    }

    onClickEventRegister = (e) => {
        e.preventDefault();
        io.emit('register', this.state.singUp);
    }

    render() {
        return (
            <div className="container">
                {this.state.redirect ?
                    <Redirect to='/Chat' />
                    :
                    <div className="membership">

                        <Form className="login-form">
                            <Form.Group controlId="formBasicLoginEmail">
                                <div className="login-input">
                                    <div className="login-text">Email address:</div>
                                    <Form.Control type="email" autoComplete="username" placeholder="Enter email" onChange={this.onChangeEventLoginEmail.bind(this)} />
                                </div>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicLoginPassword">
                                <div className="login-input">
                                    <div className="login-text">Password:</div>
                                    <Form.Control type="password" autoComplete="current-password" placeholder="Password" onChange={this.onChangeEventLoginPassword.bind(this)} />
                                </div>
                            </Form.Group>
                            {this.state.loginError ?
                                <Alert variant="danger">
                                    <p className="error-danger">{this.state.loginError} </p>
                                </Alert>
                                : null
                            }

                            <Button variant="primary" type="submit" onClick={this.onClickEventLogin.bind(this)}>Log in</Button>
                        </Form>

                        <Form className="login-form">
                            <Form.Group controlId="formBasicFirstnameText">
                                <div className="login-input">
                                    <div className="login-text">Firstname:</div>
                                    <Form.Control type="text" placeholder="Firstname" onChange={this.onChangeEventRegisterFirstname.bind(this)} />
                                </div>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicLastnameText">
                                <div className="login-input">
                                    <div className="login-text">Lastname:</div>
                                    <Form.Control type="text" placeholder="Lastname" onChange={this.onChangeEventRegisterLastname.bind(this)} />
                                </div>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <div className="login-input">
                                    <div className="login-text">Email address:</div>
                                    <Form.Control type="email" autoComplete="username" placeholder="Enter email" onChange={this.onChangeEventRegisterEmail.bind(this)} />
                                </div>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <div className="login-input">
                                    <div className="login-text">Password:</div>
                                    <Form.Control type="password" autoComplete="current-password" placeholder="Password" onChange={this.onChangeEventRegisterPassword.bind(this)} />
                                </div>
                            </Form.Group>
                            {this.state.registerError ?
                                <Alert variant="danger">
                                    <p className="error-danger">{this.state.registerError} </p>
                                </Alert>
                                : null}
                            <Button variant="primary" type="submit" onClick={this.onClickEventRegister.bind(this)}>Sing up</Button>
                        </Form>

                    </div>
                }
            </div>
        )
    }
}

export default Membership