import React, { Component } from 'react';

import { GroupActions } from '../../Actions/GroupActions';

const _handleGroupClick = (name) => {
  
  console.log('GroupSelector.js -> _handleGroupClick() | Setting active', name)
  GroupActions.setActive(name)
}


export const GroupSelector = ({
  groupNames,
  activeId
}) => (
  <div>
    {groupNames.map((name, i) => <button 
      key={i}    
      onClick={e => {
        _handleGroupClick(name);
      }}
  >{name}</button>)}</div>
);