import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { GroupConstants } from '../Constants/GroupConstants';
import { GroupService } from '../Services/GroupService';

import { DisplayActions } from './DisplayActions';
import { UserActions } from './UserActions';

const initGroups = (groupIds = []) => {


};

const resetActive = (groupIds) => {

}

const setAll = (groups) => {
  AppDispatcher.dispatch({
    type: GroupConstants.SET_ALL,
    groups: groups
  });
};




const setGroup = (group) => {
  AppDispatcher.dispatch({
    type: GroupConstants.SET_GROUP,
    group: group
  });
};

const addGroup = group => {

  AppDispatcher.dispatch({
    type: GroupConstants.ADD_GROUP,
    group: group
  })

};

const unsetGroup = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.UNSET_GROUP
  });
};



const setActive = (group) => {
  console.log('setting active', group)
  GroupService.saveLastActive(group); 
  AppDispatcher.dispatch({
    type: GroupConstants.SET_ACTIVE,
    group: group
  });
};

const leaveGroup = (groupId) => {
  AppDispatcher.dispatch({
    type: GroupConstants.LEAVE_GROUP,
    groupId: groupId
  });
};

const joinGroup = (groupReq) => {

  GroupService
    .joinGroup(groupReq)
    .then(group => {
      addGroup(group);
      DisplayActions.gotoTodos();
      UserActions.updateUser();
    })
    .catch(err => {
      console.error('GroupActions -> createGroup() | ', err);
    });

};

const createGroup = (groupReq) => {

  console.log('GroupActions -> createGroup(', groupReq, ')')

  GroupService
    .createGroup(groupReq)
    .then(group => {
      addGroup(group);
      DisplayActions.gotoTodos();
      UserActions.updateUser();
    })
    .catch(err =>{
      console.error('GroupActions -> createGroup() |', err)
    })

};

export const GroupActions = {

  setGroup,
  unsetGroup,
  addGroup,
  setActive,
  leaveGroup,
  joinGroup,
  createGroup
};
