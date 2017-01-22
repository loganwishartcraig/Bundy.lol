import { AppDispatcher } from '../Dispatcher/AppDispatcher';


import { UserConstants } from '../Constants/UserConstants';
import { GroupConstants } from '../Constants/GroupConstants';
// import { GroupService } from '../Services/GroupService';

import { EventEmitter } from 'events';

class _GroupStore extends EventEmitter {

  constructor() {
    super();
    this._activeGroup = undefined;
    this._groups = [];
    this._isAdding = false;

    this.events = {
      change: 'CHANGE'
    }
  }


  // updateGroups(groups) {

  //   groups

  // }

  getGroups() {
    return this._groups;
  }

  refreshActive() {
    for (let i = 0; i < this._groups.length; i++)
      if (this._groups[i].name === this._activeGroup.name) {
        console.log('GroupStore -> refreshActive() | Refreshing Active', this._groups[i].name)
        this._setActive(this._groups[i]);
      }
  }

  setGroups(groups) {
    console.log('GroupStore -> setGroups() | groups: ', groups, 'Setting groups');
    this._groups = groups;

    if (this.hasActive()) this.refreshActive();
  }

  setGroup(id, group) {

    console.log('GroupStore -> setGroup() | groups: ", groups, "Setting groups', id, group, this._groups);
    this._groups[id] = group;

  }

  _setActive(group) {
    console.log('GroupStore -> _setActive() | Setting active', group);
    this._activeGroup = group;
  }

  setActive(group) {
    this._activeGroup = group
  }

  getActive() {
    return this._activeGroup;
  }

  hasActive() {
    return (this._activeGroup !== undefined)
  }

  addGroup(group) {
    console.log('GroupStore -> addGroup() | Adding', group)
    this._groups.push(group);
  }

  clearGroups() {
    this._groups = [];
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
      GroupStore.setActive(action.group);
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
    
    default:
      break;
  }

});

export { GroupStore };