import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';

class _UserService {

  constructor() {


    // * !! -- DEPRICATED???
    this._cacheKey = 'user';
  
  } 

  /**
   * Used to store a user object in the cache
   *
   * @param      {Object}  user    The user to cache
   */
  cacheUser(user) {
    Logger.log('Caching user', user.email)
    CacheService.cache(this._cacheKey, user);
  }


  /**
   * Gets the cached user object
   *
   * @return     {Object}  The cached user object.
   */
  getCached() {
    return CacheService.get(this._cacheKey);
  }


  /**
   * Clears the user cache
   */
  clearStorage() {
    CacheService.remove(this._cacheKey);
  }


  /**
   * Used to request a fresh user profile
   *
   * !! -- UNUSED? Profile servie overlap.
   *
   * @return     {Promise}  Resolves with fresh user object on success, rejects otherwise.
   */
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

  /**
   * Used to request removal of a favorites entry
   *
   * @param      {String}   faveId  ID of the favorite to remove
   * @return     {Promise}  Resolves on success, rejects otherwise
   */
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
