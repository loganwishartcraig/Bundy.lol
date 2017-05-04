import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';

export default class TodoItemEditing extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: this.props.text
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleEditComit = this._handleEditComit.bind(this);
  }

  _handleEditComit(evt) {
    TodoActions.comitEdit(this.state.text, this.props.todoId, this.props.userId);
  }

  _handleEditCancel(evt) {

    TodoActions.endEdit();

  }

  _handleInputChange(evt) {
    this.setState({text: evt.target.value})
  }

  render() {
    return(
      <li className="todo--item editing"><input type="text" value={this.state.text} onChange={this._handleInputChange}/> <button onClick={this._handleEditComit}>Save</button> <button onClick={this._handleEditCancel}>Cancel</button></li>
    )
  }
}