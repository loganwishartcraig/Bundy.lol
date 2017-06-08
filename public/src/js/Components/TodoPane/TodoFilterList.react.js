import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import TodoFilterItem from './TodoFilterItem.react';


/**
 * Maps the key for the 'active filter' to a human readable label. 
 *
 */
const filterLabels = {
  'ALL': 'All',
  'COMPLETE': 'Complete',
  'INCOMPLETE': 'Incomplete'
};


/**
 * Activates filter on filter btn click. 
 * Uses 'data-filterid' attribute set on 'TodoFilterItem' to set todo
 *
 * @param      {Object}  evt     Browser event object=
 */
const _handleFilterClick = evt => {

  if (evt.target.tagName.toLowerCase() === 'button') TodoActions.setFilter(evt.target.getAttribute('data-filterid'));

};


/**
 * Activates filter on filter btn click. 
 * Uses 'data-filterid' attribute set on 'TodoFilterItem' to set todo
 *
 * @class      TodoFilterList (name)
 * @param      {Object}  arg1                   Component props 
 * @param      { [ String ] }  arg1.availableFilters  IDs for available filters
 * @param      {String}  arg1.activeFilter      The active filter ID
 * @return     {Object}  React component
 */
const TodoFilterList = ({
  availableFilters,
  activeFilter
}) => (
  <ul className="todo--filters" onClick={_handleFilterClick}>
    <li className="todo--filter--header">Filter By: </li>

    {/* For each available filter, create a new filter item */}

    {availableFilters.map((filter, i) => 
      <TodoFilterItem active={activeFilter} key={i} id={filter}>{filterLabels[filter]}</TodoFilterItem>)
    }  
  
  </ul>
);

export default TodoFilterList;
