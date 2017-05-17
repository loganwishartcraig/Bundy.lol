import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions'

import ErrorDisplay from '../ErrorDisplay/ErrorDisplay.react';

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

 

  _handleGroupCancel(evt) {
    GroupActions.cancelAdd();
  }

  render() {
    return(
      <div className="group--join  flex-col">
        <p className="group--join--desc">Use the form below to create a new group</p>
        <form className="group--form" onSubmit={this._handleGroupCreate} method="POST" action="/groups/create">
          <div className="group--form--inputs full">
          <div className="form--group">
            <label htmlFor="name">
              <span className="input--label">Group Name</span>
              <input className="form--input full" onChange={this._handleInputChange} type="text" name="name" id="name" value={this.state.name} required="required" autoFocus />
            </label>
          </div>
          <div className="form--group">
            <label htmlFor="password">
              <span className="input--label">Password <em className="grey"> - leave blank if you don't need one</em></span>
              <input className="form--input full"  onChange={this._handleInputChange} type="password" name="password" id="password" value={this.state.password} />
            </label>
          </div>
          <div className="group--err--container">
            <ErrorDisplay addClass="group--err" />
          </div>
          <div className="group--form--actions">
            <button className="bold--btn--pink btn--lg  btn--file" type="submit">Create Group</button>
            <button className="group--create--toggle wire--btn--blue btn--lg btn--cancel" onClick={this._handleGroupCancel} type="button">Cancel</button>
          </div>
          </div>
        </form>
      </div>
    )
  }

}
