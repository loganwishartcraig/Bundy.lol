import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { ErrorActions } from './ErrorActions';
import { ProfileActions } from './ProfileActions'

import { CacheService } from '../Services/CacheService';
import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';


import { UserActions } from './UserActions';


const setFromCache = () => {
  AuthService
    .setFromCache()
    .then(() => {
      AuthActions.dispatchSet();
      ProfileActions.updateProfile();
    })
    .catch(() => {
      AuthActions.dispatchRemoved();  
    });
};

const handleReqFail = err => {
  if (err.msg) ErrorActions.setError(err.msg);  
};

const login = credentials => {

  Logger.log('Attempting login...', credentials);

  (credentials.rememberMe) ? CacheService.enable() : CacheService.disable();

  AuthService
    .login(credentials)
    .then(payload=> {
      dispatchSet(payload.user, payload.groups)
    })
    .catch(handleReqFail);

};

const register = (userReq) => {

  Logger.log('Attempting login...', userReq);

  (userReq.rememberMe) ? CacheService.enable() : CacheService.disable();

  AuthService
    .register(userReq)
    .then(payload=> {
      dispatchSet(payload.user, payload.groups)
    })
    .catch(handleReqFail);
    
};

const logout = () => {

  Logger.log('Logging out.')

  AuthService.logout();
  CacheService.disable();
  dispatchRemoved();

};


const dispatchSet = (user, groups) => {

  Logger.log('Dispatching TOKEN_SET')

  AppDispatcher.dispatch({
    type: AuthConstants.TOKEN_SET,
    user: user,
    groups: groups
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
