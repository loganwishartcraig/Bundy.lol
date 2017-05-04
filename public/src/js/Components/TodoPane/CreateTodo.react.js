import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

export default class CreateTodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: ''
    };

    this._handleTodoCreate = this._handleTodoCreate.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

  }

  _handleTodoCreate(e) {
    e.preventDefault();
    if (this.state.title === '') return; 
    TodoActions.createTodo(this.props.addTo, this.state);
  }

  _handleInputChange(e) {
    let inputName = e.target.getAttribute('name');
    let type = e.target.getAttribute('type');
    let stateChange = {};
    stateChange[inputName] = (type === 'checkbox' || type === 'radio') ? !this.state[inputName] : e.target.value
    this.setState(stateChange);
  }

    

  render() {
    return (
      <form onSubmit={this._handleTodoCreate} method="POST" action="/groups/join">
        <div className="form-group">
          <label htmlFor="title">
            <span>New Task for {this.props.addTo}</span>
            <input onChange={this._handleInputChange} type="text" name="title" id="title" value={this.state.title} />
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Add Task</button>
        </div>
      </form>
    )
  }
}