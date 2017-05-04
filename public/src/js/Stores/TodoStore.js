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

    this._todos = undefined;
    this._isCreating = false;
    this._editing = undefined;

    this._availableFilters = {
      'ALL': () => (true),
      'COMPLETE': (todo) => (todo.completed),
      'INCOMPLETE': (todo) => (!todo.completed)
    }
    this._activeFilter = 'ALL';


  }

  getTodos() {
    return this._todos;
  }

  getFilteredTodos() {
    if (this.hasTodos()) return this._todos.filter(this._availableFilters[this._activeFilter])
  }

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

  isEditing() {
    return this._editing !== undefined;
  }

  setTodos(todos) {
    Logger.log('Setting todos', todos)
    this._todos = todos;
  }

  setCreating(creating) {
    if (typeof creating !== 'boolean') return Logger.error("Cannot set non-boolean creating state", creating);
    this._isCreating = creating;
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

  
  reset() {
    this._todos = undefined;
    this._isCreating = false;
    this._activeFilter = 'ALL';
    this._editing = undefined;
  }

  resetEditing() {
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

  updateTodo(todoId, todo) {
    if (!this.hasTodos()) return Logger.error("Cannot update todos when no todos are available.")

    for (let i = 0; i < this._todos.length; i++) {
      if (this._todos[i]._id === todoId) {
        this._todos[i] = todo
        return;
      }
    }

    Logger.error(`Couldn't find todo ${todoId} to update.`)
  }

  removeTodo(todoId) {
    if (!this.hasTodos()) return Logger.error("Cannot update the todos when no todos are available")

    this._todos = this._todos.filter((todo) => (todo._id !== todoId))
  }

}

const TodoStore = new _TodoStore();

const handleGroupChange = () => {
  AppDispatcher.waitFor([GroupDispatchToken]);

  if (GroupStore.hasActive()) {
    let active = GroupStore.getActiveGroup();
    if (active) {
      TodoStore.setTodos(active.tasks)
      TodoStore.setFilter('ALL')
    }
  } else {
    TodoStore.reset();
  }
}

const TodoDispatchToken = AppDispatcher.register(action => {

  switch(action.type) {

    case AuthConstants.TOKEN_SET:
      handleGroupChange();
      TodoStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVED:
      TodoStore.reset();
      TodoStore.emitChange();
      break;

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
      TodoStore.setCreating(false);
      TodoStore.emitChange();
      break;
    case TodoConstants.START_CREATE:
      TodoStore.setCreating(true);
      TodoStore.emitChange();
      break;
    case TodoConstants.END_CREATE:
      TodoStore.setCreating(false);
      TodoStore.emitChange();
      break;
    case TodoConstants.UPDATE_TODO:
      TodoStore.updateTodo(action.id, action.todo);
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
    case TodoConstants.COMIT_EDIT:
      TodoStore.updateTodo(action.id, action.todo);
      TodoStore.resetEditing();
      TodoStore.emitChange();  
      break;

    default:
      break;

  }

})


export { TodoDispatchToken }
export default TodoStore;