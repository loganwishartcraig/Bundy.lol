import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { UserService } from '../Services/UserService';

// import { GroupActions } from './GroupActions';
import { AuthActions } from './AuthActions';


import { sameSets } from '../Utility/Array';

const initUser = () => {
  UserService
    .fromCache()
    .then(user => {
      setUser(user);
      updateUser();
    })
    .catch(err => {
      console.error(err);
      updateUser();
    });

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

const updateUser = () => {

  UserService
    .getUser()
    .then(updated => {
      setUser(updated)
    })
    .catch(err => {
      console.log(err);
    })

};
  // AppDispatcher.dispatch({
  //   type: UserConstants.UPDATE_USER,
  //   user: user
  // });

  

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
