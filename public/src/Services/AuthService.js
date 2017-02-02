import * as axios from 'axios';
// import * as localForage from 'localforage';

import { CacheService } from './CacheService';

// import { AuthActions } from '../Actions/AuthActions';
// import { UserActions } from '../Actions/UserActions';

class _AuthService {


  constructor() {

    this.cacheKey = 'access_cred';

    //check cache for existing token and set
    // this._removeSession();
 
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
          rej();
        });

    })

  }

  _getFromCache() {

    return CacheService.get(this.cacheKey);

  }


  _setSession (token) {
    console.log('AuthService.js -> setSession() | msg: Setting session', token)
    CacheService.cache(this.cacheKey, token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }


  _getSession() {
    return CacheService.get(this.cacheKey);
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

  logout() {

    CacheService.remove(this.cacheKey);
    axios.defaults.headers.common['Authorization'] = undefined;
    console.warn(axios.defaults.headers.common['Authorization']);

  }

  setSession(sessionToken) {
    this._setSession(sessionToken);
  }

  getFromCache() {
    return new Promise((res, rej) => {

      this
        ._getSession()
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