import * as axios from 'axios';
// import * as localForage from 'localforage';

// import { UserActions } from '../Actions/UserActions';
// import { AuthActions } from '../Actions/AuthActions';
// import { GroupActions } from '../Actions/GroupActions';

import { CacheService } from './CacheService';

class _UserService {

  constructor() {

    this._cacheKey = 'bundylol_user';
  
  } 

  _getFromCache() {
    return CacheService.get(this._cacheKey);
  }

  _cacheUser(user) {
    
  }


  storeUser(user) {
    console.log('UserService -> storeUser() | Caching user:', user)
    CacheService.cache(this._cacheKey, user);
  }

  getCached() {
    return this._getFromCache();
  }

  clearStorage() {
    CacheService.remove(this._cacheKey);
  }

  getUser() {
    
    return new Promise((res, rej) => {
      axios
        .get('user/getUser')
        .then(response => {
          res(response.data.user);
        })
        .catch(err => {
          rej(err.response.data);
        });
    });
  }

  createUser(userReq) {

    return new Promise((res, rej) => {

      axios.post('/user/create', {
        user: userReq
      })
      .then(response => {
        console.log('got user', response.data.user);
        console.log('got token', response.data.token);
        res(response.data);
      })
      .catch(err => {
        console.error(err.response.data);
        rej(err.response.data);
      });
      
    });

  }

}


export const UserService = new _UserService();
