import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { AuthActions } from './Actions/AuthActions';
import { AuthStore } from './Stores/AuthStore';

import { UserActions } from './Actions/UserActions';

// import { UserStore } from './Stores/UserStore';

import { UserPane } from './Components/UserPane/UserPane.react';
import { GroupPane } from './Components/GroupPane/GroupPane.react';
import { TodoPane } from './Components/TodoPane/TodoPane.react';

import { RegistrationPage } from './Components/Registration/RegistrationPage.react';
import { LoginPage } from './Components/Login/LoginPage.react';






class Dashboard extends Component {

  render() {
    return (
      <div>
        <UserPane /><br />
        <GroupPane /><br />
        <TodoPane />
      </div>
    )
  }

}


const getAuthState = () => ({
  hasAuth: AuthStore.hasAuth()
});


// bind to authentication changes.
class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasAuth: AuthStore.hasAuth()
    };

  }

  componentWillMount() {
    console.log('app mounting', this.state.hasAuth)
    AuthActions.init()
    AuthStore.addListener(() => {
      this.setState(getAuthState());
      browserHistory.push('/');
    });
    // if (this.state.hasAuth) {
    //   UserActions.initUser('a');
    // };
  }

  render() {

    return (
      <div>
        {this.state.hasAuth ? (
          <Dashboard />
        ) : (
          <LandingPage>
            {this.props.children}
          </LandingPage>
        )}  

      </div>
    )
  }

}


class LandingPage extends Component {


  render() {
    return (
      <div>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}

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
            <Route path="register" component={RegistrationPage} />
            <Route path="login" component={LoginPage} />
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

}

render();


