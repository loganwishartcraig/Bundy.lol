import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import TodoItem from './TodoItem.react';
import TodoFilterList from './TodoFilterList.react';
import TodoItemEditing from './TodoItemEditing.react';

const _handleTodoAdd = () => {
  TodoActions.startCreate();
}


const TodoList = ({
  todos,
  hasTodos,
  userId,
  isEditing,
  editingId
}) => (

  
    <ul className={(hasTodos) ? "todo--list" : "todo--list empty"}>

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
