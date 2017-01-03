import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';

import { EventEmitter } from 'events';

class _AuthStore extends EventEmitter {
  
  constructor() {
    super();
  
    this.events = {
      change: 'CHANGE'
    }

    this.authenticated = false;

  }


  setAuth(authenticated) {

    if (!(typeof authenticated === 'boolean')) throw new Error('Tried to set invalid token')

    this.authenticated = authenticated

  }

  removeAuth() {

    this.authenticated = false;

  }

  hasAuth() {
    return this.authenticated
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


};

const AuthStore = new _AuthStore();

AppDispatcher.register(function(action) {

  switch (action.type) {

    case AuthConstants.SET_AUTH:
      AuthStore.setAuth(action.authenticated);
      AuthStore.emitChange();
      break;
    case AuthConstants.CLEAR_TOKEN:
      AuthStore.clearToken();
      AuthStore.emitChange();
      break;
    default:
      break;

  }

}); 


export { AuthStore };