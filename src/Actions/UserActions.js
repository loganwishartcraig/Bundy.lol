import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { UserService } from '../Services/UserService';

import { AuthActions } from './AuthActions';
import { GroupActions } from './GroupActions';


import { sameSets } from '../Utility/Array';

const initUser = (email) => {

  UserService
    .getFromCache()
    .then(cachedUser => {
      setUser(cachedUser);
      GroupActions.initGroup(cachedUser.memberOf)
      UserService
        .fetchUser(email)
        .then(updatedUser => {
          setUser(updatedUser);
          if (!sameSets(cachedUser.memberOf, updatedUser.memberOf))
            GroupActions.initGroup(updatedUser.memberOf)
          UserService.cacheUser(updatedUser);
        })
        .catch(err => {
          console.error('ERR: UserActions.js -> initUser()', err);
        });
    })
    .catch(() => {
      UserService
        .fetchUser(email)
        .then((user) => {
          setUser(user);
          GroupActions.initGroup(user.memberOf);
          UserService.cacheUser(user);
        })
        .catch(err => {
          console.error('ERR: UserActions.js -> initUser()', err);
        });
  });

};

const setUser = (user) => {
  AppDispatcher.dispatch({
    type: UserConstants.SET_USER,
    user: user
  });
};

const unsetUser = () => {
  AppDispatcher.dispatch({
    type: UserConstants.UNSET_USER
  });
};

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

// issue caching user object

const createUser = (userReq) => {

  UserService
    .createUser(userReq)
    .then(res => {
      AuthActions.setToken(res.token);
      UserService.cacheUser(res.user);
      setUser(res.user);
    })
    .catch(err => {
      console.error('ERR: UserActions.js -> createUser()', err);
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

  initUser,
  setUser,
  unsetUser,
  updateUser,
  deleteUser,
  createUser,
  addFavorite,
  removeFavorite,
  editFavorite

}
