import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import * as axios from 'axios';

import { AuthActions } from '../Actions/AuthActions';

export class Login extends Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this._handleRegSubmit = this._handleRegSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  
  }


  _handleRegSubmit(e) {
    e.preventDefault();
    AuthActions.login(this.state);
  }

  _handleInputChange(e) {
    let inputName = e.target.getAttribute('name');
    let value = e.target.value;

    let stateChange = {};
        stateChange[inputName] = value;

    this.setState(stateChange);
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleRegSubmit} action="/user/login" method="POST">
          <input onChange={this._handleInputChange} type="text" name="email" />
          <input onChange={this._handleInputChange} type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}