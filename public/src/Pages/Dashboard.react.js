import React, { Component } from 'react';

import { UserActions } from '../Actions/UserActions';

import { UserPane } from '../Components/UserPane/UserPane.react';
import { GroupPane } from '../Components/GroupPane/GroupPane.react';
import { DisplayPane } from '../Components/DisplayPane/DisplayPane.react';

export class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      (this.props.user !== undefined && Object.keys(this.props.user).length !== 0) ? (
        <div>
          <UserPane user={this.props.user} /><br />
          <GroupPane groups={this.props.user.memberOf} /><br />
          <DisplayPane />
        </div>
      ) : (
        <div>
          <span>Loading...</span>
        </div>
      )
    )
  }

}
