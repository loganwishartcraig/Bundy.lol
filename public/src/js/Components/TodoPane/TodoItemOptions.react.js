import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

const _handleTodoDelete = (todoId) => (evt => {
  TodoActions.deleteTodo(todoId);
});

const _handleTodoEdit = (todoId) => (evt => {
  TodoActions.startEdit(todoId);
});


/**
 * Displays option action buttons for a todo
 *
 * @class      TodoItemOptions (name)
 * @param      {Object}  arg1            Component expected prop
 * @param      {String}  arg1._id        ID of the todo
 * @param      {Boolean}  arg1.completed  Complete status
 * @return     {Object}  Component
 */
const TodoItemOptions = ({
  _id,
  completed
}) => (
  <span className="todo--options">
    {(!completed) ? <button className="text--btn--grey btn--edit" onClick={_handleTodoEdit(_id)}>Edit</button> : null} 
    <button className="text--btn--grey btn--delete" onClick={_handleTodoDelete(_id)}>Delete</button>
  </span>
);

export default TodoItemOptions