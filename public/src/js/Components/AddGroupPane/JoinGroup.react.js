import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { GroupActions } from '../../Actions/GroupActions'

import ErrorDisplay from '../ErrorDisplay/ErrorDisplay.react';
import Form from '../Form/Form.react';

const _handleGroupJoin = evt => {
  evt.preventDefault();
  GroupActions.joinGroup(this.state);
};

const _handleGroupCancel = evt => {
  GroupActions.cancelAdd();
};


/**
 * Componnet used to join an existing group
 * Presents a form for a user to fill out, will request join on submit
 *
 * @class      JoinGroup (name)
 * @param      {Object}  arg1    Component props
 * @return     {Object}  React component
 */
const JoinGroup = ({}) => (

  <div className="group--join  flex-col">
    <p className="group--join--desc">Use the form below to join an existing group</p>

    {/* 'Form' component will manage form state. 'inputs' prop should match default values for all form inputs */}
    <Form onSubmit={_handleGroupJoin} inputs={{name: '', password: ''}} method="POST" action="/groups/join" className="group--form">  
      <div className="group--form--inputs full">
        <div className="form--group">
          <label htmlFor="name">
            <span className="input--label">Group Name</span>
            <input className="form--input full" type="text" name="name" id="name" required="required" autoFocus />
          </label>
        </div>
        <div className="form--group">
          <label htmlFor="password">
            <span className="input--label">Password <em className="grey"> - leave blank if there isn't one</em></span>
            <input className="form--input full" type="password" name="password" id="password" />
          </label>
        </div>
        <div className="group--err--container">
          <ErrorDisplay addClass="group--err" />
        </div>
        <div className="group--form--actions">
          <button className="bold--btn--pink btn--lg btn--group" type="submit">Join Group</button>
          <button className="group--create--toggle wire--btn--blue btn--lg btn--cancel" onClick={_handleGroupCancel} type="button">Cancel</button>
        </div>
      </div>
    </Form>
  </div>

);

export default JoinGroup;