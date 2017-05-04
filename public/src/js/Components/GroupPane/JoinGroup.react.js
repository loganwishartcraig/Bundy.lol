import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions'

export default class JoinGroup extends Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      name: '',
      password: ''
    };

    this._handleGroupJoin = this._handleGroupJoin.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

  }

  _handleGroupJoin(e) {
    e.preventDefault();
    GroupActions.joinGroup(this.state)    
  }

  _handleInputChange(e) {
    let inputName = e.target.getAttribute('name');
    let type = e.target.getAttribute('type');
    let stateChange = {};
    stateChange[inputName] = (type === 'checkbox' || type === 'radio') ? !this.state[inputName] : e.target.value
    this.setState(stateChange);
  }

  _handleCreateAdd(evt) {
    GroupActions.startCreate();
  }

  render() {
    return(
      <form onSubmit={this._handleGroupJoin} method="POST" action="/groups/join">
        <div className="form--group--sm">
          <label htmlFor="name">
            <span className="input--label--sm">Group Name</span>
            <input className="form--input--sm full" onChange={this._handleInputChange} type="text" name="name" id="name" value={this.state.name} />
          </label>
        </div>
        <div className="form--group--sm">
          <label htmlFor="password">
            <span className="input--label--sm">Password</span>
            <input className="form--input--sm full"  onChange={this._handleInputChange} type="password" name="password" id="password" value={this.state.password} />
          </label>
        </div>
        <div className="form--group--sm group--join--actions">
          <button className="secondary--btn" type="submit">Join</button>
          <button className="secondary--btn" onClick={this._handleCreateAdd}>Create</button>
        </div>
      </form>
    )
  }

}
