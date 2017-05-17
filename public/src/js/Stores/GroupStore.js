import { EventEmitter } from 'events';
import Logger from '../Utility/Logging'

import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { CacheService } from '../Services/CacheService';

import TodoStore, { TodoDispatchToken } from './TodoStore';

import { AuthConstants } from '../Constants/AuthConstants';
import { ProfileConstants } from '../Constants/ProfileConstants';
import { GroupConstants } from '../Constants/GroupConstants';
import { TodoConstants } from '../Constants/TodoConstants';

class _GroupStore extends EventEmitter {

  constructor() {
    super();

    this._cacheKey = 'group'
    this._activeGroup = undefined;
    this._isAdding = false;
    this._isCreating = false;
    this._managing = false;
    this._groups = undefined;

  }

  setFromCache() {

    if (this.hasGroups()) return;

    let cached = CacheService.get(this._cacheKey)

    if (cached !== undefined) {
      this._activeGroup = cached.activeGroup
      this._groups = cached.groups
    }

  }

  syncCache() {
    CacheService.cache(this._cacheKey, {groups: this._groups, activeGroup: this._activeGroup})
  }

  clearCache() {
    CacheService.remove(this._cacheKey);
  }

  getGroups() {
    return this._groups;
  }

  getActiveName() {
    return this._activeGroup;
  }

  // getActiveName() {
  //   console.warn(this._activeGroup)
  //   return (this.hasActive()) ? this._activeGroup : undefined;
  // }

  getActiveGroup() {
    if (this.hasActive()) return this._groups.filter(group => group.name === this._activeGroup)[0];
  }

  getActiveMembers() {
    if (this.hasActive()) return this._groups.filter(group => group.name === this._activeGroup)[0].members;
  }

  isAdding() {
    return this._isAdding;
  }

  isCreating() {
    return this._isCreating;
  }

  isManaging() {
    return this._managing;
  }

  getmanagingInfo() {
    if (this.isManaging()) return this._groups.filter(group => group.name === this._managing)[0];
  }

  setDefaultActive() {
    if (!this.hasActive() && this._groups.length > 0) this._activeGroup = this._groups[0].name
  }

  setGroups(groups) {
    this._groups = groups;
    if (!this.hasActive()) this.setDefaultActive()
    this.syncCache();
  }

  setActive(groupName) {
    if (typeof groupName !== 'string' || groupName.length === 0) return Logger.error('Tried to set invalid groupname', groupname);
    this._activeGroup = groupName;
    this.syncCache();
  } 

  
  addGroup(group) {

    this._groups.push(group);
    this.setActive(group.name);
    this.syncCache();
  }

  updateActiveTodos(todos) {
    if (todos.constructor !== Array) return Logger.error('Tried to set non array todos');
    if (!this.hasActive()) return;
    this.getActiveGroup().tasks = todos;
    this.syncCache();
  }

  hasGroups() {
    return (this._groups !== undefined) ? (this._groups.length > 0) : false; 
  }

  hasActive() {
    return this._activeGroup !== undefined;
  }

  setAdding(adding) {
    if (typeof adding !== 'boolean') return Logger.error('Tried to set non boolean "adding"', adding);
    this._isAdding = adding;
  } 

  setCreating(creating) {
    if (typeof creating !== 'boolean') return Logger.error('Tried to set non boolean "creating"', creating);
    this._isCreating = creating;
  }

  setManaging(managing) {
    if (typeof managing !== 'boolean') return Logger.error('Tried to set non boolean "managing"', managing);
    this._managing = managing; 
  }

  clearManaging() {
    this._managing = undefined;
  }

  reset() {
    this._activeGroup = undefined;
    this._isAdding = false;
    this._isCreating = false;
    this._managing = false;
    this._groups = undefined;
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

  resetActive() {
    console.warn('resetting active', this._activeGroup, this._groups)
    this._activeGroup = (this.hasGroups()) ? this._groups[0].name : undefined;
    console.warn('reset active', this._activeGroup, this._groups)
    this.syncCache();
  }

  resetView() {
    this.setAdding(false);
    this.setCreating(false);
    this.setManaging(false);
  }

  removeGroup(name) {

    console.warn('removing group', name)
    this._groups = this._groups.filter(group => (group.name !== name))
    console.warn('removed', this._activeGroup, this._groups)
    if (this._activeGroup === name) this.resetActive();

  }

}

const GroupStore = new _GroupStore();

const handleTodoChange = () => {
  AppDispatcher.waitFor([TodoDispatchToken]);
  GroupStore.updateActiveTodos(TodoStore.getTodos());
}

const GroupDispatchToken = AppDispatcher.register(action => {

  switch(action.type) {


    case AuthConstants.TOKEN_SET:
      (action.groups) ? GroupStore.setGroups(action.groups) : GroupStore.setFromCache();
      GroupStore.emitChange();
      break;
    case AuthConstants.TOKEN_REMOVED:
      GroupStore.reset();
      GroupStore.emitChange();
      break;


    case ProfileConstants.SET_PROFILE:
      GroupStore.setGroups(action.groups);
      GroupStore.emitChange();
      break;


    case TodoConstants.ADD_TODO:
      handleTodoChange();
      break;
    case TodoConstants.ADD_AND_FAVE_TODO:
      handleTodoChange();
      break;
    case TodoConstants.UPDATE_TODO:
      handleTodoChange();
      break;
    case TodoConstants.REMOVE_TODO:
      handleTodoChange();
      break;
    case TodoConstants.COMIT_EDIT:
      handleTodoChange();
      break;

    case GroupConstants.ADD_GROUP:
      GroupStore.addGroup(action.group);
      GroupStore.resetView();
      GroupStore.emitChange();
      break;
    case GroupConstants.SET_ACTIVE:
      GroupStore.setActive(action.groupName);
      GroupStore.resetView();
      GroupStore.emitChange();
      break;
    case GroupConstants.START_ADD:
      GroupStore.setAdding(true);
      GroupStore.emitChange();
      break;
    case GroupConstants.CANCEL_ADD:
      GroupStore.resetView();
      GroupStore.emitChange();
      break;
    case GroupConstants.START_JOIN:
      GroupStore.setCreating(false);
      GroupStore.emitChange();
      break;
    case GroupConstants.START_CREATE:
      GroupStore.setCreating(true);
      GroupStore.emitChange();
      break;
    case GroupConstants.START_MANAGE:
      GroupStore.setManaging(true);
      GroupStore.emitChange()
      break;
    case GroupConstants.END_MANAGE:
      GroupStore.clearManaging();
      GroupStore.emitChange();
      break;
    case GroupConstants.REMOVE_GROUP:
      GroupStore.removeGroup(action.id);
      GroupStore.resetView();
      GroupStore.emitChange();
      break;
    default:
      break;

      
  }

});

export { GroupDispatchToken }
export default GroupStore