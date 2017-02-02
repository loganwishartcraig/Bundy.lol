import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

// import { CacheService } from '../Services/CacheService';

import { UserActions } from '../Actions/UserActions';
import { GroupActions } from '../Actions/GroupActions';


const init = () => {

  // needs to update user if cached version found.
  return new Promise((res, rej) => {

    AuthService
      .init()
      .then(() => {
        flagAuth(true);
        UserActions.init();
        res();
      })
      .catch(() => {
        flagAuth(false);
        rej();
      });

  });

}

const login = credentials => {

  console.warn('logging in', credentials);

  AuthService
    .login(credentials)
    .then((user) => {
      flagAuth(true);
      UserActions.setUser(user);
    })
    .catch(err => {
      flagAuth(false);
      UserActions.setUser(undefined);
    });

};

const logout = () => {

  AuthService.logout();
  flagAuth(false);
  UserActions.resetUser();
  GroupActions.resetGroups();

  // potentially may need a clearTodos()

};

const flagAuth = (authenticated) => {

  AppDispatcher.dispatch({
    type: AuthConstants.SET_AUTH,
    authenticated: authenticated
  });

};

// const clearToken = () => {

//   AppDispatcher.dispatch({
//     type: AuthConstants.SET_AUTH
//   });

// };

const setToken = (token) => {

  if (token && token.length) {
    AuthService.setSession(token);
    flagAuth(true);
  } else {
    flagAuth(false);
  }

};

export const AuthActions = {

  init,
  login,
  logout,
  flagAuth,
  setToken,
  // clearToken
  // setCredentials

};
