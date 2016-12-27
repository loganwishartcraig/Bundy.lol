import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { DisplayConstants } from '../Constants/DisplayConstants';
import { PaneConstants } from '../Constants/PaneConstants';

const gotoTodos = () => {

  AppDispatcher.dispatch({
    type: DisplayConstants.UPDATE_PAGE,
    page: PaneConstants.TODO_PANE
  })

};

const gotoAddGroup = () => {

  AppDispatcher.dispatch({
    type: DisplayConstants.UPDATE_PAGE,
    page: PaneConstants.ADD_GROUP_PANE
  });

};

export const DisplayActions = {

  gotoTodos,
  gotoAddGroup

};
