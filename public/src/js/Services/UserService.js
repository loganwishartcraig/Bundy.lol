import * as axios from 'axios';
import Logger from '../Utility/Logging'

import { CacheService } from './CacheService';

class _UserService {

  constructor() {
  
  } 

  /**
   * Used to request removal of a favorites entry
   *
   * @param      {String}   faveId  ID of the favorite to remove
   * @return     {Promise}  Resolves on success, rejects otherwise
   */
  delFave(faveId) {
    return new Promise((res, rej) => {

      console.warn('requesting ', faveId, 'removal')

      axios
        .post('user/delFave', {
          faveId: faveId
        })
        .then(response => {
          res();
        })
        .catch(err => {
          rej(err);
        })

    });
  } 

}


export const UserService = new _UserService();
