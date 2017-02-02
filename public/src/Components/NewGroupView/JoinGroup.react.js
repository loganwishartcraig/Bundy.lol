import React, { Component } from 'react';

import { GroupStore } from '../../Stores/GroupStore';
import { GroupActions } from '../../Actions/GroupActions';

class JoinGroup extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      password: ''
    };

    this._handleGroupSubmit = this._handleGroupSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

  }

  _handleGroupSubmit(e) {

    e.preventDefault();
    GroupActions.joinGroup(this.state)    

  }

  _handleInputChange(e) {
    
    let inputName = e.target.getAttribute('name'),
        value = e.target.value,
        stateChange = {};
        
    stateChange[inputName] = value;

    this.setState(stateChange);

  }

  render() {
    return(

      <div>
        <span>Join an existing group</span>
        <form onSubmit={this._handleGroupSubmit} action="/group/join" method="POST">
          <input onChange={this._handleInputChange} type="text" name="name" />
          <input onChange={this._handleInputChange} type="password" name="password" />
          <button type="submit">Join</button>
        </form>
      </div>

    );
  }
}

export { JoinGroup };