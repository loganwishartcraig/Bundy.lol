import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';

import JoinGroup from './JoinGroup.react';
import CreateGroup from './CreateGroup.react';


export default class AddGroupPane extends Component {
  constructor(props, context) {
    super(props, context);
  }

  _handleJoinAdd(evt) {
    GroupActions.startJoin();
  }

  _handleCreateAdd(evt) {
    GroupActions.startCreate();
  }   

  render() {
    return (
      <div className="group--join--container">
        <h3 className="bar--header--pink full">Add a Group</h3>

        <div className="add--todo--tabs tab--container">
          <button className="btn--tab" type="button" onClick={this._handleJoinAdd} className={(!this.props.isCreating) ? 'page--tab active' : 'page--tab'}>Join Group</button>
          <button className="btn--tab" type="button" onClick={this._handleCreateAdd} className={(this.props.isCreating) ? 'page--tab active' : 'page--tab'}>Create Group</button> 
        </div>

        {(this.props.isCreating) ? 
            <CreateGroup />
          :
            <JoinGroup />
        }

      </div>
    )
  }
}