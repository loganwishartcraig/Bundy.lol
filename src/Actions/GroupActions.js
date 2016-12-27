import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { GroupConstants } from '../Constants/GroupConstants';
import { GroupService } from '../Services/GroupService';

const initGroup = (groupIds = []) => {

  console.log('ACTION: Initilize group', groupIds)

  updateGroups(groupIds);


  GroupService
    .getLastActive()
    .then(lastActive => {
      if (groupIds.indexOf(lastActive.id) >= 0) {
        setActive(lastActive);
        GroupService
          .fetch(lastActive.id)
          .then(groupInfo => {
            setActive(groupInfo);
            GroupService.saveLastActive(groupInfo);
          })
          .catch((err) => {console.error('ERR: GroupActions.js -> initGroup()', err)});
      } else {
        resetActive(groupIds);
      }
    })
    .catch(err => {
      console.error('ERR: GroupActions.js -> initGroup()', err);
      resetActive(groupIds);
    })

};

const resetActive = (groupIds) => {
  if (groupIds.length > 0) {
        GroupService
          .fetch(groupIds[0])
          .then(groupInfo => {
            setActive(groupInfo);
            GroupService.saveLastActive(groupInfo);
          })
          .catch(() => {});
          }

}

const updateGroups = (groupIds) => {

  console.log('ACTION: update groups', groupIds)
  
  GroupService.fetch(groupIds).then(groups => {
    console.log('group service returned: ', groups);
    setGroups(groups);
  })
  .catch(() => {});
};

const setGroups = (groups) => {
  console.log('action groups set', groups)
  AppDispatcher.dispatch({
    type: GroupConstants.SET_GROUPS,
    groups: groups
  });
}

const setGroup = (group) => {
  AppDispatcher.dispatch({
    type: GroupConstants.SET_GROUP,
    group: group
  });
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

const joinGroup = (groupId, password) => {
  AppDispatcher.dispatch({
    type: GroupConstants.JOIN_GROUP,
    groupId: groupId,
    password: password
  });
};

const createGroup = (groupReq) => {

  console.log('GroupActions -> createGroup(', groupReq, ')')

  GroupService
    .createGroup(groupReq)
    .then(group => {
      console.log('would be setting new group.', group);
    })
    .catch(err =>{
      console.log('would be dispaying error.', err)
    })

  // AppDispatcher.dispatch({
  //   type: GroupConstants.CREATE_GROUP,
  //   group: groupReq
  // });

};

export const GroupActions = {

  initGroup,
  setGroup,
  unsetGroup,
  updateGroups,
  setActive,
  leaveGroup,
  joinGroup,
  createGroup
};
