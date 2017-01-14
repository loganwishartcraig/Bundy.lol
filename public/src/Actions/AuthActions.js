import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

// import { CacheService } from '../Services/CacheService';

import { UserActions } from '../Actions/UserActions';


const initAuth = () => {

  // needs to update user if cached version found.
  return new Promise((res, rej) => {

    AuthService
      .init()
      .then(() => {
        flagAuth(true);
        res();
      })
      .catch(() => {
        flagAuth(false);
        rej();
      });

  });

}

const login = credentials => {

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

// const requestUser = () => {

//   return new Promise((res, rej) => {

//     AuthService
//       .requestFromToken()
//       .then(user => {
//         res(user);
//       })
//       .catch(err => {
//         rej(err);
//       });

//   });


// };

const logout = () => {

  AuthService.logout();
  flagAuth(false);
  UserActions.setUser(undefined);

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

  initAuth,
  login,
  logout,
  flagAuth,
  setToken,
  // clearToken
  // setCredentials

};
