import React, { Component } from 'react';

import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';

import { DisplayActions } from '../../Actions/DisplayActions';

import { GroupSelector } from './GroupSelector.react';

const getGroupState = () => ({
  hasActive: GroupStore.hasActive(),
  activeGroup: GroupStore.getActive()
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

  render() {
    return (
      <div>
        <div>Group Pane</div>
        {(this.props.groups !== undefined && this.props.groups.length !== 0) ? (
            <div>
              <span>Active: {(this.state.hasActive) ? this.state.activeGroup.name : 'No active group'}</span>
              <br />
              <GroupSelector
                groups={this.props.groups}
                activeName={(this.state.hasActive) ? this.state.activeGroup.name : undefined}
              />
               <span>Groups: {JSON.stringify(this.props.groups)}</span>
            </div>
          ) : (
            <span>U have no groups:( <br /></span>
        )}
        <br /><button onClick={this._handleGroupAdd} >Add Group</button>
      </div>
    )
  }

}


export { GroupPane };