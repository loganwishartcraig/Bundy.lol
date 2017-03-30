import React, { Component } from 'react';

import { LogoutBtn } from './LogoutBtn.react';

import { UserStore } from '../../Stores/UserStore';

class UserPane extends Component {

  constructor(props, context) {
    super(props, context);
    console.log('user pane mounting', props);
 
  }

  render() {
    return(
      <div>
        <div>User Pane has user: {JSON.stringify(this.props.user)}</div>

        <div>email: {this.props.user.email}</div>  
        <LogoutBtn />
      </div> 
    );
  }

}


export { UserPane };