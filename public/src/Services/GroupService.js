import * as axios from 'axios';
// import * as localForage from 'localforage';

import { CacheService } from './CacheService';
// import { UserActions } from '../Actions/UserActions';
// import { GroupActions } from '../Actions/GroupActions';
// import { DisplayActions } from '../Actions/DisplayActions';


class _GroupService {

  constructor() {

    // console.log('constructing groups', groups)

    this._cacheKey = 'bundylol_lastActive';

    // this.clearLastActive();
  } 

  clearLastActive() {
    CacheService.remove(this._cacheKey);
  }

  saveLastActive(groupName) {

    console.log('GroupService.js -> saveLastActive() | caching last active', groupName)
    CacheService.cache(this._cacheKey, groupName);

  }


  getLastActive() {
    console.log('GroupService.js -> getLastActive() | getting last active...')
    return CacheService.get(this._cacheKey);
    
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
        })

    });
  }


}

export const GroupService = new _GroupService();