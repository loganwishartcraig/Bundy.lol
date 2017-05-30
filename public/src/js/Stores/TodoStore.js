import { EventEmitter } from 'events';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging';

import { CacheService } from '../Services/CacheService'

import GroupStore, { GroupDispatchToken } from './GroupStore';

import { AuthConstants } from '../Constants/AuthConstants';
import { ProfileConstants } from '../Constants/ProfileConstants';
import { TodoConstants } from '../Constants/TodoConstants';
import { GroupConstants } from '../Constants/GroupConstants';

class _TodoStore extends EventEmitter {

  constructor() {
    super();

    /**
     * Initial todo state
     */
    this._todos = undefined;    // Array of active todos
    this._isCreating = false;   // Indicates if a todo is being created
    this._showFaves = false;    // Indicates if a todo is being created from favorites
    this._editing = undefined;  // ID of the todo being edited

    /**
     * List of available todo filters
     */
    this._availableFilters = {
      'ALL': () => (true),
      'INCOMPLETE': (todo) => (!todo.completed),
      'COMPLETE': (todo) => (todo.completed)
    }

    this._activeFilter = 'ALL';  // The ID (key) of the active todo filter

  }

  getTodos() {
    return this._todos;
  }


  /**
   * Filters current todos based on active filter
   *
   * @return     { [ Object ] }  The filtered list of todos.
   */
  getFilteredTodos() {
    if (this.hasTodos()) return this._todos.filter(this._availableFilters[this._activeFilter])
  }

  /**
   * Get list of valid filter keys
   *
   * @return     { [ String ] }  The keys of available filters.
   */
  getAvailableFilters() {
    return Object.keys(this._availableFilters);
  }

  getActiveFilterId() {
    return this._activeFilter
  }

  getEditing() {
    return this._editing;
  }

  hasTodos() {
    return (this._todos !== undefined) ? (this._todos.length > 0) : false;
  }

  isCreating() {
    return this._isCreating;
  }

  isShowingFaves() {
    return this._showFaves;
  }

  isEditing() {
    return this._editing !== undefined;
  }

  /**
   * Sets the active list 
   *
   * @param      { [ Object ] }  todos   Array of todo objects
   */
  setTodos(todos) {
    Logger.log('Setting todos', todos)
    this._todos = todos;
  }

  setCreating(creating) {
    if (typeof creating !== 'boolean') return Logger.error("Cannot set non-boolean creating state", creating);
    this._isCreating = creating;
  }

  setShowFaves(show) {
    if (typeof show !== 'boolean') return Logger.error("Cannot set non-boolean showFaves state", show);
    this._showFaves = show;
  }

  setFilter(id) {
    if (this._availableFilters.hasOwnProperty(id)) this._activeFilter = id; 
  }

  setEditing(id) {
    this._editing = id;
  }

  addTodo(todo) {
    this._todos.push(todo)
  }


  /**
   * Updates an existing todo with a fresh todo object
   *
   * @param      {String}  todoId  ID of todo to update
   * @param      {Object}  todo    Todo object to update with
   */
  updateTodo(todoId, todo) {

    if (!this.hasTodos()) return Logger.error("Cannot update todos when no todos are available.")

    /**
     * find matching todo, update and break once found
     */
    for (let i = 0; i < this._todos.length; i++) {
      if (this._todos[i]._id === todoId) {
        this._todos[i] = todo
        return;
      }
    }

    Logger.error(`Couldn't find todo ${todoId} to update.`)
  }

  /**
   * Removes a todo
   *
   * @param      {String}  todoId  ID of the todo to remove
   */
  removeTodo(todoId) {
    if (!this.hasTodos()) return Logger.error("Cannot update the todos when no todos are available")
    this._todos = this._todos.filter((todo) => (todo._id !== todoId))
  }

  /**
   * Resets editing state
   */
  resetEditing() {
    this._editing = undefined;
  }
  
