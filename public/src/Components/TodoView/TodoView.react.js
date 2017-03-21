import React, { Component } from 'react';

import { TodoStore } from '../../Stores/TodoStore';
import { GroupStore } from '../../Stores/GroupStore';

import { DisplayActions } from '../../Actions/DisplayActions';

import { TodoFilters } from './TodoFilters.react';
import { TodoList } from './TodoList.react';


const getTodoState = () => ({
  todos: TodoStore.getFilteredTodos(),
  aciveGroup: GroupStore.getActiveId()
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

  _handleTodoAdd() {
    DisplayActions.viewTodoAdd();
  }

  render() {
    return(
      <div>
        <div>Todo Pane</div>
        <TodoFilters />
        <TodoList todos={this.state.todos} groupId={this.state.aciveGroup} />
        <button onClick={this._handleTodoAdd}>Add Todo</button>
      </div> 
    );
  }

}


export { TodoView };