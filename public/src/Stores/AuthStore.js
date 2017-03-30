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

  setAuth(authenticated = false) {

    if (!(typeof authenticated === 'boolean')) throw new Error('Tried to set invalid token')

    this.authenticated = authenticated

  }

  hasAuth() {
    return this.authenticated
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


};

const AuthStore = new _AuthStore();

AppDispatcher.register(function(action) {

  switch (action.type) {

    case AuthConstants.TOKEN_SET:
      AuthStore.setAuth(action.authenticated);
      AuthStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVED:
      console.warn('removing token', action)
      AuthStore.setAuth(action.authenticated);
      AuthStore.emitChange();
      break;
    default:
      break;

  }

}); 


export { AuthStore };