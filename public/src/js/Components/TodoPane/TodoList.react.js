import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import TodoItem from './TodoItem.react';
import TodoFilterList from './TodoFilterList.react';
import TodoItemEditing from './TodoItemEditing.react';


const TodoList = ({
  todos,
  hasTodos,
  userId,
  isEditing,
  editingId
}) => (


    <ul className={(hasTodos) ? "todo--list" : "todo--list empty"}>

      {(hasTodos) ?  
        todos.map((todo, i) => ( (editingId === todo._id) ? <TodoItemEditing key={i} userId={userId} text={todo.title} todoId={todo._id} userId={userId} /> : <TodoItem key={i} userId={userId} {...todo} />) )
      :
        <li>No pending tasks.</li>
      }

    </ul>

);

export default TodoList
