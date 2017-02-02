import React, { Component } from 'react';

import { TodoStore } from '../../Stores/TodoStore';

import { TodoFilters } from './TodoFilters.react';
import { TodoList } from './TodoList.react';

const getTodoState = () => ({
  todos: TodoStore.getFilteredTodos()
});


class TodoView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = getTodoState();

    this._handleTodoChange = this._handleTodoChange.bind(this);
  }

  _handleTodoChange() {
    console.log('handling todo change', getTodoState());
    this.setState(getTodoState());
  }

  componentWillMount() {
    TodoStore.setListener(this._handleTodoChange);
  }

  componentWillUnmount() {
    TodoStore.unsetListener(this._handleTodoChange);
  }

  render() {
    return(
      <div>
        <div>Todo Pane</div>
        <TodoFilters />
        <TodoList todos={this.state.todos} />
      </div> 
    );
  }

}


export { TodoView };