import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

import { CacheService } from '../Services/CacheService';

import { UserActions } from '../Actions/UserActions';


const login = (credentials) => {

  AuthService.login(credentials)

};

const logout = () => {

  AppDispatcher.dispatch({
    type: AuthConstants.CLEAR_TOKEN
  });

};

const flagAuth = (authenticated) => {

  AppDispatcher.dispatch({
    type: AuthConstants.SET_AUTH,
    authenticated: authenticated
  });

};

const setToken = (token) => {

  if (token) {
    AuthService.setSession(token);
    flagAuth(true);
  } else {
    flagAuth(false);
  }

};

export const AuthActions = {

  login,
  logout,
  flagAuth,
  setToken
  // setCredentials

};