  /**
   * Resets view related state
   */
  resetView() {
    this._isCreating = false;
    this._showFaves = false;
    this._editing = undefined;
  }

  /**
   * Rests full todo state
   */
  reset() {
    this._todos = undefined;
    this._isCreating = false;
    this._showFaves = false;
    this._activeFilter = 'ALL';
    this._editing = undefined;
  }

 

  emitChange() {
    this.emit('change');
  }

  setListener(callback) {
    this.on('change', callback);
  } 

  unsetListener(callback) {
    this.removeListener('change', callback);
  }

  

}

const TodoStore = new _TodoStore();


/**
 * Handles group changes. Used because the todos are populated from a group object.
 *
 */
const handleGroupChange = () => {
  
  AppDispatcher.waitFor([GroupDispatchToken]);

  /**
   * Set todos from active group & set filter if active group availalbe, reset state otherwise
   */
  if (GroupStore.hasActive()) {
    const active = GroupStore.getActiveGroup();
    if (active) {
      TodoStore.setTodos(active.tasks)
      TodoStore.setFilter('ALL')
    }
  } else {
    TodoStore.reset();
  }
}

const TodoDispatchToken = AppDispatcher.register(action => {
// console.warn(action)
  switch(action.type) {

    case AuthConstants.TOKEN_SET:
      handleGroupChange();
      TodoStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVED:
      TodoStore.reset();
      TodoStore.emitChange();
      break;



    /**
     * update active todos on relevant group state changes 
     */
    case ProfileConstants.SET_PROFILE:
      handleGroupChange();
      TodoStore.emitChange();
      break;
    case GroupConstants.SET_GROUPS_FROM_CACHE:
      handleGroupChange();
      TodoStore.emitChange();
      break;
    case GroupConstants.SET_ACTIVE:
      handleGroupChange();
      TodoStore.resetView();
      TodoStore.emitChange();
      break;
    case GroupConstants.ADD_GROUP:
      handleGroupChange();
      TodoStore.emitChange();
      break;
    case GroupConstants.REMOVE_GROUP:
      handleGroupChange();
      TodoStore.emitChange();
      break;
      


    case TodoConstants.ADD_TODO:
      TodoStore.addTodo(action.todo);
      TodoStore.resetView();
      TodoStore.emitChange();
      break;
    case TodoConstants.ADD_AND_FAVE_TODO:
      TodoStore.addTodo(action.todo);
      TodoStore.resetView();
      // change is emitted by user store listening for same action
      // !! -- Should be a better solution
      break;
    case TodoConstants.START_CREATE:
      TodoStore.setCreating(true);
      TodoStore.setShowFaves(false);
      TodoStore.emitChange();
      break;
    case TodoConstants.SHOW_FAVES:
      TodoStore.setShowFaves(true);
      TodoStore.emitChange();
      break;
    case TodoConstants.END_CREATE:
      TodoStore.resetView();
      TodoStore.emitChange();
      break;
    case TodoConstants.UPDATE_TODO:
      TodoStore.updateTodo(action.id, action.todo);
      TodoStore.resetEditing();
      TodoStore.emitChange();
      break;
    case TodoConstants.REMOVE_TODO:
      TodoStore.removeTodo(action.id);
      TodoStore.emitChange();
      break;
    case TodoConstants.SET_FILTER:
      TodoStore.setFilter(action.id);
      TodoStore.emitChange();
      break;
    case TodoConstants.START_EDIT:
      TodoStore.setEditing(action.id);
      TodoStore.emitChange();
      break;
    case TodoConstants.END_EDIT:
      TodoStore.resetEditing();
      TodoStore.emitChange();
      break;
    // case TodoConstants.COMIT_EDIT:
    //   TodoStore.updateTodo(action.id, action.todo);
    //   TodoStore.resetEditing();
    //   TodoStore.emitChange();  
      // break;

    default:
      break;

  }

});


export { TodoDispatchToken }
export default TodoStore;