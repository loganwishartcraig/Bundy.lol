import React, { Component } from 'react';

import { LogoutBtn } from './LogoutBtn.react';

import { UserStore } from '../../Stores/UserStore';


const getUserState = () => ({
  user: UserStore.getUser(),
  hasUser: UserStore.hasUser()
});


class UserPane extends Component {

  constructor(props, context) {
    console.log('user pane mounting', getUserState());
    super(props, context);
    this.state = getUserState();
  }

  _handleUserChange() {
    this.setState(getUserState());
  }

  componentWillMount() {
    UserStore.addListener(this._handleUserChange.bind(this));
  }

  render() {
    return(
      <div>
        <div>User Pane {this.state.hasUser ? 'has user: '.concat(JSON.stringify(this.state.user)) : 'no user'}</div>

        <div>email: {this.state.hasUser ? this.state.user.email : ''}</div>  
        <LogoutBtn />
      </div> 
    );
  }

}


export { UserPane };