import React, { Component } from 'react';

import { GroupActions } from '../../Actions/GroupActions';

const _handleGroupClick = (group) => {
  
  console.log('GroupSelector.js -> _handleGroupClick() | Setting active', group)
  GroupActions.setActive(group)
}


export const GroupSelector = ({
  groups,
  activeName
}) => (
  // <span> group selector {JSON.stringify(groups)} </span>
  <div>
    {Object.keys(groups).map((key, i) => <button 
      key={i}    
      onClick={e => {
        if (groups[key].name === activeName) return;
        _handleGroupClick(groups[key]);
      }}
  >{groups[key].name}</button>)}</div>

);