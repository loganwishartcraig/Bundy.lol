import React, { Component } from 'react';
// import { browserHistory } from 'react-router'

import Logger from '../Utility/Logging';

import { AuthActions } from '../Actions/AuthActions';

import UserPane from '../Components/UserPane/UserPane.react';
import GroupPane from '../Components/GroupPane/GroupPane.react';
import DisplayArea from '../Components/DisplayArea/DisplayArea.react';


/**
 * Page component handsles display structure for dashboard items.
 *
 * @class      Dashboard (name)
 */
export class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);    
  }


  componentWillMount() {
    Logger.log('<Dashboard /> mounting');
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
          <DisplayArea />
      </main>
    )
  }

}
