import React, { Component } from 'react';
import { Link } from 'react-router';

import ErrorDisplay from '../Components/ErrorDisplay/ErrorDisplay.react';
import Form from '../Components/Form/Form.react';

import { AuthActions } from '../Actions/AuthActions';

/**
 * Displays a login form and executes login action. 
 *
 * @class      Login (name)
 */
export class Login extends Component {

  constructor(props, context) {

    super(props, context);

  }

  /**
   * Handles form submission.
   * Will submit 'Form' component state to login aciton.
   *
   * @param      {<type>}  e       Browser event object
   */
  _handleRegSubmit(evt) {
    evt.preventDefault();
    AuthActions.login(this.state);
  }

  render() {
    return (
      <section className="section--container">
        <header className="section--header">Log In</header>

        {/* 'Form' component will manage form state. 'inputs' prop should match default values for all form inputs */}
        <Form onSubmit={this._handleRegSubmit} inputs={{email: '', password: '', rememberMe: true}} method="POST" action="/auth/login" className="form--root landing--form">  
          <div className="form--group">
            <label htmlFor="email">
              <span className="input--label">Email Address</span>
              <input className={"form--input full"} type="email" name="email" id="email" placeholder="you@domain.com" required/>
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="password">
              <span className="input--label">Password</span>
              <input className="form--input full" type="password" name="password" id="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" required/>
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="rememberMe">
              <input className="form--input form--checkbox" type="checkbox" name="rememberMe" id="rememberMe" defaultChecked={true} />
              <span className="input--label checkbox--label">Remember Me</span>
            </label>
          </div>          
          <div className="form--group">
            <button className="btn--md btn--primary full" type="submit">Go</button>
          </div>
          <ErrorDisplay addClass="login--err" />
        </Form>
        
        <Link className="login--reg--toggle light--text--btn" to='/register'>Wait, I need to create an accout</Link>  
      </section>
    )
  }
}
