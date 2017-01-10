import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';

import { GroupConstants } from '../Constants/GroupConstants';
// import { GroupService } from '../Services/GroupService';

import { EventEmitter } from 'events';

class _GroupStore extends EventEmitter {

  constructor() {
    super();
    this._activeGroup = {};
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

  setGroups(groups) {
    console.log("GroupStore -> setGroups() | groups: ", groups, "Setting groups");
    this._groups = groups
  }

  setGroup(id, group) {

    this._groups[id] = group;
    console.log('setGorup', id, group, this._groups)
  }

  setActive(group) {
    this._activeGroup = group
  }

  getActive() {
    return this._activeGroup;
  }

  addGroup(group) {
    console.log('GroupStore -> addGroup() | Adding', group)
    this._groups.push(group);
    console.log(this._groups)
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

  isAdding() {
    return this._isAdding;
  }

}


const GroupStore = new _GroupStore();


AppDispatcher.register(function(action) {

  switch(action.type) {
    // case UserConstants.SET_USER:
    //   console.log('group set user');
    //   break;
    // case UserConstants.UPDATE_USER:
    //   console.log('group update user');
    //   break;
    case GroupConstants.SET_GROUP:

      // console.log('group store setting groups', action.group)
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
    // case GroupStore.UPDATE_GROUPS:
      // GroupStore.updateGroups(action.groups);
    case GroupConstants.SET_GROUPS:
      console.log('setting groups', action.groups)
      GroupStore.setGroups(action.groups);
      GroupStore.emitChange();
      break;
    default:
      break;
  }

});

export { GroupStore };