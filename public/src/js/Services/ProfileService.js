import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';
import { UserService } from './UserService';
import { GroupService } from './GroupService';
import { TodoService } from './TodoService';

class _ProfileService {

  constructor() {
  
  } 



  getCached() {

  }

  clearStorage() {

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
          rej(err.response.data);
        })
      }, 3000)

    })

  };


};

export const ProfileService = new _ProfileService();