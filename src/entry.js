import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// import { UserStore } from './Stores/UserStore';
import { AuthService } from './Services/AuthService';

import { App } from './App.react'
import { Registration } from './Pages/Registration.react';
import { Login } from './Pages/Login.react';


class PageNotFound extends Component {


  render() {
    console.log('rendering')
    return(
      <div>
        <span>Page Not Found :s</span>
      </div>
    );
  }
}



class RouteHandler extends Component { 

  render() {
    return (
        <Router history={browserHistory}>
          <Route path="/" component={App} >
            <Route path="register" component={Registration} />
            <Route path="login" component={Login} />
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


AuthService
  .init()
  .then(render)
  .catch(render);