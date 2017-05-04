import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';

import JoinGroup from './JoinGroup.react';
import CreateGroup from './CreateGroup.react';


export default class AddGroup extends Component {
  constructor(props, context) {
    super(props, context);
  }

  _handleJoinAdd(evt) {
    GroupActions.startJoin();
  } 

  

  _handleGroupCancel(evt) {
    GroupActions.cancelAdd();
  }

  render() {
    return (
      <div className="group--join--container">
      
      {(this.props.isCreating) ? 
          <CreateGroup />
        :
          <JoinGroup />
      }

      {(this.props.isCreating) ? 
          <button onClick={this._handleJoinAdd}>Join existing</button>
        :
          null
      }

      <button className="text--btn--grey" onClick={this._handleGroupCancel}>Cancel</button>


    </div>)
  }
}