import React, { Component } from 'react';
import Logger from '../Utility/Logging';

import { AuthActions } from '../Actions/AuthActions';
import { ProfileActions } from '../Actions/ProfileActions';

import UserPane from '../Components/UserPane/UserPane.react';
import GroupPane from '../Components/GroupPane/GroupPane.react';
import TodoPane from '../Components/TodoPane/TodoPane.react';
import DatePane from '../Components/DatePane/DatePane.react';

export class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    Logger.log('<Dashboard /> mounting');
    ProfileActions.updateProfile()
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <main className="dash--container">
          <div className="dash--left">
            <UserPane />
            <GroupPane />
            <div className="account--actions">
              <button className="logout--btn text--btn--grey" onClick={AuthActions.logout}>Logout</button>
            </div>
          </div>
          <div className="dash--right">
            <DatePane />
            <TodoPane />
          </div>

      </main>
    )
  }

}
