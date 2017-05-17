import { EventEmitter } from 'events';
import Logger from '../Utility/Logging';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { CacheService } from '../Services/CacheService';

import { UserActions } from '../Actions/UserActions';

import { AuthConstants } from '../Constants/AuthConstants';
import { ProfileConstants } from '../Constants/ProfileConstants';
import { UserConstants } from '../Constants/UserConstants';
import { GroupConstants } from '../Constants/GroupConstants';
import { TodoConstants } from '../Constants/TodoConstants'

import { AuthDispatchToken } from './AuthStore';
import { TodoDispatchToken } from './TodoStore';

class _UserStore extends EventEmitter {

  constructor() {
    super();

    this._cacheKey = 'user'
    this._user = undefined;

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

  setFromCache() {

    if (this.hasUser()) return;

    let cached = CacheService.get(this._cacheKey);
    if (cached !== undefined) this._user = cached;
  }

  syncCache() {
    CacheService.cache(this._cacheKey, this._user);
  }

  clearCache() {
    CacheService.remove(this._cacheKey);
  }

  setUser(user) {
    Logger.log('Setting user...', user.email);
    this._user = user;
    this.syncCache();
  }

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

  removeFave(faveId) {
    this._user.favorites = this._user.favorites.filter(favorite => console.log(favorite.id !== faveId));
    this.syncCache();
  }

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

AppDispatcher.register(action => {

  switch(action.type) {


    case AuthConstants.TOKEN_SET:
      // UserStore.setFromCache();
      (action.user) ? UserStore.setUser(action.user) : UserStore.setFromCache();
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

    case TodoConstants.ADD_AND_FAVE_TODO:
      AppDispatcher.waitFor([TodoDispatchToken]);
      UserStore.addFavorite(action.toFave)
      UserStore.emitChange();
      break;
  


    default:
      break;

  }

});



export default UserStore;