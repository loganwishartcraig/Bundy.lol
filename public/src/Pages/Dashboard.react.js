import React, { Component } from 'react';

import { UserActions } from '../Actions/UserActions';

import { UserPane } from '../Components/UserPane/UserPane.react';
import { GroupPane } from '../Components/GroupPane/GroupPane.react';
import { DisplayPane } from '../Components/DisplayPane/DisplayPane.react';


// export 

export class Dashboard extends Component {

  render() {
    return (
      <div>
        <UserPane /><br />
        <GroupPane /><br />
        <DisplayPane />
      </div>
    )
  }

}
