import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';
import TodoStore from '../../Stores/TodoStore';
import GroupStore from '../../Stores/GroupStore';
import UserStore from '../../Stores/UserStore';

import CreateTodo from './CreateTodo.react';
import TodoList from './TodoList.react';
import TodoFilterList from './TodoFilterList.react';


const getTodoState = () => ({

  todos: TodoStore.getFilteredTodos(),
  hasTodos: TodoStore.hasTodos(),
  isCreating: TodoStore.isCreating(),
  availableFilters: TodoStore.getAvailableFilters(),
  activeFilter: TodoStore.getActiveFilterId(),
  isEditing: TodoStore.isEditing(),
  editingId: TodoStore.getEditing(),
  ownerId: GroupStore.getActiveName(),
  activeUser: UserStore.getUserId()

});

export default class TodoPane extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = getTodoState();

    this._handleTodoChange = this._handleTodoChange.bind(this)
  }

  _handleTodoChange(e) {
    this.setState(getTodoState())
  }

  _handleTodoStart(e) {
    TodoActions.startCreate();
  }

  _handleTodoEnd(e) {
    TodoActions.endCreate();
  }

  componentWillMount() {
    Logger.log('<TodoPane /> mounting', this.state)
    TodoStore.setListener(this._handleTodoChange)
    UserStore.setListener(this._handleTodoChange)
  }

  componentWillUnmount() {
    TodoStore.unsetListener(this._handleTodoChange)
    UserStore.unsetListener(this._handleTodoChange)
  }

  render() {
    return (

      <section className="todo--container">
      
        <header className="todo--header"><strong>Request Log</strong> - {this.state.ownerId}</header>

        {(this.state.hasTodos && !this.state.isCreating) ? <TodoFilterList availableFilters={this.state.availableFilters} activeFilter={this.state.activeFilter} /> : null}

        {(this.state.isCreating) ? 
          <CreateTodo addTo={this.state.ownerId} /> 
            : 
          <TodoList 
            todos={this.state.todos} 
            hasTodos={this.state.hasTodos} 
            userId={this.state.activeUser} 
            isEditing={this.state.isEditing}
            editingId={this.state.editingId}
          />
        }
        {(this.state.ownerId !== undefined) ? 
          <div className="todo--add">
            <button className="todo--add--btn" onClick={(this.state.isCreating) ? this._handleTodoEnd : this._handleTodoStart}>{(this.state.isCreating) ? 'Cancel' : 'Add Task'}</button>
          </div>
            : 
          null
        }
      </section>
    )
  }
}