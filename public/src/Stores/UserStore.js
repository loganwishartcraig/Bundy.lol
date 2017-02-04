import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { GroupConstants } from '../Constants/GroupConstants';

import { EventEmitter } from 'events';

class _UserStore extends EventEmitter {

  constructor() {
    super();
    this._activeUser = undefined;  
    this.events = {
      change: 'CHANGE'
    }   
  }

  // _getProp(prop) {
  //   return (this.hasUser()) ? this._activeUser[prop] : undefined;
  // }

  hasUser() {
    return this._activeUser !== undefined;
  }

  hasGroups() {
    return ((_this.getProp('groups') !== undefined) || (this.getProps('groups').length > 0));
  }

  getUser() {
    return this._activeUser;
  }

  // getUsername() {
  //   return this._getProp('username');
  // }

  // getId() {
  //   return this._getProp('id');
  // }

  // getFullName() {
  //   return {
  //     fName: this._getProp('fName'),
  //     lName: this._getProp('lName')
  //   }
  // }

  // getGroups() {
  //   return this._getProp('groups');
  // }

  setUser(user) {
    if (user) {
      this._activeUser = user;
    }
  }

  addGroup(group) {
    if (this.hasUser()) this._activeUser.memberOf.push(group);
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
    // case GroupConstants.ADD_GROUP:
    //   UserStore.addGroup(action.group);
    //   UserStore.emitChange();


    default:
      break;
  }

});

export { UserStore };