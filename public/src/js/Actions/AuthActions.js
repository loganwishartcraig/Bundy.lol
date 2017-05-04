import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { CacheService } from '../Services/CacheService';
import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';

import { UserActions } from './UserActions';

// const init = () => {

//   return new Promise((res, rej) => {

//     AuthService
//       .init()
//       .then(() => {
//         dispatchSet();
//         res();
//       })
//       .catch(() => {
//         rej();
//       });

//   });

// };

const setFromCache = () => {
  AuthService.setFromCache()
}

const _handleAuthSuccess = () => {
  dispatchSet();
  // UserActions.setUser(user)
}

const _handleAuthFail = err => {
  Logger.error('Handling auth failure', err);
  dispatchRemoved();
}


const login = credentials => {

  Logger.log('Attempting login...', credentials);
  (credentials.rememberMe) ? CacheService.enable() : CacheService.disable();

  AuthService
    .login(credentials)
    .then(_handleAuthSuccess)
    .catch(err => {
      console.warn(err)
    });

};

const register = (userReq) => {

  Logger.log('Attempting login...', userReq);

  (userReq.rememberMe) ? CacheService.enable() : CacheService.disable();


  AuthService
    .register(userReq)
    .then(_handleAuthSuccess)
    .catch(err => {
      console.warn(err)
    })
};

const logout = () => {

  Logger.log('Logging out.')

  AuthService.logout();
  CacheService.disable();
  dispatchRemoved();

};


const dispatchSet = () => {

  Logger.log('Dispatching TOKEN_SET')

  AppDispatcher.dispatch({
    type: AuthConstants.TOKEN_SET
  });

};

const dispatchRemoved  = () => {

  Logger.log('Dispatching TOKEN_REMOVED')

  AppDispatcher.dispatch({
    type: AuthConstants.TOKEN_REMOVED,
  });

};

export const AuthActions = {

  setFromCache,
  login,
  logout,
  dispatchSet,
  dispatchRemoved,
  register

};
