import React, { Component } from 'react'
import { Link } from 'react-router';
import Logger from '../Utility/Logging';

import { Login } from './Login.react';

export class Landing extends Component {

  componentWillMount() {
    Logger.log('<Landing /> mounting');
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