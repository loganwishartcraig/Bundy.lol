import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';

export default class GroupSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this._handleGroupChange = this._handleGroupChange.bind(this);
  }

  _handleGroupChange(e) {
    if (e.target.nodeName !== 'BUTTON') return;
    let groupName = e.target.getAttribute('name');
    GroupActions.setActive(groupName)
  }

  _handleGroupAdd(e) {
    GroupActions.startAdd();
  }

  render() {
    return(
      <ul className="group--selector" onClick={this._handleGroupChange}>
       
        {(this.props.hasGroups) ? 
            this.props.groups.map(function(group, i) {
              return (<li key={i} className="group--item"><button name={group.name} title={group.name} className={(this.props.activeGroup === group.name) ? 'group--btn active' : 'group--btn'}>{group.name}</button></li>)
            }.bind(this))
          : 
            null
        }

        

      </ul>
    )
  }
}