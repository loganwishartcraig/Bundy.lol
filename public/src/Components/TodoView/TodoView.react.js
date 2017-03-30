import React, { Component } from 'react';

import { TodoStore } from '../../Stores/TodoStore';
import { GroupStore } from '../../Stores/GroupStore';

import { DisplayActions } from '../../Actions/DisplayActions';

import { TodoFilters } from './TodoFilters.react';
import { TodoList } from './TodoList.react';


const getTodoState = () => ({
  todos: GroupStore.getTodos(),
  aciveGroup: GroupStore.getActiveId(),
  activeFilter: TodoStore.getActiveFilter()
});


class TodoView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = getTodoState();

    this._handleTodoChange = this._handleTodoChange.bind(this);
  }

  _handleTodoChange() {
    // console.log('handling todo change', getTodoState());
    this.setState(getTodoState());
  }

  componentWillMount() {
    TodoStore.setListener(this._handleTodoChange);
    GroupStore.setListener(this._handleTodoChange);
  }

  componentWillUnmount() {
    TodoStore.unsetListener(this._handleTodoChange);
    GroupStore.unsetListener(this._handleTodoChange);
  }

  _handleTodoAdd() {
    DisplayActions.viewTodoAdd();
  }

  render() {
    return(
      <div>
        <div>Todo Pane</div>
        <TodoFilters />
        {(this.state.todos !== undefined && this.state.todos.length > 0) ? (
          <TodoList todos={this.state.todos} groupId={this.state.aciveGroup} />
        ) : (
          <span>No tasks to display :(</span>
        )}
        <br />
        <button onClick={this._handleTodoAdd}>Add Todo</button>
      </div> 
    );
  }

}


export { TodoView };