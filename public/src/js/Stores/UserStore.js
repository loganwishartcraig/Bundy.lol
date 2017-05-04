import { EventEmitter } from 'events';
import Logger from '../Utility/Logging';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { CacheService } from '../Services/CacheService';

import { UserActions } from '../Actions/UserActions';

import { AuthConstants } from '../Constants/AuthConstants';
import { ProfileConstants } from '../Constants/ProfileConstants';
import { UserConstants } from '../Constants/UserConstants';
import { GroupConstants } from '../Constants/GroupConstants';

// import GroupStore, { GroupDispatchToken } from '../Stores/GroupStore';

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

  hasUser() {
    // console.warn(this._user)
    return this._user !== undefined
  }

  reset() {
    this._user = undefined;
    this.clearCache();
  }

  // addGroup(group) {
  //   if (this.hasUser) this._user.memberOf.push(group);
  // }

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
      UserStore.setFromCache()
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

    // case UserConstants.SET_USER_FROM_CACHE:
    //   UserStore.setFromCache()
    //   UserStore.emitChange();
    //   break;

    case UserConstants.SET_USER:
      UserStore.setUser(action.user);
      UserStore.emitChange();
      break;    
    
    // case GroupConstants.ADD_GROUP:
    //   UserStore.addGroup(action.group);
    //   UserStore.emitChange();
    //   break;

    default:
      break;

  }

});

export default UserStore;