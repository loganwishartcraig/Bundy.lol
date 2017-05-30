import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';


/**
 * Holds live text and action buttons for a todo edit
 *
 * @class      TodoItemEditing (name)
 */
export default class TodoItemEditing extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: this.props.text
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleEditComit = this._handleEditComit.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
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

  _handleKeyUp(evt) {
    if (evt.which == 13 || evt.keyCode == 13) {
      if (this.state.text.length !== 0) this._handleEditComit()
    }
  }

  render() {
    return(
      <li className="todo--item editing">
        <input autoFocus className="form--input full todo--input--edit" type="text" value={this.state.text} onKeyUp={this._handleKeyUp} onChange={this._handleInputChange} required="required"/> 
        <div className="todo--edit--actions">
          <button className="text--btn--grey btn--save" onClick={this._handleEditComit}>Save</button> 
          <button className="text--btn--grey btn--cancel" onClick={this._handleEditCancel}>Cancel</button>
        </div>
      </li>
    )
  }
}