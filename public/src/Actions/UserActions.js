import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { UserService } from '../Services/UserService';

import { GroupActions } from './GroupActions';
import { AuthActions } from './AuthActions';


import { sameSets } from '../Utility/Array';


// might need to adjust actions
// -- INIT_USER
// -- uPDATE_USER
// -- SET_USER

const init = () => {
  UserService
    .fromStorage()
    .then(user => {
      setUser(user);
      GroupActions.init(user.memberOf);
      updateUser();
    })
    .catch(err => {
      console.error(err);
      updateUser();
    });

};

const updateUser = () => {

  UserService
    .getUser()
    .then(updated => {
      setUser(updated);
      GroupActions.setAll(updated.memberOf);
    })
    .catch(err => {
      console.error(err);
    })

};

const createUser = (userReq) => {

  UserService
    .createUser(userReq)
    .then(payload => {
      setUser(payload.user);
      AuthActions.setToken(payload.token);
    })
    .catch(err => {
      console.log(err);
    })
};

const setUser = (user) => {

  if (user) {
    AppDispatcher.dispatch({
      type: UserConstants.SET_USER,
      user: user
    });
    
    UserService.storeUser(user);
  }

};

const resetUser = () => {
  UserService.clearStorage();
  setUser(undefined);
}


const deleteUser = (userId) => {
  AppDispatcher.dispatch({
    type: UserConstants.DELETE_USER,
    userId: userId
  });
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

  init,
  setUser,
  updateUser,
  deleteUser,
  createUser,
  addFavorite,
  removeFavorite,
  editFavorite,
  resetUser

}
