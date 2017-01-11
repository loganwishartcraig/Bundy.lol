import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { UserService } from '../Services/UserService';

import { AuthActions } from './AuthActions';
import { GroupActions } from './GroupActions';


import { sameSets } from '../Utility/Array';

const initUser = () => {
  return UserService.init();
}

const setUser = (user) => {

  AppDispatcher.dispatch({
    type: UserConstants.SET_USER,
    user: user
  });

  UserService.cacheUser(user);
};

// const unsetUser = () => {
//   AppDispatcher.dispatch({
//     type: UserConstants.UNSET_USER
//   });
// };

const updateUser = (user) => {
  AppDispatcher.dispatch({
    type: UserConstants.UPDATE_USER,
    user: user
  });
};

const deleteUser = (userId) => {
  AppDispatcher.dispatch({
    type: UserConstants.DELETE_USER,
    userId: userId
  });
};


const createUser = (userReq) => {

  UserService.createUser(userReq)

};

const addFavorite = (message) => {
  AppDispatcher.dispatch({
    type: UserConstants.ADD_FAVORITE,
    message: message
  });
};

const removeFavorite = (id) => {
  AppDispatcher.dispatch({
    type: UserConstants.REMOVE_FAVORITE,
    id: id
  });
};

const editFavorite = (id, message) => {
  AppDispatcher.dispatch({
    type: UserConstants.EDIT_FAVORITE,
    id: id,
    message: message
  });
};


export const UserActions = {

  initUser,
  setUser,
  // unsetUser,
  updateUser,
  deleteUser,
  createUser,
  addFavorite,
  removeFavorite,
  editFavorite

}
