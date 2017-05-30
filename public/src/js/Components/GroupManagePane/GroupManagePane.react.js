import React, { Component } from 'react';

import { GroupActions } from '../../Actions/GroupActions';


/**
 * Component used to manage a group. 
 * Lists group member and allows a user to leave their group  
 *
 * @class      GroupManagePane (name)
 */
export default class GroupManagePane extends Component {
  constructor(props, context) {
    super(props, context)

    this._handleLeave = this._handleLeave.bind(this);
  }

  _handleCancel(evt) {
    GroupActions.endManage()
  }

  _handleLeave(evt) {
    GroupActions.leaveGroup(this.props.ownerId)
  }

  
  render() {
    return (
      <div className="group--manage--container flex-col">
        <h3 className="bar--header--pink full">Manage {this.props.ownerId}</h3>
        <span className="line--header--pink full">Current Members</span>
        <ul className="group--member--list">
          {(this.props.members) ? this.props.members.map((member, i) => (<li key={i} className="group--member">{member.fName} {member.lName}</li>)) : null}
        </ul>
        <div className="group--member--actions">
          <button className="btn--lg wire--btn--blue btn--back" onClick={this._handleCancel} type="button">Back</button> 
          <button className="btn--lg wire--btn--red btn--warn" onClick={this._handleLeave} type="button">Leave Group</button>
        </div>
      </div>
    )
  }
}