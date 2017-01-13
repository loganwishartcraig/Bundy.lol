import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { TodoConstants } from '../Constants/TodoConstants';

import { GroupStore } from '../Stores/GroupStore';
import { GroupConstants } from '../Constants/GroupConstants';


import { EventEmitter } from 'events';

class _TodoStore extends EventEmitter {

  constructor(){
    super();
    this._todos = [];
    this._isEditing = false;
    this._addingFromFavorites = false;
    this._activeFilter = (todo) => true;

    this.events = {
      change: 'CHANGE'
    };

  }

  getTodos() {
    return this._todos;
  }

  getFilteredTodos() {
    if (!this._activeFilter instanceof Function) return this._todos;
    return this._todos.filter(this._activeFilter);
  }

  setTodos(todos = []) {
    this._todos = todos;
  }

  resetFilter() {
    this._activeFilter = () => true
  }

  setFilter(filterFunc = (todo) => true) {
    if (filterFunc instanceof Function) this._activeFilter = filterFunc;
  }

  emitChange() {
    this.emit(this.events.change);
  }

  setListener(callback, event=this.events.change) {
    this.on(event, callback);
  } 

  unsetListener(callback, event=this.events.change) {
    this.removeListener(event, callback);
  }

  toggleComplete(id) {
    console.log('Todo store complete', id)
  }

}

const TodoStore = new _TodoStore();

AppDispatcher.register(function(action) {

  switch(action.type) {

    case GroupConstants.SET_ACTIVE:
      TodoStore.setTodos(action.group.todos);
      TodoStore.resetFilter();
      TodoStore.emitChange();
      break;
    case TodoConstants.SET_FILTER:
      TodoStore.setFilter(action.filterFunc);
      TodoStore.emitChange();
      break;
    case TodoConstants.TOGGLE_COMPLETE:
      TodoStore.toggleComplete(action.id);
      TodoStore.emitChange();
      break;
    default:
      break;

  }

})

export { TodoStore }