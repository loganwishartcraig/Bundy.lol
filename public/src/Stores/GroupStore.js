import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { GroupService } from '../Services/GroupService';

import { AuthConstants } from '../Constants/AuthConstants';
import { UserConstants } from '../Constants/UserConstants';
import { GroupConstants } from '../Constants/GroupConstants';
import { TodoConstants } from '../Constants/TodoConstants';

import { EventEmitter } from 'events';

class _GroupStore extends EventEmitter {

  constructor() {
    super();

    this._groups = {};
    this._activeGroup = undefined;

    this.events = {
      change: 'CHANGE'
    }
  }

  _setActiveFromCache(compareGroups) {
    console.warn('GroupStore -> _setActiveFromCache | ', compareGroups);
    GroupService
      .getLastActive()
      .then(function(cached) {
        this._activeGroup = undefined;
        for (let i = 0; i < compareGroups.length; i++) {
          console.warn('GroupStore -> _setActiveFromCache | ', compareGroups[i].name, cached);
          if (compareGroups[i].name === cached) {
            this._activeGroup = compareGroups[i];
            this.emitChange();
            return;
          }
        }
        console.warn('GroupStore -> _setActiveFromCache | no match found', compareGroups[0]);
        this.setActive((compareGroups !== undefined && compareGroups.length > 0) ? compareGroups[0] : undefined);
        this.emitChange();  
      }.bind(this))
      .catch(function() {
        console.warn('GroupStore -> _setActiveFromCache | no cached found', compareGroups[0]);
        this.setActive((compareGroups !== undefined && compareGroups.length > 0) ? compareGroups[0] : undefined);
        this.emitChange();
      }.bind(this));
  }

  _hasInvalidActive(groups) {
    if (!this.hasActive()) return false;
    for (let i = 0; i < groups.length; i++) if (groups[i].name === this._activeGroup.name) return false;
    return true;
  }


  getGroups() {
    return this._groups;
  }

  getTodos() {
    return (this.hasActive()) ? this._activeGroup.tasks : []
  }

  addTodo(todo) {
    if (this.hasGroup(todo.groupId)) this._groups[todo.groupId].tasks.push(todo); 
  }

  reset() {
    this._groups = {}
    this._activeGroup = undefined;
    GroupService.clearLastActive();
    }

  setGroups(groups = []) {
    console.log('GroupStore -> setGroups() | groups: ', groups, 'Setting groups. Has active: ', this.hasActive(), this._hasInvalidActive(groups));
    this._groups = {};
    groups.forEach(group => {
      this._groups[group.name] = group;
    });

    if (!this.hasActive() || this._hasInvalidActive(groups)) this._setActiveFromCache(groups);
  }

  
  setGroup(id, group) {

    console.log('GroupStore -> setGroup() | groups: ", groups, "Setting groups', id, group, this._groups);
    this._groups[id] = group;

  }

  setActive(group) {
    this._activeGroup = group;
    (group !== undefined) ? GroupService.saveLastActive(group.name) : GroupService.clearLastActive();
  }

  getActive() {
    return this._activeGroup;
  }

  getActiveId() {
    if (this.hasActive()) return this._activeGroup.name;
  }

  hasActive() {
    return this._activeGroup !== undefined
  }

  hasGroups() {
    return Object.keys(this._groups).length > 0;
  }

  hasGroup(groupId) {
    return (this._groups[groupId] !== undefined);
  }

  addGroup(group) {
    console.log('GroupStore -> addGroup() | Adding', group)
    this._groups[group.name] = group;
    this.setActive(group);
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

  // isAdding() {
  //   return this._isAdding;
  // }

}


const GroupStore = new _GroupStore();


AppDispatcher.register(function(action) {

  switch(action.type) {

    case AuthConstants.TOKEN_REMOVED:
      GroupStore.reset();
      GroupStore.emitChange();
      break;
    case AuthConstants.TOKEN_SET:
      // GroupStore.clearLastActive();
      // GroupStore.emitChange();
      // if (action.user !== undefined) {
      //   GroupStore.setGroups(action.user.memberOf);
      //   GroupStore.emitChange();
      // }
      break;

    case UserConstants.SET_USER:
      GroupStore.setGroups(action.user.memberOf);
      GroupStore.emitChange();
      break;
    
    case TodoConstants.ADD_TODO:
      GroupStore.addTodo(action.todo);
      console.warn('group todo added', GroupStore._activeGroup)
      GroupStore.emitChange();
      break;

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
    case GroupConstants.RESET_GROUPS:
      GroupStore.resetGroups()
      GroupStore.emitChange();
      break;
    default:
      break;
  }

});

export { GroupStore };