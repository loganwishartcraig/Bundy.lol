import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';
import { GroupActions } from '../../Actions/GroupActions';

import TodoStore from '../../Stores/TodoStore';
import GroupStore from '../../Stores/GroupStore';
import UserStore from '../../Stores/UserStore';

import AddTodo from './AddTodo.react';
import TodoList from './TodoList.react';
import TodoFilterList from './TodoFilterList.react';


const getTodoState = () => ({

  todos: TodoStore.getFilteredTodos(),
  hasTodos: TodoStore.hasTodos(),
  isCreating: TodoStore.isCreating(),
  showFaves: TodoStore.isShowingFaves(),
  availableFilters: TodoStore.getAvailableFilters(),
  activeFilter: TodoStore.getActiveFilterId(),
  isEditing: TodoStore.isEditing(),
  editingId: TodoStore.getEditing(),
  activeUser: UserStore.getUserId(),
  hasFavorites: UserStore.hasFaves(),
  favorites: UserStore.getFaves()

});

export default class TodoPane extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = getTodoState();

    this._handleTodoChange = this._handleTodoChange.bind(this);
    this._handleManageGroup = this._handleManageGroup.bind(this);
    
  }

  _handleTodoChange(e) {
    this.setState(getTodoState())
  }

  _handleTodoStart(e) {
    TodoActions.startCreate();
  }

  _handleGroupAdd(e) {
    GroupActions.startAdd();
  }

  _handleManageGroup(e) {
    GroupActions.startManage();
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

    if (this.props.ownerId === undefined) {
      return (

      <section className="todo--container flex-col">
        <h3 className="bar--header--pink"><strong>Request Log</strong></h3>
        <div className="no--group--msg">
          <span>You're not a member of any groups yet.<br />Try <button className="empty--req--add light--text--btn" onClick={this._handleGroupAdd}>joining</button> one.</span>
        </div>
      </section>

      )
    }

    return (

      <section className="todo--container flex-col">
      
        <h3 className="bar--header--pink">Request Log - <span className="todo--owner">{this.props.ownerId}</span></h3>

        {(!this.state.isCreating && this.state.hasTodos) ? <TodoFilterList availableFilters={this.state.availableFilters} activeFilter={this.state.activeFilter} /> : null}

        {(this.state.isCreating) ? 
          <AddTodo addTo={this.props.ownerId} showFaves={this.state.showFaves} hasFavorites={this.state.hasFavorites} favorites={this.state.favorites} /> 
            : 
          <TodoList 
            todos={this.state.todos} 
            hasTodos={this.state.hasTodos} 
            userId={this.state.activeUser} 
            isEditing={this.state.isEditing}
            editingId={this.state.editingId}
          />
        }

        {(!this.state.isCreating) ? 
          <div className="todo--add">
            <button className="manage--group--btn wire--btn--blue btn--lg btn--edit" onClick={this._handleManageGroup}>Manage Group</button>
            <button className="todo--add--btn add--btn bold--btn--pink btn--lg" onClick={this._handleTodoStart}>Add Task</button>
          </div>
            : 
          null
        }
      </section>
    )
  }
}