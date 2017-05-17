import React, { Component } from 'react';
import { Link } from 'react-router';

import ErrorDisplay from '../Components/ErrorDisplay/ErrorDisplay.react';

import { AuthActions } from '../Actions/AuthActions';

export class Registration extends Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      fName: '',
      lName: '',
      rememberMe: true
    }

    this._handleRegSubmit = this._handleRegSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleRegSubmit(e) {
    e.preventDefault();
    AuthActions.register(this.state);
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
        <header className="section--header">Create an Account</header>

        <form className="form--root landing--form" onSubmit={this._handleRegSubmit} action="/user/create" method="POST">
          <div className="form--group">
            <label htmlFor="email">
              <span className="input--label">Email Address</span>
              <input className="form--input full" onChange={this._handleInputChange} type="email" name="email" id="email" value={this.state.email} required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="password">
              <span className="input--label">Password</span>
              <input className="form--input full" onChange={this._handleInputChange} type="password" name="password" id="password" value={this.state.password} required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="fName">
              <span className="input--label">First name</span>
              <input className="form--input full" onChange={this._handleInputChange} type="text" name="fName" id="fName" value={this.state.fName} required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="lName">
              <span className="input--label">Last Name</span>
              <input className="form--input full" onChange={this._handleInputChange} type="text" name="lName" id="lName" value={this.state.lName} required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="rememberMe">
              <input className="form--input form--checkbox" onChange={this._handleInputChange} type="checkbox" name="rememberMe" id="rememberMe" checked={this.state.rememberMe} />
              <span className="input--label checkbox--label">Remember Me</span>
            </label>
          </div>       
          <div className="form--group">
            <button  className="btn--md btn--primary full" type="submit">Create</button>
          </div>
          <ErrorDisplay addClass="login--err" />
        </form>
        <Link className="login--reg--toggle light--text--btn" to='/login'>Oh, I already have an account</Link> 
      </section>
    );
  }
}