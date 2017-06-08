import * as axios from 'axios';

import { CacheService } from './CacheService';

class _GroupService {

  constructor() {

  } 

  /**
   * Used to make a join request for a given group
   *
   * @param      {Object}   groupReq  Object contining info for the group to join
   * @return     {Promise}  Resolves on successful join with new group object, rejects with error payload otherwise
   */
  joinGroup(groupReq) {
    return new Promise((res, rej) => {
      axios
        .post('/group/join', {
          groupReq: groupReq
        })
        .then(response => {
          res(response.data.group);
        })
        .catch(err => {
          rej(err.response.data);
        });
    });
  }


  /**
   * Used to make a create request for a given group
   *
   * @param      {Object}   groupReq  Object contining info for the group to create
   * @return     {Promise}  Resolves on successful creation with new group object, rejects with error payload otherwise
   */
  createGroup(groupReq) {

    return new Promise((res, rej) => {
      axios
        .post('/group/create', {
          groupReq: groupReq
        })
        .then(response => {
          res(response.data.group);
        })
        .catch(err => {
          rej(err.response.data)
        });

    });
  }


  /**
   * Used to make a leave request for a given group
   *
   * @param      {String}   groupId  ID of thee group to leave
   * @return     {Promise}  Resolves on successful leave, rejects with error payload otherwise
   */
  leaveGroup(groupId) {
   
    return new Promise((res, rej) => {

      axios.post('/group/leave', {
        id: groupId
      })
      .then(response => {
        res();
      })
      .catch(err => {
        rej(err.response);
      });

    });

  }


}

export const GroupService = new _GroupService();