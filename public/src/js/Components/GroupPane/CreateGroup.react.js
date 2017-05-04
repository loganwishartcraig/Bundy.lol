import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions'

export default class CreateGroup extends Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      name: '',
      password: ''
    };

    this._handleGroupCreate = this._handleGroupCreate.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

  }

  _handleGroupCreate(e) {
    e.preventDefault();
    GroupActions.createGroup(this.state)    
  }

  _handleInputChange(e) {
    let inputName = e.target.getAttribute('name');
    let type = e.target.getAttribute('type');
    let stateChange = {};
    stateChange[inputName] = (type === 'checkbox' || type === 'radio') ? !this.state[inputName] : e.target.value
    this.setState(stateChange);
  }

  render() {
    return(
      <form onSubmit={this._handleGroupCreate} method="POST" action="/groups/join">
        <div className="form-group">
          <label htmlFor="name">
            <span>Group Name</span>
            <input onChange={this._handleInputChange} type="text" name="name" id="name" value={this.state.name} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <span>Password</span>
            <input onChange={this._handleInputChange} type="password" name="password" id="password" value={this.state.password} />
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Create</button>
        </div>
      </form>
    )
  }

}
