import React, { Component } from 'react'
import Logger from '../../Utility/Logging'

import UserStore from '../../Stores/UserStore';
import { UserActions } from '../../Actions/UserActions';

const getUserState = () => ({
  user: UserStore.getUser(),
  hasUser: UserStore.hasUser()
});


/**
 * Component used to display user information
 *
 * @class      UserPane (name)
 */
export default class UserPane extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = getUserState();
    this._handleUserChange = this._handleUserChange.bind(this);
    
  }

  _handleUserChange() {
    this.setState(getUserState())
  }

  componentWillMount() {
    Logger.log('<UserPane /> mounting', this.state)
    UserStore.setListener(this._handleUserChange)
  }

  componentWillUnmount() {
    Logger.log('<UserPane /> un-mounting', this.state)
    UserStore.unsetListener(this._handleUserChange)
  }

  render() {

    return(
      <div className="user--container">

        {/* If no user, display loading until user fetch completec */}
        {(this.state.hasUser) ? (
          <span className="user--name">{this.state.user.fName}</span>
        ) : <span className="user--name loading">Loading...</span>}

      </div>
    )
  }

}