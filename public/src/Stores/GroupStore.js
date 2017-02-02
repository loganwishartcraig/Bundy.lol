import { AppDispatcher } from '../Dispatcher/AppDispatcher';


import { UserConstants } from '../Constants/UserConstants';
import { GroupConstants } from '../Constants/GroupConstants';
// import { GroupService } from '../Services/GroupService';

import { EventEmitter } from 'events';

class _GroupStore extends EventEmitter {

  constructor() {
    super();


    // change to str 'name' reference
    this._activeGroup = undefined;

    // change to {}
    this._groups = {};

    this.events = {
      change: 'CHANGE'
    }
  }


  getGroups() {
    return this._groups;
  }

  // refreshActive() {

  //   this._activeGroup

  // }

  setGroups(groups) {
    console.log('GroupStore -> setGroups() | groups: ', groups, 'Setting groups');

    groups.forEach(group => {
      this._groups[group.name] = group;
    });
  }

  setGroup(id, group) {

    console.log('GroupStore -> setGroup() | groups: ", groups, "Setting groups', id, group, this._groups);
    this._groups[id] = group;

  }

  // _setActive(groupName) {
  //   console.log('GroupStore -> _setActive() | Setting active', group);
  //   this._activeGroup = groupName;
  // }

  setActive(groupName) {
    this._activeGroup = groupName;
  }

  getActive() {
    return this._groups[this._activeGroup];
  }

  hasActive() {
    return (this._activeGroup !== undefined)
  }

  hasGroups() {
    return Object.keys(this._groups).length > 0;
  }

  addGroup(group) {
    console.log('GroupStore -> addGroup() | Adding', group)
    this._groups[group.name] = group;
  }

  resetGroups() {
    this._activeGroup = undefined;
    this._groups = {};
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

  isAdding() {
    return this._isAdding;
  }

}


const GroupStore = new _GroupStore();


AppDispatcher.register(function(action) {

  switch(action.type) {
    
    // case UserConstants.SET_USER:
    //   if (action.user) GroupStore.setGroups(action.user.memberOf);
    //   else GroupStore.clearGroups();
    //   GroupStore.emitChange();
    //   break;
    case GroupConstants.SET_GROUP:
      GroupStore.setGroup(action.group.id, action.group);
      GroupStore.emitChange();
      break;
    case GroupConstants.SET_ALL:
      GroupStore.setGroups(action.groups);
      GroupStore.emitChange();
      break;
    case GroupConstants.SET_ACTIVE:
      GroupStore.setActive(action.name);
      GroupStore.emitChange();
      break;
    case GroupConstants.ADD_GROUP:
      GroupStore.addGroup(action.group);
      GroupStore.emitChange();
      break;
    case GroupConstants.SET_GROUPS:
      GroupStore.setGroups(action.groups);
      GroupStore.emitChange();
      break;
    case GroupConstants.RESET_GROUPS:
      GroupStore.resetGroups()
      GroupStore.emitChange();
      break;
    default:
      break;
  }

});

export { GroupStore };