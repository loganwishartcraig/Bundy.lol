import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import { DisplayConstants } from '../Constants/DisplayConstants';
import { ViewConstants } from '../Constants/ViewConstants';
import { GroupConstants } from '../Constants/GroupConstants';
// import { PaneConstants } from '../Constants/PaneConstants';

import { EventEmitter } from 'events';

class _DisplayStore extends EventEmitter {

  constructor() {
    super();
    this.activeView = undefined;   
    this.events = {
      change: 'CHANGE'
    }
  }

  setView(view) {
    this.activeView = view;
  }

  getActiveView() {
    return this.activeView;
  }

  emitChange() {
    this.emit(this.events.change);
  }

  setListener(callback, event=this.events.change) {
    this.on(event, callback);
  } 

  unsetListener(callback, event=this.events.change) {
    this.removeListener(event, callback);
  }


};

const DisplayStore = new _DisplayStore();

AppDispatcher.register((action) => {
  // console.log('dpslay store handling action ', action, DisplayConstants)
  switch(action.type) {
    case DisplayConstants.UPDATE_VIEW:
      DisplayStore.setView(action.view)
      DisplayStore.emitChange();
      break;

    case GroupConstants.ADD_GROUP:
      DisplayStore.setView(ViewConstants.TODO_VIEW);
      DisplayStore.emitChange();
      break;

    default:
      break;

  }

});

export { DisplayStore };

