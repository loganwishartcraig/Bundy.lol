import React, { Component } from 'react';

import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';

import { DisplayActions } from '../../Actions/DisplayActions';
import { DisplayStore } from '../../Stores/DisplayStore';

import { CreateGroup } from './CreateGroup.react.js';
import { JoinGroup } from './JoinGroup.react.js';

// class NewGroupPane extends Component {



// }

// const _handleGroupCreate = (evt) => {

//   console.log(evt);

//   evt.preventDefualt();
//   // evt.target
//   // GroupActions.createGroup(evt.target);

// };


// const _handleGroupJoin = (evt) => {

//   evt.preventDefualt();
//   GroupActions.joinGroup(this.state);    

// };

export const NewGroupPane = ({

}) => {
  return (
    <div>
      <CreateGroup />
      <JoinGroup />
    </div>
  );
};