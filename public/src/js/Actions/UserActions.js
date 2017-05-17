import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import Logger from '../Utility/Logging';

import { CacheService } from '../Services/CacheService';
import { UserService } from '../Services/UserService';
import { UserConstants } from '../Constants/UserConstants';


const setFromCache = () => {

  Logger.log('setting user from cache');

  AppDispatcher.dispatch({
    type: UserConstants.SET_USER_FROM_CACHE
  })

};

const updateUser = () => {

  UserService
    .getUser()
    .then(updated => {
      Logger.log('Got new user', updated.email)
      // CacheService.cacheUser(updated);
      setUser(updated);
    })
    .catch(err => {
      Logger.log('Failed to update user...', err)
    })

};

const setUser = (user) => {

  if (user) {
    AppDispatcher.dispatch({
      type: UserConstants.SET_USER,
      user: user
    });    
  }

};

const removeFave = (faveId) => {
  AppDispatcher.dispatch({
    type: UserConstants.REMOVE_FAVE,
    faveId: faveId
  })
}

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

export const UserActions = {

  setFromCache,
  setUser,
  updateUser,
  deleteFave
  
}
