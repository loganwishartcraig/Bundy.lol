import { EventEmitter } from 'events';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserDispatchToken } from './UserStore';
import { GroupDispatchToken } from './GroupStore';
import { TodoDispatchToken } from './TodoStore';

import Logger from '../Utility/Logging'

import { CacheService } from '../Services/CacheService';

import { AuthConstants } from '../Constants/AuthConstants';

class _AuthStore extends EventEmitter {

  constructor() {
    super();

    // this._cacheKey = 'auth'
    
    /**
     * Initial authentication state
     * 
     * !! -- Try setting to true?
     * 
     */
    this._authenticated = false;    // Should be set to a boolean indicating if auth AJAX headers have been set
  }
  

  /**
   * Retrieves application auth state
   *
   * @return     {boolean}  True if has auth, False otherwise.
   */
  hasAuth() {
    return this._authenticated;
  }


  /**
   * Sets the application auth state
   *
   * @param      {Boolean}  authenticated  Authentication state
   */
  setAuth(authenticated) {
    if (typeof authenticated !== 'boolean') Logger.error("Can't set auth state to non-boolean value", authenticated)
    this._authenticated = authenticated
  }

  /**
   * Event actions for subscribing functions
   */
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