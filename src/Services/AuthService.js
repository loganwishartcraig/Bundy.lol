import * as localForage from 'localforage';
import * as axios from 'axios';

class _AuthService {


  constructor() {

    // this.token = '';
    this.cacheKey = 'bundylol_token';

    //check cache for existing token and set
    this._removeSession();

    // this._clearSession();
    // this.clearCredentials();
 
  }


  _setSession(token) {
    console.log('setting session', token)
    localStorage.setItem(this.cacheKey, token);
  }

  _removeSession() {
    localStorage.removeItem(this.cacheKey);
  }

  _getSession() {
    return localStorage.getItem(this.cacheKey);
  }

  _cacheToken(token) {

  }

  login(loginReq) {
    
    return new Promise((res, rej) => {

      axios.post('/auth/login', {
        credentials: loginReq
      })
      .then(response => {
        console.log('got user', response.data.user);
        console.log('got token', response.data.token);
        res(response.data);
      })
      .catch(err => {
        // console.error('error submitting user', err.response.data);
        rej(err.response.data);
      });
      

    });


  }

  setSession(token) {
    this._setSession(token);
  }

  getSession() {
    return new Promise((res, rej) => {

      let session = this._getSession();
      if (session) res(session);
      else rej({msg: 'No session token found'})

    });
  }

  clearCredentials() {

    // delete
    // this._removeAuthHeader(); 
    //

    this._removeSession();
    this._removeStored();

  }

}

export const AuthService = new _AuthService();