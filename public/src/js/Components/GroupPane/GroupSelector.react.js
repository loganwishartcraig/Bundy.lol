import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions';

const _handleGroupChange = evt => {
  if (evt.target.nodeName !== 'BUTTON') return;
  const groupName = evt.target.getAttribute('name');
  GroupActions.setActive(groupName)
};


/**
 * Component provides a list of groups available to the user
 * Clicking a group will make it the active group 
 *
 * @class      GroupSelector (name)
 * @param      {Object}  arg1              Component props
 * @param      {Boolean}  arg1.hasGroups    Indicates if groups are available
 * @param      { [ Object ] }  arg1.groups       List of groups
 * @param      {String}  arg1.activeGroup  The active group ID
 * @return     {Object}  React component
 */
const GroupSelector = ({
  hasGroups,
  groups,
  activeGroup
}) => (

  <ul className="group--selector" onClick={_handleGroupChange}>
       
    {/* If no groups availalbe, render nothing
      * !-- SHOULD RENDER "NO GROUPS' MESSAGE
      */}
    {/* Render new item for each group, if group is active, give active class */}
    {(hasGroups) ? 

        groups.map(function(group, i) {
          return (<li key={i} className="group--item"><button name={group.name} title={group.name} className={(activeGroup === group.name) ? 'group--btn active' : 'group--btn'}>{group.name}</button></li>)
        }.bind(this))
      : 
        null
    }

  </ul>

);

export default GroupSelector;
