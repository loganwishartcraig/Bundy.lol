import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { GroupConstants } from '../Constants/GroupConstants';
import { GroupService } from '../Services/GroupService';

import { DisplayActions } from './DisplayActions';
import { UserActions } from './UserActions';

const init = (groups) => {

  GroupService
    .getLastActive()
    .then(lastActive => {

      setActive(groups.reduce((toSet, n, i) => {

        return (n.name === lastActive) ? n.name : toSet;

      }, (groups.length > 0) ? groups[0].name : undefined));

    })
    .catch(err => {
      if (groups.length > 0) setActive(groups[0].name);
    });
      setAll(groups);

};


const joinGroup = (groupReq) => {

  GroupService
    .joinGroup(groupReq)
    .then(group => {
      addGroup(group);
      DisplayActions.viewTodos();
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
      DisplayActions.viewTodos();
      UserActions.updateUser();
    })
    .catch(err =>{
      console.error('GroupActions -> createGroup() |', err)
    })

};


const setActive = (name) => {
  console.log('GroupActions.js -> setActive() | Setting active:', name)
  AppDispatcher.dispatch({
    type: GroupConstants.SET_ACTIVE,
    name: name
  });
  
  GroupService.saveLastActive(name); 

};



const setGroup = (group) => {
  AppDispatcher.dispatch({
    type: GroupConstants.SET_GROUP,
    group: group
  });
};


const setAll = (groups) => {
  AppDispatcher.dispatch({
    type: GroupConstants.SET_ALL,
    groups: groups
  });
};


const addGroup = group => {

  AppDispatcher.dispatch({
    type: GroupConstants.ADD_GROUP,
    group: group
  });

  setActive(group.name);

};



const leaveGroup = (groupId) => {
  AppDispatcher.dispatch({
    type: GroupConstants.LEAVE_GROUP,
    groupId: groupId
  });
};

const resetGroups = () => {

  GroupService.clearLastActive();
  AppDispatcher.dispatch({
    type: GroupConstants.RESET_GROUPS
  });
  
};

export const GroupActions = {

  init,
  setAll,
  setGroup,
  addGroup,
  setActive,
  leaveGroup,
  joinGroup,
  createGroup,
  resetGroups
};
