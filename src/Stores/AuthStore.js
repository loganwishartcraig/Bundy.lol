import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';

import * as axios from 'axios'


import { EventEmitter } from 'events';

class _AuthStore extends EventEmitter {
  
  constructor() {
    super();
  
    this.events = {
      change: 'CHANGE'
    }

  }

  _setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = token;
  }

  _removeAuthHeader() {
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  setToken(token) {

    if (!(typeof token === 'string')) throw new Error('Tried to set invalid token')
    if (token.length === 0) throw new Error('Tried to set an empty token');

    this._setAuthHeader(token)

  }

  removeCredentials() {

    this._removeAuthHeader();

  }

  hasAuth() {
    return (axios.defaults.headers.common['Authorization']) ? true : false;
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

    case AuthConstants.SET_TOKEN:
      AuthStore.setToken(action.token);
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