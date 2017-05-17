import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { ErrorConstants } from '../Constants/ErrorConstants';

const setError = (msg) => {
  AppDispatcher.dispatch({
    type: ErrorConstants.SET_ERROR,
    msg: msg
  });
};

const clearError = () => {
  AppDispatcher.dispatch({
    type: ErrorConstants.CLEAR_ERROR
  });
};

export const ErrorActions = {
  setError,
  clearError
};