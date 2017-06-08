import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';

import JoinGroup from './JoinGroup.react';
import CreateGroup from './CreateGroup.react';


const _handleJoinAdd = evt => {
  GroupActions.startJoin();  
};

const _handleCreateAdd = evt => {
  GroupActions.startCreate();  
};



 /**
  * Component used to handle addinig new groups
  * Will display either 'create' component or 'join' component based on props.
  *
  * @class      AddGroupPane (name)
  * @param      {Object}  arg1             Component props
  * @param      {Boolean}  arg1.isCreating  Indicates if the user is creating a group. Assumes joining if not.
  * @return     {Object}  React component
  */
const AddGroupPane = ({
  isCreating
}) => (
  <div className="group--join--container">
    <h3 className="bar--header--pink full">Add a Group</h3>

    <div className="add--todo--tabs tab--container">
      <button className="btn--tab" type="button" onClick={_handleJoinAdd} className={(!isCreating) ? 'page--tab active' : 'page--tab'}>Join Group</button>
      <button className="btn--tab" type="button" onClick={_handleCreateAdd} className={(isCreating) ? 'page--tab active' : 'page--tab'}>Create Group</button> 
    </div>

    {(isCreating) ? 
        <CreateGroup />
      :
        <JoinGroup />
    }

  </div>
);

export default AddGroupPane;
