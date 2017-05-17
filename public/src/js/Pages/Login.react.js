import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import * as axios from 'axios';

import ErrorDisplay from '../Components/ErrorDisplay/ErrorDisplay.react';

import { AuthActions } from '../Actions/AuthActions';

export class Login extends Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: true
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
    let type = e.target.getAttribute('type');
    let stateChange = {};
    stateChange[inputName] = (type === 'checkbox' || type === 'radio') ? !this.state[inputName] : e.target.value
    this.setState(stateChange);
  }

  render() {
    return (
      <section className="section--container">
        <header className="section--header">Log In</header>

        <form className="form--root landing--form" onSubmit={this._handleRegSubmit} action="/user/login" method="POST">
          <div className="form--group">
            <label htmlFor="email">
              <span className="input--label">Email Address</span>
              <input className={"form--input full"} onChange={this._handleInputChange} type="email" name="email" id="email" value={this.state.email} placeholder="you@domain.com" required/>
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="password">
              <span className="input--label">Password</span>
              <input className="form--input full" onChange={this._handleInputChange} type="password" name="password" id="password" value={this.state.password} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" required/>
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="rememberMe">
              <input className="form--input form--checkbox" onChange={this._handleInputChange} type="checkbox" name="rememberMe" id="rememberMe" checked={this.state.rememberMe} />
              <span className="input--label checkbox--label">Remember Me</span>
            </label>
          </div>          
          <div className="form--group">
            <button className="btn--md btn--primary full" type="submit">Go</button>
          </div>
          <ErrorDisplay addClass="login--err" />
        </form>
        <Link className="login--reg--toggle light--text--btn" to='/register'>Wait, I need to create an accout</Link>  
      </section>
    );
  }
}