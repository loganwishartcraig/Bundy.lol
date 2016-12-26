import * as localForage from 'localforage';

// import { UserActions } from '../Actions/UserActions';
// import { GroupActions } from '../Actions/GroupActions';

import * as axios from 'axios';


class _UserService {

  constructor() {

    this._cacheKey = 'bundylol_user';

    this.clearLastActive();
  } 

  clearLastActive() {
        localForage.removeItem(this._cacheKey);
  }

  cacheUser(user) {

    localForage
      .setItem(this._cacheKey, user)
      .then(msg => {
       console.log('Cached user', user);
      })
      .catch(err => {
       console.error('Error caching user', err, user);
      });

  }

  getFromCache() {

    return new Promise(function(res, rej) {
      localForage
        .getItem(this._cacheKey)
        .then(user => {(user !== null) ? res(user)  : rej(undefined)})
        .catch(err => {
          console.error('Error getting user from cache. Rejecting.')
          rej(err);
        });
    }.bind(this))

  }

  fetchUser(email) {

    return new Promise(function(res, rej) {

      axios
        .get(`/user/getUser?email=${email}`)
        .then(response => {
          console.log(response.data)
          res(response.data.user);
        })
        .catch(err => {
          rej(err.response.data);
        });
        
    });

  }

  updateUser(user) {

    // simulated API Call
    return new Promise(function(res, rej) {
      // res(user);
      setTimeout(() => {res(user)}, Math.floor((Math.random() * (2000-500)) + 500))
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
        // set authentication
        // AuthService.setAuth(res.data.token);
        // browserHistory.push('/')

      })
      .catch(err => {
        rej(err.response.data);
      });
      
    })
  }

}


export const UserService = new _UserService();
