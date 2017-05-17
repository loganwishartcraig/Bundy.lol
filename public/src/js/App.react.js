import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Logger from './Utility/Logging';

import AuthStore from './Stores/AuthStore';

import { Dashboard } from './Pages/Dashboard.react';
import { Landing } from './Pages/Landing.react';


//testing

import { TodoService } from './Services/TodoService'

const getAppState = () => ({
  hasAuth: AuthStore.hasAuth()
});

export class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = getAppState();
    
    this._handleAuthChange = this._handleAuthChange.bind(this);

  }

  _handleAuthChange() {
    this.setState(getAppState());
    Logger.log('handling auth change...', this.state);
    console.warn(this.props.match)
  }

  componentWillMount() {
    Logger.log('<App /> mounting', this.state)
    if (!this.state.hasAuth) {
      browserHistory.push('/login');
    };
    AuthStore.setListener(this._handleAuthChange);
  }

  componentWillUnmount() {
    Logger.log('<App /> unmounting', this.state)
    AuthStore.unsetListener(this._handleAuthChange);
  }

  render() {


    return (
      <div>
        {this.state.hasAuth ? (
          <Dashboard />
        ) : (
          <Landing>
            {this.props.children}
          </Landing>
        )}  
      </div>
    );
  }

}
