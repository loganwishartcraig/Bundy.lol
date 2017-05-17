import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import Logger from '../Utility/Logging';

import { ErrorActions } from '../Actions/ErrorActions';

import { CacheService } from '../Services/CacheService';
import { GroupService } from '../Services/GroupService';

import { GroupConstants } from '../Constants/GroupConstants';


const handleReqFail = err => {
  if (err.msg) ErrorActions.setError(err.msg);  
}

const setFromCache = () => {

  AppDispatcher.dispatch({
    type: GroupConstants.SET_GROUPS_FROM_CACHE
  });

};


const joinGroup = (groupReq) => {

  Logger.log('Joining group', groupReq);

  GroupService
    .joinGroup(groupReq)
    .then(group => {
      Logger.log('Group joined!', group);
      addGroup(group)
    })
    .catch(handleReqFail);

};

const createGroup = (groupReq) => {

  Logger.log('Creating Group...', groupReq)

  GroupService
    .createGroup(groupReq)
    .then(group => {
      Logger.log('Group created!', group);
      addGroup(group);
    })
    .catch(handleReqFail)

};


const setActive = (groupName) => {

  AppDispatcher.dispatch({
    type: GroupConstants.SET_ACTIVE,
    groupName: groupName
  });

};


const addGroup = group => {

  AppDispatcher.dispatch({
    type: GroupConstants.ADD_GROUP,
    group: group
  });

};

const startAdd = () => {

  AppDispatcher.dispatch({
    type: GroupConstants.START_ADD
  })

};

const cancelAdd = () => {

  AppDispatcher.dispatch({
    type: GroupConstants.CANCEL_ADD
  });

};

const startJoin = () => {

  AppDispatcher.dispatch({
    type: GroupConstants.START_JOIN
  });

};

const startCreate = () => {

  AppDispatcher.dispatch({
    type: GroupConstants.START_CREATE
  });

};

const startManage = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.START_MANAGE
  });
};

const endManage = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.END_MANAGE
  })
}


const removeGroup = (groupId) => {

  AppDispatcher.dispatch({
    type: GroupConstants.REMOVE_GROUP,
    id: groupId
  });
};

const leaveGroup = (groupId) => {

  GroupService
    .leaveGroup(groupId)
    .then(() => {
      removeGroup(groupId);
    })
    .catch(err => {
      console.warn('got err', err);
    });


};

export const GroupActions = {

  setFromCache,
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
