import * as localForage from 'localforage';
import * as axios from 'axios';

class _AuthService {


  constructor() {

    // this.token = '';
    this.cacheKey = 'access_cred';

    //check cache for existing token and set
    // this._removeSession();
 
  }


  _setSession(session) {
    console.log('AuthService.js -> setSession() | msg: Setting session', session.token, session.user)
    
    localForage.setItem(this.cacheKey, {
      token: session.token,
      user: session.user
    });
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + session.token;
  }

  _removeSession() {
    localForage.removeItem(this.cacheKey);
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  _getSession() {
    return localForage.getItem(this.cacheKey);
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
        // this._setSession(response.data)
        res(response.data);
      })
      .catch(err => {
        // console.error('error submitting user', err.response.data);
        rej(err.response.data);
      });
      

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

    // delete
    // this._removeAuthHeader(); 
    //

    this._removeSession();
    this._removeStored();

  }

}

export const AuthService = new _AuthService();