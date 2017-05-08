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

  _handleTodoEnd(e) {
    TodoActions.endCreate();
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
      <form className="todo--form" onSubmit={this._handleTodoCreate} method="POST" action="/groups/join">
        <span>New Task</span>
        <textarea autoFocus className="todo--create--input form--input full" onChange={this._handleInputChange} type="text" name="title" id="title" value={this.state.title} placeholder="What do you need..."></textarea>
        <div className="todo--create--actions">
          <button className="todo--cancel--btn btn--cancel wire--btn--blue" onClick={this._handleTodoEnd}>Cancel</button>
          <button className="todo--add--btn add--btn bold--btn--pink" type="submit">Request</button>
        </div>
      </form>
    )
  }
}