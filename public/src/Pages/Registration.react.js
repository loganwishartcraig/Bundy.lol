import React, { Component } from 'react';
// import { browserHistory } from 'react-router';

import * as axios from 'axios';

import { AuthActions } from '../Actions/AuthActions';
// import { AuthService } from '../../Services/AuthService';

export class Registration extends Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      fName: '',
      lName: ''
    }

    this._handleRegSubmit = this._handleRegSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleRegSubmit(e) {
    e.preventDefault();

    AuthActions.register(this.state);

  }

  componentWillMount() {
    // if (AuthService.hasAuth()) browserHistory.push('/')
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
        <form onSubmit={this._handleRegSubmit} action="/user/create" method="POST">
          <input onChange={this._handleInputChange} type="text" name="email" />
          <input onChange={this._handleInputChange} type="password" name="password" />
          <input onChange={this._handleInputChange} type="text" name="fName" />
          <input onChange={this._handleInputChange} type="text" name="lName" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}