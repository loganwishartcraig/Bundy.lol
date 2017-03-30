import * as axios from 'axios';

import { CacheService } from './CacheService';

class _AuthService {


  constructor() {

    this.cacheKey = 'access_cred';

  }

  _getFromCache() {
    return CacheService.get(this.cacheKey);
  }

  _setSession (token) {
    console.log('AuthService.js -> setSession() | msg: Setting session', token)
    CacheService.cache(this.cacheKey, token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  init() {

    return new Promise((res, rej) => {

      this
        ._getFromCache()
        .then(token => {
          this._setSession(token);
          res();
        })
        .catch(err => {
          console.error(err);
          CacheService.clearAll();
          rej();
        });

    })

  }


  login(loginReq) {

    return new Promise((res, rej) => {

      axios.post('/auth/login', {
        credentials: loginReq
      })
      .then(response => {
        this._setSession(response.data.token);
        res(response.data.user);
      })
      .catch(err => {
        console.log('AuthService.js -> login() | Error logging in', err.response.data, loginReq);
        rej(err);
      });

    });

      
  }

  register(userReq) {
    return new Promise((res, rej) => {
      axios.post('/user/create', {
        user: userReq
      })
      .then(response => {
        console.log('got user', response.data.user);
        console.log('got token', response.data.token);
        this._setSession(response.data.token);
        res(response.data.user);
      })
      .catch(err => {
        console.error(err.response.data);
        rej(err.response.data);
      });
    });
  }

  logout() {

    CacheService.remove(this.cacheKey);
    axios.defaults.headers.common['Authorization'] = undefined;

  }

  setSession(sessionToken) {
    this._setSession(sessionToken);
  }

  getFromCache() {
    return new Promise((res, rej) => {

      this
        ._getFromCache()
        .then(sessionToken => {
          console.warn(sessionToken)
          if (sessionToken) res(sessionToken)
            else rej({msg: 'No session token found'})
        })
        .catch(err => {
          rej(err);
        });

    });
  }

}

export const AuthService = new _AuthService();