import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.css';
// import io from './connection';
import Chat from './Components/Chat';
import Member from './Components/Membership';
import Lobby from './Components/Lobby';
import Err from './Components/Err';

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Switch>

          <Route exact path='/' component={Member} />
          <Route exact path='/Lobby' component={Lobby} />
          <Route exact path='/Chat' component={Chat} />

          <Route component={Err}></Route>

        </Switch>
      </Router>
    )
  }
}

export default App