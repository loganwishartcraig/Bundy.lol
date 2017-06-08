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

    /**
     * Key used for caching purposes
     */
    this._cacheKey = 'group'

    /**
     * Initial group state
     */
    this._activeGroup = undefined;    // The name of the currently active group 
    this._isAdding = false;           // Indicates if a group is being added
    this._isCreating = false;         // Indicates if the group being added is being created from scratch
    this._managing = false;           // Indicates if the active group is being managed
    this._groups = undefined;         // The list of groups

  }


  /**
   * Used to initalize the current state from cache
   * Will only be called on TOKEN_SET action if no state is already set
   */
  setFromCache() {

    if (this.hasGroups()) return;

    const cached = CacheService.get(this._cacheKey);

    if (cached !== undefined) {
      this._activeGroup = cached.activeGroup;
      this._groups = cached.groups;
    }

  }


  /**
   * Used to cache current state 
   */
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

  /**
   * Gets the currently active group object
   *
   * @return     {Object}  The active group reference in the groups array.
   */
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

  hasGroups() {
    return (this._groups !== undefined) ? (this._groups.length > 0) : false; 
  }

  hasActive() {
    return this._activeGroup !== undefined;
  }


  /**
   * Sets active group to first in list when groups available, udefined otherwise
   */
  setDefaultActive() {
    this._activeGroup = (this.hasGroups()) ? this._groups[0].name : undefined
  }


  /**
   * Sets the groups list and syncs cache.
   * If no active is set, sets to default
   *
   * @param      { [ Object ] }  groups  Array of group objects
   */
  setGroups(groups) {
    this._groups = groups;
    if (!this.hasActive()) this.setDefaultActive();
    this.syncCache();
  }


  /**
   * Sets the active group and syncs cache.
   *
   * @param      {String}  groupName  The active group's name
   */
  setActive(groupName) {
    if (typeof groupName !== 'string' || groupName.length === 0) return Logger.error('Tried to set invalid groupname', groupname);
    this._activeGroup = groupName;
    this.syncCache();
  } 

  /**
   * Sets adding state
   *
   * @param      {Boolean}  adding  The adding state
   */
  setAdding(adding) {
    if (typeof adding !== 'boolean') return Logger.error('Tried to set non boolean "adding"', adding);
    this._isAdding = adding;
  } 

  /**
   * Sets creating state
   *
   * @param      {Boolean}  creating  The creating state
   */
  setCreating(creating) {
    if (typeof creating !== 'boolean') return Logger.error('Tried to set non boolean "creating"', creating);
    this._isCreating = creating;
  }


  /**
   * Sets manging state
   *
   * @param      {Boolean}  managing  The managing state
   */
  setManaging(managing) {
    if (typeof managing !== 'boolean') return Logger.error('Tried to set non boolean "managing"', managing);
    this._managing = managing; 
  }


  /**
   * Adds a group to the group list
   *
   * @param      {Object}  group   The group to add
   */
  addGroup(group) {
    this._groups.push(group);
    this.setActive(group.name);
    this.syncCache();
  }


  /**
   * Updates the actives group todos and re-caches
   *
   * @param      { [ Object ] }  todos   Array of todo objects
   */
  updateActiveTodos(todos) {
    if (todos.constructor !== Array) return Logger.error('Tried to set non array todos');
    if (!this.hasActive()) return;
    this.getActiveGroup().tasks = todos;
    this.syncCache();
  }
  

  /**
   * Removes a group from the group list.
   * Resets active if active group was removed
   *
   * @param      {String}  name    Name of the group to remove
   */
  removeGroup(name) {

    // console.warn('removing group', name)
    this._groups = this._groups.filter(group => (group.name !== name))
    // console.warn('removed', this._activeGroup, this._groups)
    if (this._activeGroup === name) this.resetActive();

  }


  /**
   * resets managing state
   */
  clearManaging() {
    this._managing = false;
  }


  /**
   * Rests active group
   */
  resetActive() {
    this.setDefaultActive()
    this.syncCache();
  }

  /**
   * Resets all view related state
   */
  resetView() {
    this.setAdding(false);
    this.setCreating(false);
    this.setManaging(false);
  }


  /**
   * Resets store state and clears cache
   */
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

}

const GroupStore = new _GroupStore();


/**
 * Updates todos for active group when todo store changes. For caching purposes
 */
const handleTodoChange = () => {
  AppDispatcher.waitFor([TodoDispatchToken]);
  GroupStore.updateActiveTodos(TodoStore.getTodos());
};


const GroupDispatchToken = AppDispatcher.register(action => {

  switch(action.type) {

    /**
     * On token set, if groups included, set, otherwise set from cache
     */
    case AuthConstants.TOKEN_SET:
      (action.groups !== undefined) ? GroupStore.setGroups(action.groups) : GroupStore.setFromCache()
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


    /**
     * Update todos on relevant state changes
     */
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