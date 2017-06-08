import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import Form from '../Form/Form.react';

// non arrow to allow for rebinding of this by 'Form' component
const _handleTodoCreate = function(evt) {
  evt.preventDefault();
  if (this.state.title === '') return; 
  TodoActions.createTodo(this.state);
};

const _handleTodoEnd = evt => {
  TodoActions.endCreate();
};

const _handleShowFaves = evt => {
  TodoActions.showFaves();
};


/**
 * Component used to handle creating a new todo
 * Presents a form to create a todo, requests creation on submit
 *
 * @class      CreateTodo (name)
 * @param      {Object}  arg1        Component props
 * @param      {String}  arg1.addTo  ID of group to push new tasks to
 * @return     {Object}  React component
 */
const CreateTodo = ({
  addTo
}) => (
  <Form onSubmit={_handleTodoCreate} inputs={{title: '', toFave: true, groupId: addTo}} method="POST" action="/groups/join" className="todo--form flex-col">  
    <span className="todo--create--desc">Use the form below to make your request</span>
    <div className="todo--create--input">
      <div className="form--group">
        <input autoFocus className="form--input full" type="text" name="title" id="title" placeholder="What do you need..." required="required" />
      </div>
      <div className="form--group">
        <label className="input--label" htmlFor="toFave">
          <input className="form--input" type="checkbox" name="toFave" id="toFave" defaultChecked={false} />
          <span>Add to favorites</span>
        </label>
      </div>
      <div className="todo--create--actions">
        <button className="todo--add--btn add--btn bold--btn--pink btn--lg" type="submit">Request</button>
        <button className="todo--cancel--btn btn--cancel wire--btn--blue btn--lg" onClick={_handleTodoEnd}>Cancel</button>
      </div>
    </div>
  </Form>
);

export default CreateTodo;
