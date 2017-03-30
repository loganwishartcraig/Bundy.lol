import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { AuthConstants } from '../Constants/AuthConstants';
import { GroupConstants } from '../Constants/GroupConstants';
import { TodoConstants } from '../Constants/TodoConstants';

import { UserService } from '../Services/UserService';

import { EventEmitter } from 'events';

class _UserStore extends EventEmitter {

  constructor() {
    super();
    this._activeUser = undefined;  
    this.events = {
      change: 'CHANGE'
    }   
  }

  hasUser() {
    return this._activeUser !== undefined;
  }

  getUser() {
    return this._activeUser;
  }

  reset() {
    this._activeUser = undefined;
  }

  _updateCached(user) {
      UserService.storeUser(user);
  }

  setUser(user) {
    if (user) {
      this._activeUser = user;
    }
  }

  addGroup(group) {
    if (this.hasUser()) {
      this._activeUser.memberOf.push(group);
      this._updateCached(this._activeUser);
    };
  }

  addTodo(todo) {
    if (this.hasUser()) {
      if (this._activeUser.memberOf[todo.groupId] !== undefined) this._activeUser.memberOf[todo.groupId].push(todo)
    }
  }

  clearUser() {
    this._activeUser = undefined;
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

}

const UserStore = new _UserStore();

AppDispatcher.register(function(action) {

  console.log('ACTION:', action);

  switch(action.type) {
    
    case AuthConstants.TOKEN_SET:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVE:
      UserStore.reset();
      UserStore.emitChange();
      break;

    case UserConstants.INIT_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;
    case UserConstants.SET_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;
    case UserConstants.UPDATE_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;

    case GroupConstants.ADD_GROUP:
      UserStore.addGroup(action.group);
      UserStore.emitChange();
      break;

    case TodoConstants.ADD_TODO:
      UserStore.addTodo(action.todo);
      UserStore.emitChange();
      break;

    default:
      break;
  }

});

export { UserStore };