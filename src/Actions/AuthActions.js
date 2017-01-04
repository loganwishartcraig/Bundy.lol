import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

// import { CacheService } from '../Services/CacheService';

// import { UserActions } from '../Actions/UserActions';


const initAuth = () => {

  // needs to update user if cached version found.
  return AuthService.init();

}

const login = (credentials) => {

  AuthService.login(credentials)

};

const logout = () => {

  AuthService.logout();

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

// const setToken = (token) => {

//   if (token) {
//     flagAuth(true);
//   } else {
//     flagAuth(false);
//   }

// };

export const AuthActions = {

  initAuth,
  login,
  logout,
  flagAuth
  // setToken,
  // clearToken
  // setCredentials

};
