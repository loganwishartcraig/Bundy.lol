import React, { Component } from 'react'
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';

import GroupStore from '../../Stores/GroupStore';

import GroupSelector from './GroupSelector.react';

const getGroupState = () => ({
  groups: GroupStore.getGroups(),
  activeGroup: GroupStore.getActiveName(),
  hasGroups: GroupStore.hasGroups(),
  hasActive: GroupStore.hasActive()
});

export default class GroupPane extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = getGroupState();
    
    this._handleGroupChange = this._handleGroupChange.bind(this);

  }

  _handleGroupChange() {
    this.setState(getGroupState());
  }

  componentWillMount() {
    Logger.log('<GroupPane /> mounting', this.state);
    GroupStore.setListener(this._handleGroupChange);
  }

  componentWillUnmount() {
    GroupStore.unsetListener(this._handleGroupChange);
  }

  _handleGroupAdd(evt) {
    GroupActions.startAdd();
  }

  _handleGroupLeave(groupId) {
    return (evt) => {
      GroupActions.leaveGroup(groupId)
    }
  }


  render() {

    return(
      <section className="group--container">
        <h4 className="group--header">Groups</h4>     
        <GroupSelector hasGroups={this.state.hasGroups} groups={this.state.groups} activeGroup={this.state.activeGroup} />
        <button className="group--add--btn wire--btn--blue add--btn" onClick={this._handleGroupAdd}>Add Group</button>         
      
      </section>
    )
  }

}