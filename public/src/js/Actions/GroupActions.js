import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import Logger from '../Utility/Logging';

import { ErrorActions } from '../Actions/ErrorActions';

import { CacheService } from '../Services/CacheService';
import { GroupService } from '../Services/GroupService';

import { GroupConstants } from '../Constants/GroupConstants';



/**
 * Internal function used to handle AJAX request failures.
 * Sets the error message if available
 *
 * @param      {Object}  err     The server-returned error message {msg: String, status: Integer}
 */
const _handleReqFail = err => {
  console.warn(err);
  if (err.msg) ErrorActions.setError(err.msg);  
};


/**
 * Action used to join groups
 * Requests server-side, then adds new group
 *
 * @param      {Object}  groupReq  The group request object {name: String, password: String}
 */
const joinGroup = groupReq => {

  Logger.log('Joining group', groupReq);

  GroupService
    .joinGroup(groupReq)
    .then(group => { addGroup(group); })
    .catch(_handleReqFail);

};


/**
 * Action used to create groups
 * Creates server-side, then adds new group
 *
 * @param      {Object}  groupReq  The group request object {name: String, password: String}
 */
const createGroup = groupReq => {

  Logger.log('Creating Group...', groupReq)

  GroupService
    .createGroup(groupReq)
    .then(group => { addGroup(group); })
    .catch(_handleReqFail)

};


/**
 * Action used to leave a group
 * Leaves group server-side then removes group
 *
 * @param      {String}  groupId  ID of the group to remove
 */
const leaveGroup = groupId => {

  GroupService
    .leaveGroup(groupId)
    .then(() => { removeGroup(groupId); })
    .catch(_handleReqFail);

};


/**
 * Action used to set the active group
 *
 * @param      {String}  groupName  Name of the group to set active
 */
const setActive = groupName => {
  AppDispatcher.dispatch({
    type: GroupConstants.SET_ACTIVE,
    groupName: groupName
  });
};


/**
 * Action used to start process of adding a group
 */
const startAdd = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.START_ADD
  });
};

/**
 * Action used to start joining a group
 */
const startJoin = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.START_JOIN
  });
};


/**
 * Action used to start creating a group
 */
const startCreate = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.START_CREATE
  });
};


/**
 * Action used to cancel process of adding a group
 */
const cancelAdd = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.CANCEL_ADD
  });
};


/**
 * Action used to add a group
 *
 * @param      {Object}  group   The group object to add
 */
const addGroup = group => {
  AppDispatcher.dispatch({
    type: GroupConstants.ADD_GROUP,
    group: group
  });
};


/**
 * Action used to start group management
 */
const startManage = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.START_MANAGE
  });
};


/**
 * Action used to end group management
 */
const endManage = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.END_MANAGE
  });
};



/**
 * Action used to remove a group
 *
 * @param      {String}  groupId  ID of the group to remove
 */
const removeGroup = groupId => {
  AppDispatcher.dispatch({
    type: GroupConstants.REMOVE_GROUP,
    id: groupId
  });
};



export const GroupActions = {

  setActive,
  joinGroup,
  createGroup,
  startAdd,
  cancelAdd,
  startJoin,
  startCreate,
  leaveGroup,
  startManage,
  endManage
  
};
