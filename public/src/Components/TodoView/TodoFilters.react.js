import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';


const showAll = (todo) => true;
const showComplete = (todo) => todo.completed;
const showIncomplete = (todo) => !todo.completed;

const _handleFilterClick = (filterFunc) => {

  return () => {
    TodoActions.setFilter(filterFunc);
  }

};

export const TodoFilters = () => {

    return(
      <div>
        <button onClick={_handleFilterClick(showAll)}>Show All</button>
        <button onClick={_handleFilterClick(showComplete)}>Show Complete</button>
        <button onClick={_handleFilterClick(showIncomplete)}>Show Incomplete</button>
      </div>
    );

};

