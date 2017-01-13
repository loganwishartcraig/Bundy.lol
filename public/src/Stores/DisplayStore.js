import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import { DisplayConstants } from '../Constants/DisplayConstants';

// import { PaneConstants } from '../Constants/PaneConstants';

import { EventEmitter } from 'events';

class _DisplayStore extends EventEmitter {

  constructor() {
    super();
    this.activePage = undefined;   
    this.events = {
      change: 'CHANGE'
    }
  }

  setPage(pageName) {
    this.activePage = pageName;
  }

  getActivePage() {
    return this.activePage;
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
    case DisplayConstants.UPDATE_PAGE:
      DisplayStore.setPage(action.page)
      DisplayStore.emitChange();
      break;
    default:
      break;

  }

});

export { DisplayStore };

