import * as localForage from 'localforage';



// import { GroupActions } from '../Actions/GroupActions';

// import { UserStore } from '../Stores/UserStore';


import * as axios from 'axios';

class _GroupService {

  constructor() {

    // console.log('constructing groups', groups)

    this._cacheKey = 'bundylol_lastActive';

    this.clearLastActive();
  } 

  clearLastActive() {
        localForage.removeItem(this._cacheKey);
  }

  saveLastActive(group) {

    console.log('caching last active', group)
    localForage.setItem(this._cacheKey, group);

  }

  getLastActive() {

    return new Promise((res, rej) => {

      localForage
        .getItem(this._cacheKey)
        .then(group => {
          console.log('found last active', group);
          (group !== null) ? res(group) : rej(undefined);
        })
        .catch(err => { rej(err.response.data) });

    });
    
  }

  _sortTodosAlpha(a, b) {
    if (a.id > b.id) return 1;
    if (a.id === b.id) return 0;
    if (a.id < b.id) return -1;
  }


  fetch(toFetch) {

    return new Promise((res, rej) => {

      let collection = [];

      if (Array.isArray(toFetch)) {
        toFetch.forEach(groupId => {
          this
            ._getGroupInfo(groupId)
            .then(groupInfo => {
              collection.push(groupInfo)
              if (collection.length === toFetch.length) res(collection.sort(this._sortTodosAlpha));
            })
            .catch(err => {
              rej(err);
            });
        });
      } else if (typeof toFetch === 'string') {
        this
          ._getGroupInfo(toFetch)
          .then(groupInfo => {
            // collection[toFetch] = groupInfo
            res(groupInfo);
          })
          .catch(err => {
            rej(err);
          })
      }
      
    })

  }

  _getGroupInfo(groupId) {
    return new Promise((res, rej) => {

      setTimeout(() => {
        if (DUMMY_API_RESPONSE.hasOwnProperty(groupId)) {
          res(DUMMY_API_RESPONSE[groupId])
        }
        else rej({msg: 'Group Not Found'})
      }, Math.floor((Math.random() * (2000-500)) + 500))

    });
  }

  updateGroup(groupId, newGroup) {

  }

  hasGroups() {
    return this._groups !== undefined
  }

  requestJoin(groupName, password) {

  }

  requestLeave(groupName) {
    
  }

}

export const GroupService = new _GroupService();