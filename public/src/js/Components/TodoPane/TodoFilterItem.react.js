import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';


export default class TodoFilterItem extends Component {
  constructor(props, context) {
    super(props, context);
    
    this._handleFilterClick = this._handleFilterClick.bind(this);
  }

  _handleFilterClick(evt) {
    TodoActions.setFilter(this.props.id);
  }

  render() {
    return(
      <li className="todo--filter"><button className={(this.props.id === this.props.active) ? 'wire--btn--blue active' : 'wire--btn--blue'} onClick={this._handleFilterClick}>{this.props.children}</button></li>
    );
  }
}