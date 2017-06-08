import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';
import { UserService } from './UserService';
import { GroupService } from './GroupService';
import { TodoService } from './TodoService';

class _ProfileService {

  constructor() {
  
  } 

  /**
   * Used to process a server-returned user object for use by the application
   * Server returns a single user object with 'memberOf' attribute outlining groups
   * Application manages user and groups seperately to avoid over dependencies in stores
   * 
   * !! -- Should likely be reworked to just use single user object & waitFor in store action hanlders
   *
   * @param      {Object}  user    The full server returned user object
   * @return     {Object}  Split user object into user {Object}, and groups { [ Object ] }
   */
  processUser(user) {

    let groups = user.memberOf;

    delete user.memberOf

    return {user: user, groups: groups}
  
  }


  /**
   * Requests a fresh user profile from the server
   *
   * @return     {Promise}  Resolves with application ready user and group info on success, rejects with error payload otherwise
   */
  getProfile() {
    return new Promise((res, rej) => {

      axios
        .get('user/')
        .then(response => {


          /**
           * !! -- SHOULD REPLACE WITH processUser(response.data.user)
           */
          let user = response.data.user,
              groups = user.memberOf;

              delete user.memberOf;

          res({user: user, groups: groups});

        })
        .catch(err => {
          rej(err.response.data);
        });

    });

  };


};

export const ProfileService = new _ProfileService();