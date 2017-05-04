import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import TodoFilterItem from './TodoFilterItem.react';

export default class TodoFilterList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterLabels: {
        'ALL': 'All',
        'COMPLETE': 'Complete',
        'INCOMPLETE': 'Incomplete'
      }
    }
  }

  // _handleFilterClick(filterId) {
  //   return function(evt) {
  //     TodoActions.setFilter(filterId);
  //   }
  // }

  render() {
    return (
      <ul className="todo--filters">
        <li className="todo--filter--header">Filter By: </li>
        {this.props.availableFilters.map((filter, i) => <TodoFilterItem active={this.props.activeFilter} key={i} id={filter}>{this.state.filterLabels[filter]}</TodoFilterItem>)}  
      </ul>
    )
  }
}