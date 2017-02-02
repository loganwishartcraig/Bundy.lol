import React, { Component } from 'react';

import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';

import { DisplayActions } from '../../Actions/DisplayActions';

import { GroupSelector } from './GroupSelector.react';

const getGroupState = () => ({
  activeGroup: GroupStore.getActive(),
  groups: GroupStore.getGroups(),
  isAdding: GroupStore.isAdding(),
  hasGroups: GroupStore.hasGroups(),
  hasActive: GroupStore.hasActive()
});

class GroupPane extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = getGroupState();

    this._handleGroupChange = this._handleGroupChange.bind(this);  

  }

  componentWillMount() {
    GroupStore.setListener(this._handleGroupChange);
  }

  componentWillUnmount() {
    GroupStore.unsetListener(this._handleGroupChange);
  }

  _handleGroupChange(evt) {
    this.setState(getGroupState());
  }

  _handleGroupAdd(evt) {
    DisplayActions.viewGroupAdd();
  }

  // render() {

   

  // }

  render() {
    return(
      <div>
        <div>Group Pane</div>

        {(this.state.hasGroups) ? (
          <div>

            <span>Active: {(this.state.hasActive) ? JSON.stringify(this.state.activeGroup) : 'None :('}
            </span>
            <br/>
            <GroupSelector 
              groupNames={Object.keys(this.state.groups)}
              activeId={(this.state.hasActive) ? this.state.activeGroup.name : ''}
            /><br/>
            <span>Groups: {JSON.stringify(this.state.groups)}</span>
          </div>
          ) : (
          <span>U have no groups :(<br /></span>
        )}
        <button onClick={this._handleGroupAdd} >Add Group</button>
      </div> 
    );
  }

}


export { GroupPane };