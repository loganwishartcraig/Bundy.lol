import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Logger from './Utility/Logging';

import AuthStore from './Stores/AuthStore';

import { Dashboard } from './Pages/Dashboard.react';
import { Landing } from './Pages/Landing.react';

import { TodoService } from './Services/TodoService'

const getAppState = () => ({
  hasAuth: AuthStore.hasAuth()    // {Boolean} Indicates if user is authenticated
});


  /**
   * Main component for app. 
   * Displays dashboard if authenticated, landing page (will depend on route) otherwise
   * Rerenders on authentication state chagne
   * 
   * @class      App (name)
   */
export class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = getAppState();
    
    this._handleAuthChange = this._handleAuthChange.bind(this);

  }

  _handleAuthChange() {
    this.setState(getAppState());
    Logger.log('handling auth change...', this.state);
    if (this.state.hasAuth && this.props.location.pathname !== '/') {
      browserHistory.push('/');
    }

  }

  componentWillMount() {
    Logger.log('<App /> mounting', this.state)
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
            {/* Children determiend by route. If none, 'landing' will display login page */}
            {this.props.children}
          </Landing>
        )}  
      </div>
    );
  }

}
