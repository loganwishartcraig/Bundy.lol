import * as axios from 'axios';
import Logger from '../Utility/Logging';

import { CacheService } from './CacheService';
import { AuthActions } from '../Actions/AuthActions';

class _AuthService {


  constructor() {

    this.cacheKey = 'access_cred';

    // this.logout()

  }

  setFromCache() {
    
    return new Promise(function(res, rej) {

      let cached = CacheService.get(this.cacheKey)

      if (cached !== undefined) {
        this._setSession(cached)
        res();
      } else {
        rej();
      }

    }.bind(this));


    

  }

  _setSession (token) {
    Logger.log('Setting & caching session', token)
    CacheService.cache(this.cacheKey, token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  login(loginReq) {

    return new Promise((res, rej) => {

      Logger.log('POST-ing login request to server', loginReq)

      axios.post('/auth/login', {
        credentials: loginReq
      })
      .then(response => {
        Logger.log('POST Successful!', response.data)
        this._setSession(response.data.token);

        let user = response.data.user,
            groups = user.memberOf;

            delete user.memberOf;

            console.warn(user, groups)

          res({user: user, groups: groups});


        // res(response.data.user);
      })
      .catch(err => {
        Logger.error('POST Failed...', err);
        rej(err.response.data);
      });

    });

      
  }

  register(userReq) {

    return new Promise((res, rej) => {

      Logger.log('POST-ing create request...')

      axios.post('/user/create', {
        user: userReq
      })
      .then(response => {
        Logger.log('POST Successful!', response.data);
        this._setSession(response.data.token)

        let user = response.data.user,
            groups = user.memberOf;

            delete user.memberOf;

            // console.warn(user, groups)

        // res(response.data.user);
          res({user: user, groups: groups});

      })
      .catch(err => {
        Logger.error('POST Failed...', err);
        rej(err.response.data);
      });
      
    });

  }

  logout() {

    Logger.log('Removing cache and Auth headers')
    CacheService.remove(this.cacheKey);
    axios.defaults.headers.common['Authorization'] = undefined;

  }

  setSession(sessionToken) {
    this._setSession(sessionToken);
  }

  // getFromCache() {
  //   return new Promise((res, rej) => {

  //     this
  //       ._getFromCache()
  //       .then(sessionToken => {
  //         if (sessionToken) res(sessionToken)
  //           else rej({msg: 'No session token found'})
  //       })
  //       .catch(err => {
  //         rej(err);
  //       });

  //   });
  // }

}

export const AuthService = new _AuthService();