import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { ErrorActions } from './ErrorActions';
import { ProfileActions } from './ProfileActions'

import { CacheService } from '../Services/CacheService';
import { AuthConstants } from '../Constants/AuthConstants';
import { AuthService } from '../Services/AuthService';


import { UserActions } from './UserActions';


/**
 * Sets users authentication from cache.
 */
const setFromCache = () => {

  AuthService
    .setFromCache()
    .then(() => {

      /**
       * If successful, dispatch 'auth set' action & initate update of cached profile info
       */
      AuthActions.dispatchSet();
      ProfileActions.updateProfile();
    })
    .catch(() => {

      /**
       * If not found, dispatch 'auth unset' aciton
       */
      AuthActions.dispatchRemoved();  
    });

};


/**
 * Internal function to handle service errors.
 * Fires an error action from the message {String} returned from the service.
 * 
 * @param      {Object}  err     The error object. Should be {status: Integer, msg: String}
 */
const _handleReqFail = err => {
  if (err.msg) ErrorActions.setError(err.msg);  
};


/**
 * Internal funciton to handle successful auth requests
 *
 * @param       {Object}  payload   The response from an auth request { user: Object, groups: [ Object ] }
 */
const _handleReqSuccess = payload => {
  dispatchSet(payload.user, payload.groups);
};


/**
 * Action used to log in
 *
 * @param      {Object}  credentials  User provided log in credentials. {email: String, password: String, rememberMe: Boolean}
 */
const login = credentials => {

  Logger.log('Attempting login...', credentials);

  /**
   * Enables caching based on user provided 'rememberMe' parameter.
   */
  (credentials.rememberMe) ? CacheService.enable() : CacheService.disable();

  /**
   * Auth service validates login reqeust
   */
  AuthService
    .login(credentials)
    .then(_handleReqSuccess)
    .catch(_handleReqFail);

};



/**
 * Action used to regiseter an account
 *
 * @param      {Object}  userReq  User info for registration {email: String, fName: String, lName: string, password: String, rememberMe: Boolean}
 */
const register = userReq => {

  Logger.log('Attempting login...', userReq);

  /**
   * Enables caching based on user provided 'rememberMe' parameter.
   */
  (userReq.rememberMe) ? CacheService.enable() : CacheService.disable();

  /**
   * Auth service makes registration request
   */
  AuthService
    .register(userReq)
    .then(_handleReqSuccess)
    .catch(_handleReqFail);
    
};


/**
 * Action used to logout
 */
const logout = () => {

  Logger.log('Logging out.')

  /**
   * Remove authentication headers
   */
  AuthService.logout();

  /**
   * Disable caching
   */
  CacheService.disable();

  /**
   * Dispatch 'removed' status for stores
   */
  dispatchRemoved();

};


/**
 * Dispatches an action indicating authentication has been set
 * User & groups parameters are optional. If left undefined, group/user stores will pull from cache
 *
 * @param      {Object}  user    The user's profile object [OPTIONAL]
 * @param      { [ Object ] }  groups  The user's group list [OPTIONAL]
 */
const dispatchSet = (user, groups) => {

  Logger.log('Dispatching TOKEN_SET')

  AppDispatcher.dispatch({
    type: AuthConstants.TOKEN_SET,
    user: user,
    groups: groups
  });

};


/**
 * Dispatches an action letting stores know authentication has been removed
 *
 */
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
