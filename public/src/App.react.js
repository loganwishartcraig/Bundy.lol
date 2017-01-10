import React, { Component } from 'react';
import { browserHistory } from 'react-router';


// import { AuthActions } from './Actions/AuthActions';
import { AuthStore } from './Stores/AuthStore';

import { Dashboard } from './Pages/Dashboard.react';
import { Landing } from './Pages/Landing.react';

// import { UserActions } from './Actions/UserActions';



const getAuthState = () => ({
  hasAuth: AuthStore.hasAuth()
});


// bind to authentication changes.
export class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      hasAuth: AuthStore.hasAuth()
    };

  }

  componentWillMount() {
    console.log('app mounting', this.state)
    AuthStore.addListener(() => {
      this.setState(getAuthState());
      // browserHistory.push('/');
      if (this.state.hasAuth) {
        browserHistory.push('/');
      };
    });
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
    )
  }

}
