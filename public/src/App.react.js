import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { AuthStore } from './Stores/AuthStore';
import { UserStore } from './Stores/UserStore';

import { Dashboard } from './Pages/Dashboard.react';
import { Landing } from './Pages/Landing.react';


const getAppState = () => ({
  hasAuth: AuthStore.hasAuth(),
  // hasUser: UserStore.hasUser(),
  user: UserStore.getUser()
});


export class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = getAppState();
  }

  componentWillMount() {
    console.log('app mounting', this.state)
    AuthStore.setListener(() => {
      this.setState(getAppState());
      if (this.state.hasAuth) {
        browserHistory.push('/');
      };
    });
    UserStore.setListener(() => {
      this.setState(getAppState())
    });
  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div>
        {this.state.hasAuth ? (
          <Dashboard user={this.state.user}/>
        ) : (
          <Landing>
            {this.props.children}
          </Landing>
        )}  

      </div>
    );
  }

}
