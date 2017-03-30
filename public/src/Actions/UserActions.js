import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { UserConstants } from '../Constants/UserConstants';
import { UserService } from '../Services/UserService';


const init = () => {
  UserService
    .getCached()
    .then(user => {
      setUser(user);
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
    })
    .catch(err => {
      console.error(err);
    })

};

// const createUser = (userReq) => {

//   UserService
//     .createUser(userReq)
//     .then(payload => {
//       setUser(payload.user);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// };

const setUser = (user) => {

  if (user) {
    AppDispatcher.dispatch({
      type: UserConstants.SET_USER,
      user: user,
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
  // createUser,
  addFavorite,
  removeFavorite,
  editFavorite,
  resetUser

}
