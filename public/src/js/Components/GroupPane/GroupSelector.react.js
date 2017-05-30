import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';


/**
 * Component provides a list of groups available to the user
 * Clicking a group will make it the active group 
 *
 * @class      GroupSelector (name)
 */
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

  render() {
    return(
      <ul className="group--selector" onClick={this._handleGroupChange}>
       
        {/* If no groups availalbe, render nothing
          * !-- SHOULD RENDER "NO GROUPS' MESSAGE
          */}
        {/* Render new item for each group, if group is active, give active class */}
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