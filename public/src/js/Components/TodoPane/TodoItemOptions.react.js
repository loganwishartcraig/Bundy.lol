import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

const _handleTodoDelete = (todoId) => (evt => {

  TodoActions.deleteTodo(todoId);

});

const _handleTodoEdit = (todoId) => (evt => {

  TodoActions.startEdit(todoId);

});

const TodoItemOptions = ({
  _id,
  completed
}) => (
  <span>
    {(!completed) ? <button onClick={_handleTodoEdit(_id)}>Edit</button> : null} 
    <button onClick={_handleTodoDelete(_id)}>Delete</button>
  </span>
);

export default TodoItemOptions