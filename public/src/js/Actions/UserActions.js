import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import Logger from '../Utility/Logging';

import { CacheService } from '../Services/CacheService';
import { UserService } from '../Services/UserService';
import { UserConstants } from '../Constants/UserConstants';



/**
 * Action used set user from cache
 * 
 * !! -- This should be reworked
 *
 * @return     {null} 
 */
const setFromCache = () => {

  Logger.log('setting user from cache');

  AppDispatcher.dispatch({
    type: UserConstants.SET_USER_FROM_CACHE
  });

};


/**
 * Action used to update user
 * Updates client-side then sets updated user
 *
 * @return     {null} 
 */
const updateUser = () => {

  UserService
    .getUser()
    .then(updated => {
      Logger.log('Got new user', updated.email)
      setUser(updated);
    })
    .catch(err => {
      Logger.log('Failed to update user...', err)
    });

};


/**
 * Action to delete an entry from a users favorite list
 * Deletes server-side then removes
 *
 * @param      {String}  faveId  ID of the favorite entry to remove
 * @return     {null} 
 */
const deleteFave = (faveId) => {
  UserService
    .delFave(faveId)
    .then(() => {
      removeFave(faveId)
    })
    .catch(err => {
      console.warn('error deleting faveorite...', err)
    })
};



/**
 * Sets the user. 
 *
 * @param      {Object}  user    The user object
 * @return     {null} 
 */
const setUser = (user) => {

  if (user) {
    AppDispatcher.dispatch({
      type: UserConstants.SET_USER,
      user: user
    });    
  }

};


/**
 * Action to remove an entry from a users favorite list
 *
 * @param      {String}  faveId  ID of the favorite entry to remove
 * @return     {null}
 */
const removeFave = (faveId) => {
  AppDispatcher.dispatch({
    type: UserConstants.REMOVE_FAVE,
    faveId: faveId
  });
};



export const UserActions = {

  setFromCache,
  setUser,
  updateUser,
  deleteFave
  
}
