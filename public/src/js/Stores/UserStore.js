import { EventEmitter } from 'events';
import Logger from '../Utility/Logging';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { CacheService } from '../Services/CacheService';

import { AuthConstants } from '../Constants/AuthConstants';
import { ProfileConstants } from '../Constants/ProfileConstants';
import { UserConstants } from '../Constants/UserConstants';
import { TodoConstants } from '../Constants/TodoConstants'

import { TodoDispatchToken } from './TodoStore';

class _UserStore extends EventEmitter {

  constructor() {
    super();


    /**
     * Key used for caching purposes
     */
    this._cacheKey = 'user';

    /**
     * Initial user state
     */
    this._user = undefined;   // The active user object

  }

  getUser() {
    return this._user;
  }

  getUserId() {
    if (!this.hasUser()) return undefined;
    return this._user._id;
  }

  getFaves() {
    if (!this.hasUser()) return [];
    return this._user.favorites
  }


  /**
   * Sets the user state from cache if not already set
   */
  setFromCache() {

    if (this.hasUser()) return;

    const cached = CacheService.get(this._cacheKey);
    if (cached !== undefined) this._user = cached;
  }


  /**
   * Used to cache current state.
   */
  syncCache() {
    CacheService.cache(this._cacheKey, this._user);
  }

  clearCache() {
    CacheService.remove(this._cacheKey);
  }

  /**
   * Sets the current user
   *
   * @param      {Object}  user    The user object to set
   */
  setUser(user) {
    this._user = user;
    this.syncCache();
  }


  /**
   * Adds an entry to a users favorite list
   *
   * @param      {Object}  fave    Favorite to add
   */
  addFavorite(fave) {
    this._user.favorites.push(fave);
    this.syncCache();
  }

  hasUser() {
    return this._user !== undefined
  }

  hasFaves() {
    if (!this.hasUser()) return false;
    return this._user.favorites.length > 0
  }


  /**
   * Removes an entry from the users favorite list
   *
   * @param      {String}  faveId  ID of the favorite to remove
   */
  removeFave(faveId) {
    this._user.favorites = this._user.favorites.filter(favorite => favorite.id !== faveId);
    this.syncCache();
  }

  /**
   * Resets user state and clears cache entry 
   */
  reset() {
    this._user = undefined;
    this.clearCache();
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

}

const UserStore = new _UserStore();

const UserDispatchToken = AppDispatcher.register(action => {

  console.warn('ACTION RECIEVED:', action)

  switch(action.type) {

    /**
     * On token set, set user from action if available, otherwise set from cache.
     */
    case AuthConstants.TOKEN_SET:
      (action.user !== undefined) ? UserStore.setUser(action.user) : UserStore.setFromCache()
      UserStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVED:
      UserStore.reset();
      UserStore.emitChange();
      break;

    case ProfileConstants.SET_PROFILE:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;

    case UserConstants.SET_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;    
    case UserConstants.REMOVE_FAVE:
      UserStore.removeFave(action.faveId);
      UserStore.emitChange();
      break;

      /**
       * On todo favorite add, wait for todo to update then add favorite and emit cahgne
       * 
       * !! -- REWORK
       */
    case TodoConstants.ADD_AND_FAVE_TODO:
      AppDispatcher.waitFor([TodoDispatchToken]);
      UserStore.addFavorite(action.toFave)
      UserStore.emitChange();
      break;
  


    default:
      break;

  }

});


export { UserDispatchToken };
export default UserStore;