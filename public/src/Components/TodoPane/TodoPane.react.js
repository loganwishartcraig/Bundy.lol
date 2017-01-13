import React, { Component } from 'react';

import { TodoStore } from '../../Stores/TodoStore';

import { TodoFilterList } from './TodoFilterList/TodoFilterList.react';
import { TodoList } from './TodoList.react';

const getTodoState = () => ({
  todos: TodoStore.getFilteredTodos()
});


class TodoPane extends Component {

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
        <TodoFilterList />
        <TodoList todos={this.state.todos} />
      </div> 
    );
  }

}


export { TodoPane };