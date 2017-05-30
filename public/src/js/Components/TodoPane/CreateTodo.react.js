import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';


/**
 * Component used to handle creating a new todo
 * Presents a form to create a todo, requests creation on submit
 *
 * @class      CreateTodo (name)
 */
export default class CreateTodo extends Component {
  constructor(props, context) {
    super(props, context);

    /**
     * Initial state
     */
    this.state = {
      title: '',        // text for the todo
      toFave: false     // Indicates if todo should be favorited
    };

    this._handleTodoCreate = this._handleTodoCreate.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

  }

  /**
   * Requsts new todo if non-empty
   *
   * @param      {Object}  e       Browser event object
   */
  _handleTodoCreate(e) {
    e.preventDefault();
    if (this.state.title === '') return; 
    TodoActions.createTodo(Object.assign({groupId: this.props.addTo}, this.state));
  }

  _handleTodoEnd(e) {
    TodoActions.endCreate();
  }

  _handleShowFaves(e) {
    TodoActions.showFaves();
  }

  /**
   * On input change, get new value and update state
   *
   * @param      {Object}  e       Browser event object
   */
  _handleInputChange(e) {
    let inputName = e.target.getAttribute('name');
    let type = e.target.getAttribute('type');
    let stateChange = {};
    stateChange[inputName] = (type === 'checkbox' || type === 'radio') ? !this.state[inputName] : e.target.value
    this.setState(stateChange);
  }

    

  render() {
    return (
      <form className="todo--form flex-col" onSubmit={this._handleTodoCreate} method="POST" action="/groups/join">
        <span className="todo--create--desc">Use the form below to make your request</span>
        <div className="todo--create--input">
          <div className="form--group">
            <input autoFocus className="form--input full" onChange={this._handleInputChange} type="text" name="title" id="title" value={this.state.title} placeholder="What do you need..." required="required" />
          </div>
          <div className="form--group">
            <label className="input--label" htmlFor="toFave">
              <input className="form--input" onChange={this._handleInputChange} type="checkbox" name="toFave" id="toFave" value={this.state.toFave} />
              <span>Add to favorites</span>
            </label>
          </div>
          <div className="todo--create--actions">
            <button className="todo--add--btn add--btn bold--btn--pink btn--lg" type="submit">Request</button>
            <button className="todo--cancel--btn btn--cancel wire--btn--blue btn--lg" onClick={this._handleTodoEnd}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}