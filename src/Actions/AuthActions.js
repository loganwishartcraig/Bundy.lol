import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

import { UserActions } from '../Actions/UserActions';

const init = () => {

    AuthService
      .getSession()
      .then(sessionToken => {
        console.log('got session token', sessionToken);
        setToken(sessionToken);
      })
      .catch(err =>{
        console.error('ERR: AuthActions.js -> init()', err)
      })

}

const login = (credentials) => {

  AuthService
    .login(credentials)
    .then(response => {
      setToken(response.token);
      UserActions.setUser(response.user);
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

const setToken = (token) => {

  AuthService.setSession(token);

  AppDispatcher.dispatch({
    type: AuthConstants.SET_TOKEN,
    token: token
  });

};

export const AuthActions = {

  init,
  login,
  logout,
  setToken

};
