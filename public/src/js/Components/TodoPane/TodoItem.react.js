import React, { Component } from 'react';
import Logger from '../../Utility/Logging';


import { TodoActions } from '../../Actions/TodoActions';

import TodoItemOptions from './TodoItemOptions.react';


export default class TodoItem extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      showMenu: false
    }


    this._handleTodoComplete = this._handleTodoComplete.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);

  }

 

  _handleTodoComplete() {
    TodoActions.markComplete(this.props._id)
  }

  _handleMouseEnter(evt) {
    if (!this.state.showMenu) this.setState({showMenu: true})
  }

  _handleMouseLeave(evt) {
    if (this.state.showMenu) this.setState({showMenu: false})
  }

  render() {

    return(

      <li className="todo--item" onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
        {(!this.props.completed) ? 
          <button className="todo--complete--btn" onClick={this._handleTodoComplete}>I've Got It</button> 
        : 
          <strong>Complete</strong>
        } {this.props.title} 
        &nbsp;
        {(this.state.showMenu && this.props.userId === this.props.createdBy) ? <TodoItemOptions {...this.props} /> : null}
      </li>

    )

  }

}