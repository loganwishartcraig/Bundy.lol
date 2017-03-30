import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { TodoConstants } from '../Constants/TodoConstants';

// import { GroupStore } from '../Stores/GroupStore';
import { GroupConstants } from '../Constants/GroupConstants';


import { EventEmitter } from 'events';

class _TodoStore extends EventEmitter {

  constructor(){
    super();

    this._activeFilter = (todo) => true;
    // this._isEditing = false;
    // this._addingFromFavorites = false;

    this.events = {
      change: 'CHANGE'
    };

  }

  getActiveFilter() {
    return this._activeFilter;
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

    case TodoConstants.SET_FILTER:
      TodoStore.setFilter(action.filterFunc);
      TodoStore.emitChange();
      break;
    default:
      break;

  }

})

export { TodoStore };