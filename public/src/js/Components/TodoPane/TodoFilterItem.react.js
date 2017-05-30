import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';

/**
 * Provides a todo filter item for use in the todo filter list
 * Text will be provided as child of component
 *
 * @class      TodoFilterItem (name)
 */
export default class TodoFilterItem extends Component {
  constructor(props, context) {
    super(props, context);
    
    this._handleFilterClick = this._handleFilterClick.bind(this);
  }

  /**
   * HAndles setting active filter
   * 
   * !! -- Could be reworked to use event bubbling
   *
   * @param      {Object}  evt     Browser event object
   */
  _handleFilterClick(evt) {
    TodoActions.setFilter(this.props.id);
  }

  render() {
    return(
      <li className="todo--filter"><button className={(this.props.id === this.props.active) ? 'wire--btn--blue active' : 'wire--btn--blue'} onClick={this._handleFilterClick}>{this.props.children}</button></li>
    );
  }
}