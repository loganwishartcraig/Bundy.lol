import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

// import { UserActions } from '../Actions/UserActions';
// import { GroupActions } from '../Actions/GroupActions';
// import { TodoActions } from '../Actions/TodoActions';

const init = () => {

  // needs to update user if cached version found.
  return new Promise((res, rej) => {

    AuthService
      .init()
      .then(() => {
        dispatchSet();
        res();
      })
      .catch(() => {
        // dispatchRemoved();
        rej();
      });

  });

};


const login = credentials => {

  console.warn('logging in', credentials);

  AuthService
    .login(credentials)
    .then((user) => {
      dispatchSet(user);
    })
    .catch(err => {
      dispatchRemoved();
    });

};

const register = (userReq) => {

  AuthService
    .register(userReq)
    .then(user => {
      dispatchSet(user);
    })
    .catch(err => {
      console.warn(err);
      dispatchRemoved()
    })
};

const logout = () => {

  AuthService.logout();
  dispatchRemoved();

};

const dispatchSet = (user) => {

  AppDispatcher.dispatch({
    type: AuthConstants.TOKEN_SET,
    authenticated: true,
    user: user
  });

};

const dispatchRemoved  = () => {

  AppDispatcher.dispatch({
    type: AuthConstants.TOKEN_REMOVED,
    authenticated: false
  });

};

export const AuthActions = {

  init,
  login,
  logout,
  register

};
