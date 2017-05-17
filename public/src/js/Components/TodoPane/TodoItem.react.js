import React, { Component } from 'react';
import Logger from '../../Utility/Logging';


import { TodoActions } from '../../Actions/TodoActions';

import TodoItemOptions from './TodoItemOptions.react';


export default class TodoItem extends Component {

  constructor(props, context) {
    super(props, context);

    this._handleTodoComplete = this._handleTodoComplete.bind(this);

  }

 

  _handleTodoComplete() {
    TodoActions.markComplete(this.props._id)
  }


  formatRequestDate(date) {
    date = new Date(date);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
  }

  render() {

    return(

      <li className={(this.props.completed) ? 'todo--item complete' : 'todo--item'} >
        {(this.props.completed) ? 
          <button className="todo--complete--btn wire--btn--pink btn--md" type="button" disabled="disabled">Gotten</button> 
        : 
          <button className="todo--complete--btn wire--btn--pink btn--md" onClick={this._handleTodoComplete}>I've Got It</button> 
        } 
        <span className="todo--meta">
          <span className="todo--title" title={this.props.title}>{this.props.title}</span>

          {(this.props.completed) ? 
            <em className="todo--request">Completed on {this.formatRequestDate(this.props.dateCompleted)} by {(this.props.completedBy._id === this.props.userId) ? 'you' : this.props.completedBy.name}</em>
            : 
            <em className="todo--request">Requested on {this.formatRequestDate(this.props.dateCreated)} by {(this.props.createdBy._id === this.props.userId) ? 'you' : this.props.createdBy.name}</em>
          }


        </span>

        {(this.props.userId === this.props.createdBy._id) ? <TodoItemOptions {...this.props} /> : null}
      </li>

    )

  }

}