import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

import { UserActions } from '../Actions/UserActions';

const init = () => {

  return new Promise((res, rej) => {

    AuthService
      .getFromCache()
      .then(session => {
        console.log('AuthActions.js -> init() | msg: Got session token', session.token, 'and user', session.user);
        AuthService.setSession(session);
        UserActions.setUser(session.user);
        setAuth();
        res();
      })
      .catch(err =>{
        console.error('ERR: AuthActions.js -> init() |', err);
        res();
      });

  });

}

const login = (credentials) => {

  AuthService
    .login(credentials)
    .then(response => {
      AuthService.setSession(response);
      UserActions.setUser(response.user);
      setAuth();
    })
    .catch(err => {
      console.error('ERR: AuthActions.js -> login()', err);
      
    });

};

const logout = () => {

  AppDispatcher.dispatch({
    type: AuthConstants.CLEAR_TOKEN
  });

}

const setAuth = () => {

  // AuthService.setSession(token);

  AppDispatcher.dispatch({
    type: AuthConstants.SET_AUTH,
    authenticated: true
  });

};

export const AuthActions = {

  init,
  login,
  logout,
  setAuth

};
