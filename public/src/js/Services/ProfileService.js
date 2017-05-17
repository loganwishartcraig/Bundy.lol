import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';
import { UserService } from './UserService';
import { GroupService } from './GroupService';
import { TodoService } from './TodoService';

class _ProfileService {

  constructor() {
  
    this._cacheRegister = {};

  } 



  getCached(key) {

  }

  clearStorage() {

  }

  syncCache() {
    for (let key in this._cacheRegister) {
      
    }
  }

  getProfile() {
    return new Promise((res, rej) => {
      setTimeout(function() {

      axios
        .get('profile/')
        .then(response => {
          res(response.data);
        })
        .catch(err => {
          rej(err);
        })
      }, 3000)

    })

  };


};

export const ProfileService = new _ProfileService();