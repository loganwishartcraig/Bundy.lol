import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import TodoFilterItem from './TodoFilterItem.react';


/**
 * Component lists out all available todo filters and assigns a human readable label to each
 *
 * @class      TodoFilterList (name)
 */
export default class TodoFilterList extends Component {
  constructor(props, context) {
    super(props, context);
    
    /**
     * Initial state, filterLables maps the key for the 'active filter' to a human readable label. 
     */
    this.state = {
      filterLabels: {
        'ALL': 'All',
        'COMPLETE': 'Complete',
        'INCOMPLETE': 'Incomplete'
      }
    }
  }

  render() {
    return (
      <ul className="todo--filters">
        <li className="todo--filter--header">Filter By: </li>

        {/* For each available filter, create a new filter item */}

        {this.props.availableFilters.map((filter, i) => 
          <TodoFilterItem active={this.props.activeFilter} key={i} id={filter}>{this.state.filterLabels[filter]}</TodoFilterItem>)
        }  
      
      </ul>
    )
  }
}