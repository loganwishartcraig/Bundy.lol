import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Logger from './Utility/Logging'

import AuthStore from './Stores/AuthStore';
// import ErrorStore from './Stores/ErrorStore';
// import UserStore from './Stores/UserStore';
// import GroupStore from './Stores/GroupStore';
// import TodoStore from './Stores/TodoStore';

import { AuthActions } from './Actions/AuthActions';
import { ErrorActions } from './Actions/ErrorActions';

import { App } from './App.react'
import { Registration } from './Pages/Registration.react';
import { Login } from './Pages/Login.react';

/**
 * Component used for route errors
 *
 * @class      PageNotFound (name)
 */
class PageNotFound extends Component {
  render() {
    return(
      <div>
        <span>Page Not Found :s</span>
      </div>
    );
  }
}

/**
 * Replaces route with '/' if authenticated.
 * Clears errors state on route changes.
 * Used to update app route to '/' if authenticated user navigates to /login or /register
 */
const dashRedirect = (nextState, replace, callback) => {

  Logger.log('Checking auth for auto redirect', {auth: AuthStore.hasAuth()})
  ErrorActions.clearError();
  if (AuthStore.hasAuth()) replace('/');
  callback();

};

/**
 * Primary route handler. Assigns a component to each route
 *
 * @class      RouteHandler (name)
 */
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


/**
 * Function used to render applicaiton.
 */
const render = () => {

  ReactDOM.render(
    <RouteHandler />,
    document.getElementById('root')
  );

};


/**
 * Funciton used to start app.
 * Sets authentication from cache, then renders application
 */
(function startApp() {

  Logger.setLogLevel(3);
  AuthActions.setFromCache();
  render();

})();