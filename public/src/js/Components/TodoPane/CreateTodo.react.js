import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

export default class CreateTodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      favorite: false
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

  _handleShowFaves(e) {
    TodoActions.showFaves();
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
      <form className="todo--form flex-col" onSubmit={this._handleTodoCreate} method="POST" action="/groups/join">
        <span className="todo--create--desc">Use the form below to make your request</span>
        <div className="todo--create--input">
          <div className="form--group">
            <input autoFocus className="form--input full" onChange={this._handleInputChange} type="text" name="title" id="title" value={this.state.title} placeholder="What do you need..." required="required" />
          </div>
          <div className="form--group">
            <label className="input--label" htmlFor="favorite">
              <input className="form--input" onChange={this._handleInputChange} type="checkbox" name="favorite" id="favorite" value={this.state.favorite} />
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