import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { DisplayConstants } from '../Constants/DisplayConstants';
import { ViewConstants } from '../Constants/ViewConstants';

const viewTodos = () => {

  AppDispatcher.dispatch({
    type: DisplayConstants.UPDATE_VIEW,
    view: ViewConstants.TODO_VIEW
  })

};

const viewGroupAdd = () => {

  AppDispatcher.dispatch({
    type: DisplayConstants.UPDATE_VIEW,
    view: ViewConstants.NEW_GROUP_VIEW
  });

};

export const DisplayActions = {

  viewTodos,
  viewGroupAdd

};
