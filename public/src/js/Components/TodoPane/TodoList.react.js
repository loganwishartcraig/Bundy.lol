import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import TodoItem from './TodoItem.react';
import TodoFilterList from './TodoFilterList.react';
import TodoItemEditing from './TodoItemEditing.react';

const _handleTodoAdd = () => {
  TodoActions.startCreate();
}



/**
 * Component populates a new todo item for each todo in a given list
 *
 * @class      TodoList (name)
 * @param      {Object}  arg1            Component props
 * @param      { [ Object ] }  arg1.todos      List of todo objects
 * @param      {Boolean}  arg1.hasTodos   Indicates if todos are available
 * @param      {String}  arg1.userId     Users ID
 * @param      {Boolean}  arg1.isEditing  Indicates if user is editing a todo editing
 * @param      {String}  arg1.editingId   ID of the todo being edited
 * @return     {Object}  TodoList component
 */
const TodoList = ({
  todos,
  hasTodos,
  userId,
  isEditing,
  editingId
}) => (

  
    <ul className={(hasTodos) ? "todo--list" : "todo--list empty"}>

      {/* Displays todo items if has todos, 'empty' message if not */} 
      {(hasTodos) ?  

        todos.sort((a, b) => (
        
          (!a.completed && b.completed) ? 
            -1
          :
            new Date(b.dateCreated) - new Date(a.dateCreated)
        
        )).map((todo, i) => ( 

          (editingId === todo._id) ? 
            <TodoItemEditing key={i} userId={userId} text={todo.title} todoId={todo._id} userId={userId} /> 
              : 
            <TodoItem key={i} userId={userId} {...todo} />)
          )
      :
        <li>No pending tasks... <br/> You should <button onClick={_handleTodoAdd} className="empty--req--add light--text--btn">add</button> some</li>
      }

    </ul>

);

export default TodoList
