import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Logger from './Utility/Logging'

import AuthStore from './Stores/AuthStore';
import { AuthActions } from './Actions/AuthActions';
import { ErrorActions } from './Actions/ErrorActions';

import { App } from './App.react'
import { Registration } from './Pages/Registration.react';
import { Login } from './Pages/Login.react';


class PageNotFound extends Component {
  render() {
    return(
      <div>
        <span>Page Not Found :s</span>
      </div>
    );
  }
}


const dashRedirect = (nextState, replace, callback) => {

  Logger.log('Checking auth for auto redirect', {auth: AuthStore.hasAuth()})
  ErrorActions.clearError()
  if (AuthStore.hasAuth()) replace('/');
  // else replace('/login')
  callback();

};


class RouteHandler extends Component { 

  render() {
    return (
        <Router history={browserHistory}>
          <Route path="/" component={App} >
            <Route path="register" component={Registration} onEnter={dashRedirect} />
            <Route path="login" component={Login} onEnter={dashRedirect} />
            <Route path="*" component={PageNotFound} />
          </Route>
        </Router>
      )
    }
  }

const render = () => {

  ReactDOM.render(
    <RouteHandler />,
    document.getElementById('root')
  );

};



(function startApp() {

  Logger.setLogLevel(2);

  // render()
  
  // AuthActions.setFromCache()
  AuthActions.setFromCache();
  render();

})();