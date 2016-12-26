import React, { Component } from 'react';

import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';

import { GroupSelector } from './GroupSelector.react';


const getGroupState = () => ({
  activeGroup: GroupStore.getActive(),
  groups: GroupStore.getGroups()
});


class GroupPane extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = getGroupState();
  }

  _handleGroupChange() {
    this.setState(getGroupState());
  }

  // _handleGroupSwitch(groupId) {
  //   GroupActions.setActive(groupId);
  // }

  componentWillMount() {
    GroupStore.addListener(this._handleGroupChange.bind(this));
  }

  render() {
    return(
      <div>
        <div>Group Pane</div>

        {(Array.isArray(this.groups) && this.groups.length > 0) ? (
          <div>
            <span>Active: {JSON.stringify(this.state.activeGroup.id)}</span>
            <GroupSelector 
              groups={this.state.groups} 
              activeId={this.state.activeGroup.id} 
            />
          </div>
          ) : (
          <span>U have no groups :(<br /></span>
        )}
        <button>Add Group</button>
      </div> 
    );
  }

}


export { GroupPane };