import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { GroupConstants } from '../Constants/GroupConstants';
import { GroupService } from '../Services/GroupService';

import { DisplayActions } from './DisplayActions';
import { UserActions } from './UserActions';

const init = (groups) => {

  GroupService
    .getLastActive()
    .then(lastActive => {

      console.log('GroupActions.js -> init() | Setting last active', lastActive)

      for (let i = 0; i < groups.length; i++) 
        if (groups[i].name === lastActive) setActive(groups[i]);    

      setAll(groups);

    })
    .catch(err => {
      console.error('GroupActions.js -> init() |', err)
      setAll(groups);
      if (groups.length > 0) setActive(groups[0]);
    });

};

// const resetActive = (groupIds) => {

// }

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
  });

  setActive(group);


};

const unsetGroup = () => {
  AppDispatcher.dispatch({
    type: GroupConstants.UNSET_GROUP
  });
};

const setActive = (group) => {
  console.log('GroupActions.js -> setActive() | Setting active:', group)
  AppDispatcher.dispatch({
    type: GroupConstants.SET_ACTIVE,
    group: group
  });
  GroupService.saveLastActive(group.name); 
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

  init,
  setAll,
  setGroup,
  unsetGroup,
  addGroup,
  setActive,
  leaveGroup,
  joinGroup,
  createGroup
};
