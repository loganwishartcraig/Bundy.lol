import * as localForage from 'localforage';
import * as axios from 'axios';

import { CacheService } from './CacheService';

import { AuthActions } from '../Actions/AuthActions';
import { UserActions } from '../Actions/UserActions';

class _AuthService {


  constructor() {

    this.cacheKey = 'access_cred';

    // this
    //   ._getFromCache()
    //   .then(token => {
    //     AuthActions.flagAuth();
    //     this._setSession(token);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    //check cache for existing token and set
    // this._removeSession();
 
  }

  init() {

    return new Promise((res, rej) => {

      this
        ._getFromCache()
        .then(token => {
          AuthActions.flagAuth(true);
          console.log('got from session', token)
          this._setSession(token);
          res();
        })
        .catch(err => {
          console.error(err);
          AuthActions.flagAuth(false);
          res();
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


  // _setSession(session) {
  //   console.log('AuthService.js -> setSession() | msg: Setting session', session.token, session.user)
    
  //   localForage.setItem(this.cacheKey, {
  //     token: session.token,
  //     user: session.user
  //   });
    
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + session.token;
  // }


  _removeSession() {
    CacheService.remove(this.cacheKey);
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  _getSession() {
    return CacheService.get(this.cacheKey);
  }

  // _cacheToken(token) {

  // }

  login(loginReq) {
    

      axios.post('/auth/login', {
        credentials: loginReq
      })
      .then(response => {
        console.log('got user', response.data.user);
        console.log('got token', response.data.token);
        // this._setSession(response.data.token);
        AuthActions.setToken(response.data.token);
        UserActions.setUser(response.data.user);
      })
      .catch(err => {
        AuthActions.flagAuth(false);
      });
      



  }

  setSession(session) {
    this._setSession(session);
  }

  getFromCache() {
    return new Promise((res, rej) => {

      this
        ._getSession()
        .then(session => {
          if (session) res(session)
            else rej({msg: 'No session token found'})
        })
        .catch(err => {
          rej(err);
        });

    });
  }

  clearCredentials() {

    this._removeSession();
    this._removeStored();

  }

}

export const AuthService = new _AuthService();