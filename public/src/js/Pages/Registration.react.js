import React, { Component } from 'react';
import { Link } from 'react-router';

import ErrorDisplay from '../Components/ErrorDisplay/ErrorDisplay.react';
import Form from '../Components/Form/Form.react';

import { AuthActions } from '../Actions/AuthActions';


/**
 * Displays registration form. Handles executing registration action
 *
 * @class      Registration (name)
 */
export class Registration extends Component {

  constructor(props, context) {

    super(props, context);

  }

  _handleRegSubmit(evt) {
    evt.preventDefault();
    AuthActions.register(this.state);
  }

  render() {
    return (
      <section className="section--container">
        <header className="section--header">Create an Account</header>

        {/* 'Form' component will manage form state. 'inputs' prop should match default values for all form inputs */}
        <Form onSubmit={this._handleRegSubmit} inputs={{email: '', password: '', fName: '', lName: '', rememberMe: true}} method="POST" action="/user/create" className="form--root landing--form">  
          <div className="form--group">
            <label htmlFor="email">
              <span className="input--label">Email Address</span>
              <input className="form--input full" type="email" name="email" id="email" required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="password">
              <span className="input--label">Password</span>
              <input className="form--input full" type="password" name="password" id="password" required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="fName">
              <span className="input--label">First name</span>
              <input className="form--input full" type="text" name="fName" id="fName" required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="lName">
              <span className="input--label">Last Name</span>
              <input className="form--input full" type="text" name="lName" id="lName" required />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="rememberMe">
              <input className="form--input form--checkbox" type="checkbox" name="rememberMe" id="rememberMe" defaultChecked={true} />
              <span className="input--label checkbox--label">Remember Me</span>
            </label>
          </div>       
          <div className="form--group">
            <button  className="btn--md btn--primary full" type="submit">Create</button>
          </div>
          <ErrorDisplay addClass="login--err" />
        </Form>

        <Link className="login--reg--toggle light--text--btn" to='/login'>Oh, I already have an account</Link> 
      </section>
    );
  }
}