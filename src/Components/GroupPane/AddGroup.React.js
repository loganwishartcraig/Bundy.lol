import React, { Component } from 'react';

import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';

import { DisplayActions } from '../../Actions/DisplayActions';


class AddGroupPane extends Component {


  constructor(props, context) {
    super(props, context);


  }

  render() {

    return (
      <div>
        <span>Add group</span>
      </div>
    )
  }




}

export { AddGroupPane }