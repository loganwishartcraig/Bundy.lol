import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';

import { EventEmitter } from 'events';

class _UserStore extends EventEmitter {

  constructor() {
    super();
    this._activeUser = undefined;  
    this.events = {
      change: 'CHANGE'
    }   
  }

  _getProp(prop) {
    return (this.hasUser()) ? this._activeUser[prop] : undefined;
  }

  hasUser() {
    return this._activeUser !== undefined;
  }

  hasGroups() {
    return ((_this.getProp('groups') !== undefined) || (this.getProps('groups').length > 0));
  }

  getUser() {
    return this._activeUser;
  }

  getUsername() {
    return this._getProp('username');
  }

  getId() {
    return this._getProp('id');
  }

  getFullName() {
    return {
      fName: this._getProp('fName'),
      lName: this._getProp('lName')
    }
  }

  getGroups() {
    return this._getProp('groups');
  }

  setUser(user) {
    if (user) {
      this._activeUser = user;
    }
  }

  clearUser() {
    this._activeUser = undefined;
  }

  emitChange() {
    this.emit(this.events.change);
  }

  addListener(callback, event=this.events.change) {
    this.on(event, callback);
  } 

  unsetListener(callback, event=this.events.change) {
    this.removeListener(event, callback);
  }

}

const UserStore = new _UserStore();

AppDispatcher.register(function(action) {

  console.log('Action', action);

  switch(action.type) {
    case UserConstants.SET_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;
    case UserConstants.UPDATE_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
    default:
      break;
  }

});

export { UserStore };