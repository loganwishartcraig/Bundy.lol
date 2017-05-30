import React, { Component } from 'react';

import GroupStore from '../../Stores/GroupStore';

import DatePane from '../DatePane/DatePane.react';
import TodoPane from '../TodoPane/TodoPane.react';
import AddGroupPane from '../AddGroupPane/AddGroupPane.react';
import GroupManagePane from '../GroupManagePane/GroupManagePane.react';

/**
 * Used to pull relevant state values for the component from store
 */
const getDashState = () => ({

  isAddingGroup: GroupStore.isAdding(),
  isCreatingGroup: GroupStore.isCreating(),       
  isManagingGroup: GroupStore.isManaging() ,
  activeId: GroupStore.getActiveName(),
  activeMembers: GroupStore.getActiveMembers()

});

/**
 * Handles rendering a component to the main display area based on state variables.
 * Only renders one component at a time.
 *
 * @class      DisplayArea (name)
 */
export default class DisplayArea extends Component {
  constructor(props, context) {

    super(props, context)
  
    /**
     * Sets initial state
     */
    this.state = getDashState();
  
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

        {/* display todo pane if user is not adding a group or managing their group (default) */}
        {(!this.state.isAddingGroup && !this.state.isManagingGroup) ? <TodoPane ownerId={this.state.activeId} /> : null} 

        {/* display the add group pane if user is adding a group but not managing */}
        {(this.state.isAddingGroup && !this.state.isManagingGroup) ? <AddGroupPane isCreating={this.state.isCreatingGroup} /> : null}

        {/* display the manage group pane if user is managing a group */}
        {(this.state.isManagingGroup) ? <GroupManagePane ownerId={this.state.activeId} members={this.state.activeMembers} /> : null}
      
      </div>


    )

  }
}