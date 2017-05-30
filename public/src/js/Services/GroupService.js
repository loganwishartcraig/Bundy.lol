import * as axios from 'axios';

import { CacheService } from './CacheService';

class _GroupService {

  constructor() {

    /**
     * Cache keys for last active and groups array
     * 
     * !! -- DEPRICATED???
     * 
     */
    this._lastActiveKey = 'lastActive';
    this._groupKey = 'groups';

  } 

  /**
   * Clears last active cache entry
   */
  clearLastActive() {
    CacheService.remove(this._lastActiveKey);
  }

  /**
   * Caches the last active group name
   *
   * @param      {String}  groupName  The last active group name
   */
  saveLastActive(groupName) {
    CacheService.cache(this._lastActiveKey, groupName);
  }


  /**
   * Gets the last active group from cache
   *
   * @return     {String}  The last active group name.
   */
  getLastActive() {
    return CacheService.get(this._lastActiveKey);
  }


  /**
   * Caches a group list
   *
   * @param      { [ Groups ] }  groups  Array of groups objects to cache
   */
  cacheGroups(groups) {
    CacheService.cache(this._groupKey, groups);
  }


  /**
   * Gets the cached group list
   *
   * @return     { [ Groups ] }  Array of group objects
   */
  getGroupsFromCache() {
    return CacheService.get(this._groupKey);
  }


  /**
   * Removes the cached group list
   */
  clearGroups() {
    CacheService.remove(this._groupKey);
  }


  /**
   * Used to make a join request for a given group
   *
   * @param      {Object}   groupReq  Object contining info for the group to join
   * @return     {Promise}  Resolves on successful join with new group object, rejects with error payload otherwise
   */
  joinGroup(groupReq) {
    return new Promise((res, rej) => {
      axios
        .post('/group/join', {
          groupReq: groupReq
        })
        .then(response => {
          res(response.data.group);
        })
        .catch(err => {
          rej(err.response.data);
        });
    });
  }


  /**
   * Used to make a create request for a given group
   *
   * @param      {Object}   groupReq  Object contining info for the group to create
   * @return     {Promise}  Resolves on successful creation with new group object, rejects with error payload otherwise
   */
  createGroup(groupReq) {

    return new Promise((res, rej) => {
      axios
        .post('/group/create', {
          groupReq: groupReq
        })
        .then(response => {
          res(response.data.group);
        })
        .catch(err => {
          rej(err.response.data)
        });

    });
  }


  /**
   * Used to make a leave request for a given group
   *
   * @param      {String}   groupId  ID of thee group to leave
   * @return     {Promise}  Resolves on successful leave, rejects with error payload otherwise
   */
  leaveGroup(groupId) {
   
    return new Promise((res, rej) => {

      axios.post('/group/leave', {
        id: groupId
      })
      .then(response => {
        res();
      })
      .catch(err => {
        rej(err.response);
      });

    });

  }


}

export const GroupService = new _GroupService();