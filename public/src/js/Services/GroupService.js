import * as axios from 'axios';
// import * as localForage from 'localforage';

import { CacheService } from './CacheService';

class _GroupService {

  constructor() {

    this._cacheKey = 'lastActive';
    this._groupKey = 'groups';
    // this.clearLastActive();
  } 

  clearLastActive() {
    CacheService.remove(this._cacheKey);
  }

  saveLastActive(groupName) {
    CacheService.cache(this._cacheKey, groupName);
  }


  getLastActive() {
    return CacheService.get(this._cacheKey);
  }

  cacheGroups(groups) {
    CacheService.cache(this._groupKey, groups);
  }

  getGroupsFromCache() {
    return CacheService.get(this._groupKey);
  }

  clearGroups() {
    CacheService.remove(this._groupKey);
  }

  updateGroup(groupId, newGroup) {

  }
  

  leaveGroup(groupName) {
    
  }

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

  leaveGroup(groupId) {
   
    return new Promise((res, rej) => {

      axios.post('/group/leave', {
        id: groupId
      })
      .then(response => {
        res();
      })
      .catch(err => {
        rej(err);
      })

    })

  }


}

export const GroupService = new _GroupService();