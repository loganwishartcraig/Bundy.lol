import React, { Component } from 'react'
// import { Link } from 'react-router';
import Logger from '../Utility/Logging';

import { Login } from './Login.react';

import AuthStore from '../Stores/AuthStore';


/**
 * Displays the landing page for unauthenticated users. 
 * Will have either a login or registration page as it's child.
 * If no children, renders login page.
 *
 * @class      Landing (name)
 */
export class Landing extends Component {

  componentWillMount() {
    Logger.log('<Landing /> mounting', AuthStore.hasAuth());
  }

  render() {
    return (
      <div className={'landing--container'}>
        <h1 className={'landing--header'}>bundy.<span className={'landing--header--blue'}>^</span><span className={'landing--header--grey'}>o</span><span className={'landing--header--blue'}>^</span></h1>
        <div className="landing--wrapper">
        {(this.props.children) ? this.props.children : <Login />}
        </div>
      </div>
    );
  }

}
