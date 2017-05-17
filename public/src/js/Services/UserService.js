import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';

class _UserService {

  constructor() {

    this._cacheKey = 'user';
  
  } 

  cacheUser(user) {
    Logger.log('Caching user', user.email)
    CacheService.cache(this._cacheKey, user);
  }

  getCached() {
    return CacheService.get(this._cacheKey);
  }

  clearStorage() {
    CacheService.remove(this._cacheKey);
  }

  getUser() {    

    return new Promise((res, rej) => {
      Logger.log('getting user...')
      axios
        .get('user/')
        .then(response => {
          Logger.log('Got user', response.data)
          res(response.data.user);
        })
        .catch(err => {
          Logger.log('Error getting user', err.response)
          rej(err);
        });
    });
  }

  delFave(faveId) {
    return new Promise((res, rej) => {

      console.warn('requesting ', faveId, 'removal')

      axios
        .post('user/delFave', {
          faveId: faveId
        })
        .then(response => {
          res();
        })
        .catch(err => {
          rej(err);
        })

    });
  } 

}


export const UserService = new _UserService();
