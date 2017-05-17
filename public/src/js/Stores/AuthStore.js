import { EventEmitter } from 'events';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { CacheService } from '../Services/CacheService';

import { AuthConstants } from '../Constants/AuthConstants';

class _AuthStore extends EventEmitter {

  constructor() {
    super();
    this._authenticated = false;
    this._cacheKey = 'auth'
  }
  
  hasAuth() {
    return this._authenticated;
  }

  setAuth(authenticated) {
    if (typeof authenticated !== 'boolean') Logger.error("Can't set auth state to non-boolean value", authenticated)
    this._authenticated = authenticated
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

};

const AuthStore = new _AuthStore();

const AuthDispatchToken = AppDispatcher.register(action => {

  switch(action.type) {

    case AuthConstants.TOKEN_SET:
      AuthStore.setAuth(true);
      AuthStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVED:
      AuthStore.setAuth(false);
      AuthStore.emitChange();
      break;
    default:
      break;

  }

}); 

export { AuthDispatchToken }

export default AuthStore;