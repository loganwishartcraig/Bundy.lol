import React, { Component } from 'react';

// import { CreateGroup } from './CreateGroup.react.js';
// import { JoinGroup } from './JoinGroup.react.js';
import{ GroupStore } from '../../Stores/GroupStore';
import { TodoActions } from '../../Actions/TodoActions'


export class NewTodoView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: ''
    };
    this._handleTodoAdd = this._handleTodoAdd.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleTodoAdd(evt) {
    if (this.state.text.length > 0) TodoActions.createTodo({
      todo: this.state,
      groupId: GroupStore.getActiveId()
    });
  }

  _handleInputChange(evt) {
    this.setState({text: evt.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this._handleInputChange} />
        <button onClick={this._handleTodoAdd}>Add Task</button>
      </div>
    );
  }
}
