import { EventEmitter } from 'events';

import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { ErrorConstants } from '../Constants/ErrorConstants';

class _ErrorStore extends EventEmitter {

  constructor() {
    super();
    this._activeErr = undefined;
  }
  
  getError() {
    return this._activeErr
  }

  setError(msg) {
    if (typeof msg !== 'string') return;
    this._activeErr = msg
  }

  hasError() {
    return (this._activeErr !== undefined)
  }

  resetError() {
    this._activeErr = undefined;
  }

  emitChange() {
    this.emit('change');
  }

  setListener(callback) {
    this.on('change', callback);
  } 

  unsetListener(callback) {
    this.removeListener('change', callback);
  }

};

const ErrorStore = new _ErrorStore();

AppDispatcher.register(action => {

  Logger.log('Action recieved!', action)

  switch(action.type) {

    case ErrorConstants.SET_ERROR:
      ErrorStore.setError(action.msg);
      ErrorStore.emitChange();
      break;
    default:
      ErrorStore.resetError()
      break;

  }

}); 

export default ErrorStore;