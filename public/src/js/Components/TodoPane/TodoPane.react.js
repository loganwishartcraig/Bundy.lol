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

/**
 * Gets the todo pane state.
 */
const getTodoState = () => ({

  todos: TodoStore.getFilteredTodos(),                    // { [ Object ] } List of todos
  hasTodos: TodoStore.hasTodos(),                         // {Boolean} Indicates if todos are available
  isCreating: TodoStore.isCreating(),                     // {Boolean} Indicates if user is creating a new todo
  showFaves: TodoStore.isShowingFaves(),                  // {Boolean} Inidcates if user is pushing a todo from favroties
  availableFilters: TodoStore.getAvailableFilters(),      // { [ Object ] } List of available todo filters {id: Function}
  activeFilter: TodoStore.getActiveFilterId(),            // {String} ID of the active filter
  isEditing: TodoStore.isEditing(),                       // {Boolean} Indicates if user is editing a todo
  editingId: TodoStore.getEditing(),                      // {String} ID of the todo being edited
  activeUser: UserStore.getUserId(),                      // {String} ID of the active user
  hasFavorites: UserStore.hasFaves(),                     // {Boolean} Indicates if user has favorites available
  favorites: UserStore.getFaves()                         // { [ Object ] } List of the users favorites {id: String, title: String}

});


/**
 * Component used to display and manage todo-related components
 * Contains todo state propogated down to sub-componetns via props 
 *
 * @class      TodoPane (name)
 */
export default class TodoPane extends Component {

  constructor(props, context) {
    super(props, context);

    /**
     * Get initial state
     */
    this.state = getTodoState();

    this._handleTodoChange = this._handleTodoChange.bind(this);
    this._handleManageGroup = this._handleManageGroup.bind(this);
    
  }

  _handleTodoChange(e) {
    this.setState(getTodoState())
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

  _handleTodoStart(e) {
    TodoActions.startCreate();
  }

  _handleGroupAdd(e) {
    GroupActions.startAdd();
  }

  _handleManageGroup(e) {
    GroupActions.startManage();
  }

  render() {

    /**
     * If no active group, display "empty" message. Prompt user to join group. 
     */
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

        {/* If not creating and has todos, show todo list */}
        {(!this.state.isCreating && this.state.hasTodos) ? <TodoFilterList availableFilters={this.state.availableFilters} activeFilter={this.state.activeFilter} /> : null}

        {/* If creating, show new todo pane, otherwise display todo list */}
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

        {/* If not creating, show todo actions */}
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