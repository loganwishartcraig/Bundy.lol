import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';
import { UserService } from './UserService';
import { GroupService } from './GroupService';
import { TodoService } from './TodoService';

class _ProfileService {

  constructor() {
  
  } 

  getProfile() {
    return new Promise((res, rej) => {
      setTimeout(function() {

      axios
        .get('user/')
        .then(response => {

          let user = response.data.user,
              groups = user.memberOf;

              delete user.memberOf;

          res({user: user, groups: groups});

        })
        .catch(err => {
          rej(err);
        })
      }, 3000)

    })

  };


};

export const ProfileService = new _ProfileService();