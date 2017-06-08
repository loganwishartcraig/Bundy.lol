import React, { Component } from 'react';
import Logger from '../../Utility/Logging';


import { TodoActions } from '../../Actions/TodoActions';

import TodoItemOptions from './TodoItemOptions.react';


/**
 * Handles formatting the request date
 *
 * @param      {String}    date    String representing a date
 * @return     {String}  String representing 'm/d'
 */
const formatRequestDate = date => {
  date = new Date(date);
  return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
} 

/**
 * Contains an action button, meta info, and an options menu
 * for a given todo
 *
 * @class      TodoItem (name)
 * @param      {Object}  arg1                Component props
 * @param      {String}  arg1.userId         User ID
 * @param      {String}  arg1._id            Todo ID
 * @param      {Boolean}  arg1.completed      Indicates if todo is complete
 * @param      {Function}  arg1.onComplete     Called when complete button is clicked
 * @param      {String}  arg1.title          Todo title text
 * @param      {String}  arg1.dateCompleted  The date completed
 * @param      {Object}  arg1.completedBy    The "completed by" user info
 * @param      {String}  arg1.dateCreated    The date todo was created
 * @param      {Object}  arg1.createdBy      The "created by" user info
 * @return     {<type>}  React component
 */
const TodoItem = ({
  userId,
  _id,
  completed,
  onComplete,
  title,
  dateCompleted,
  completedBy,
  dateCreated,
  createdBy
}) => (

  <li className={(completed) ? 'todo--item complete' : 'todo--item'} >

    {/* Action button */}
    {(completed) ? 
      <button className="todo--complete--btn wire--btn--pink btn--md" type="button" disabled="disabled">Gotten</button> 
    : 
      <button className="todo--complete--btn wire--btn--pink btn--md" onClick={onComplete}>I've Got It</button> 
    } 

    {/* Todo info */}
    <span className="todo--meta">
      <span className="todo--title" title={title}>{title}</span>

      {(completed) ? 
        <em className="todo--request">Completed on {formatRequestDate(dateCompleted)} by {(completedBy._id === userId) ? 'you' : completedBy.name}</em>
        : 
        <em className="todo--request">Requested on {formatRequestDate(dateCreated)} by {(createdBy._id === userId) ? 'you' : createdBy.name}</em>
      }
    </span>

    {/* Options menu, only displayed if owned by user */}
    {(userId === createdBy._id) ? <TodoItemOptions id={_id} completed={completed} /> : null}
    
  </li>

);

export default TodoItem; 
