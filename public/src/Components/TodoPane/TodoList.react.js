import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';

import { TodoItem } from './TodoItem.react';



const _toggleComplete = (id) => {

  TodoActions.toggleComplete(id);

};

export const TodoList = ({
  todos
}) => (

  <ul>

    {todos.map(todo => (
        <TodoItem 
          toggleHandler={_toggleComplete} 
          key={todo.id} 
          todo={todo} 
        />
    ))}

  </ul>

)