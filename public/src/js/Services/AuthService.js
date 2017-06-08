import * as axios from 'axios';
import Logger from '../Utility/Logging';

import { CacheService } from './CacheService';
import { ProfileService } from './ProfileService';

import { AuthActions } from '../Actions/AuthActions';


/**
 * Handles server communication for all authentication related tasks
 * Also manages global request authentication headers
 */
class _AuthService {


  constructor() {

    /**
     * The key used to retrieve cached states
     */
    this.cacheKey = 'access_cred';

  }


  /**
   * Sets the authentication session from cache
   *
   * @return     {Promise}  Resolves after successfully setting auth headers from cache, rejects otherwise
   */
  setFromCache() {
    
    return new Promise(function(res, rej) {

      /**
       * Queries cache service for cached auth token
       */
      let cached = CacheService.get(this.cacheKey)

      if (cached !== undefined) {
        this._setSession(cached);
        res();
      } else {
        rej();
      }

    }.bind(this));

  }


  /**
   * Internal function to set an authentication session
   *
   * @param      {String}  token   The authentication token to use
   */
  _setSession (token) {

    CacheService.cache(this.cacheKey, token);
    
    /**
     * Set global auth headers for AJAX requests
     */
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  
  }


  /**
   * Makes a token request to the server with given credentials. 
   * Response includes auth token and associated user profile object
   *
   * @param      {Object}   loginReq  The login request { email: String, password: String }
   * @return     {Promise}  Resolves with { user: Object, groups: [ Object ] } matching user credentials, rejects with error payload otherwise
   */
  login(loginReq) {

    return new Promise((res, rej) => {

      axios.post('/auth/login', {
        credentials: loginReq
      })
      .then(response => {

        /**
         * Set session using returned token
         */
        this._setSession(response.data.token);

        /**
         * ProfileService transforms server returned object to what app expects
         * 
         * !! -- Needs to be reworked
         */
        res(ProfileService.processUser(response.data.user));


      })
      .catch(err => {
        rej(err.response.data);
      });

    });
   
  }


  /**
   * Requests user creation serve-side
   * Response includes auth token and created user profile
   * 
   * @param      {Object}   userReq  Info for user to create
   * @return     {Promise}  Resolves with user and group info { user: Object, groups: [ Object ] } on successful creation, rejects with error payload otherwise  
   */

  register(userReq) {

    return new Promise((res, rej) => {


      axios.post('/user/create', {
        user: userReq
      })
      .then(response => {
        
        /**
         * Set session using returned token
         */
        this._setSession(response.data.token)


        /**
         * ProfileService transforms server returned object to what app expects
         * 
         * !! -- Needs to be reworked
         */
        res(ProfileService.processUser(response.data.user));

      })
      .catch(err => {
        Logger.error('POST Failed...', err);
        rej(err.response.data);
      });
      
    });

  }


  /**
   * Removes authentication by stripping auth headers & clearing cache entry
   */
  logout() {

    CacheService.remove(this.cacheKey);
    axios.defaults.headers.common['Authorization'] = undefined;

  }

}

export const AuthService = new _AuthService();