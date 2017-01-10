import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { AuthActions } from './Actions/AuthActions';
import { UserActions } from './Actions/UserActions';

import { AuthStore } from './Stores/AuthStore';

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

  console.log('entry.js -> dashRedirect() | ', AuthStore.hasAuth())
  if (AuthStore.hasAuth()) replace('/');
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



// should be built to be async?
AuthActions
  .initAuth()
  .then(() => {
    UserActions
      .initUser()
      .then(render)
      .catch(render)
  })
  .catch(render);