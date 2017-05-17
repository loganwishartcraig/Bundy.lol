import React, { Component } from 'react';

import GroupStore from '../../Stores/GroupStore';

import DatePane from '../DatePane/DatePane.react';
import TodoPane from '../TodoPane/TodoPane.react';
import AddGroupPane from '../AddGroupPane/AddGroupPane.react';
import GroupManagePane from '../GroupManagePane/GroupManagePane.react';

const getDashState = () => ({

  isAddingGroup: GroupStore.isAdding(),
  isCreatingGroup: GroupStore.isCreating(),
  isManagingGroup: GroupStore.isManaging() ,
  activeId: GroupStore.getActiveName(),
  activeMembers: GroupStore.getActiveMembers()

});

export default class DisplayArea extends Component {
  constructor(props, context) {

    super(props, context)
  
    this.state = getDashState()
  
    this._handleGroupChange = this._handleGroupChange.bind(this)
  
  } 

  _handleGroupChange() {
    this.setState(getDashState());
  }

  componentWillMount() {
    GroupStore.setListener(this._handleGroupChange);
  }

  componentWillUnmount() {
    GroupStore.unsetListener(this._handleGroupChange);
  }


  render() {

    return(

      <div className="dash--right">
        <DatePane />
        {(!this.state.isAddingGroup && !this.state.isManagingGroup) ? <TodoPane ownerId={this.state.activeId} /> : null} 
        {(this.state.isAddingGroup && !this.state.isManagingGroup) ? <AddGroupPane isCreating={this.state.isCreatingGroup} /> : null}
        {(!this.state.isAddingGroup && this.state.isManagingGroup) ? <GroupManagePane ownerId={this.state.activeId} members={this.state.activeMembers} /> : null}
      </div>


    )

  }
}