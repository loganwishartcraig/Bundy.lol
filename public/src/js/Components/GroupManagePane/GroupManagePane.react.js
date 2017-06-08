import React, { Component } from 'react';

import { GroupActions } from '../../Actions/GroupActions';


const _handleLeave = groupId => {
  GroupActions.leaveGroup(groupId);
};

const _handleCancel = evt => {
  GroupActions.endManage();
};


/**
 * Component used to manage a group. 
 * Lists group member and allows a user to leave their group  
 *
 * @class      GroupManagePane (name)
 * @param      {Object}  arg1          Component props
 * @param      {String}  arg1.ownerId  ID of group being managed
 * @param      { [ Object ] }  arg1.members  Members of group being managed
 * @return     {Object}  React component
 */
const GroupManagePane = ({
  ownerId,
  members
}) => (
  <div className="group--manage--container flex-col">
    <h3 className="bar--header--pink full">Manage {ownerId}</h3>
    <span className="line--header--pink full">Current Members</span>
    <ul className="group--member--list">
      {(members) ? members.map((member, i) => (<li key={i} className="group--member">{member.fName} {member.lName}</li>)) : null}
    </ul>
    <div className="group--member--actions">
      <button className="btn--lg wire--btn--blue btn--back" onClick={_handleCancel} type="button">Back</button> 
      <button className="btn--lg wire--btn--red btn--warn" onClick={() => _handleLeave(ownerId)} type="button">Leave Group</button>
    </div>
  </div>
);

export default GroupManagePane;
