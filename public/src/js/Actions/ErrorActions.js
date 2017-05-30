import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { ErrorConstants } from '../Constants/ErrorConstants';


/**
 * Action used to set an error
 *
 * @param      {String}  msg     The error message to set
 */
const setError = msg => {
  AppDispatcher.dispatch({
    type: ErrorConstants.SET_ERROR,
    msg: msg
  });
};


/**
 * Action used to clear errors
 */
const clearError = () => {
  AppDispatcher.dispatch({
    type: ErrorConstants.CLEAR_ERROR
  });
};

export const ErrorActions = {
  setError,
  clearError
};