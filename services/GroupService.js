const mongoose = require('mongoose'),
      GroupModel = require('../models/GroupModel'),
      crypto = require('crypto');
      // UserService = require('./UserService');


const _assignMembership = (group, user) => {

  

};

const _assignOwnership = (group, user) => {

}

const createGroup = (groupReq, user) => {

  return new Promise((res, rej) => {
    console.log(`\t|- GeroupService --> createGorup() --> User: '${user.id}' creating Group: '${groupReq.name}'`);

    GroupModel
      .findOne({name: groupReq.name})
      .populate({
        path: 'members',
        select: 'id'
      })
      .then(existing => {
        if (existing) return rej({status: 400, msg: 'Group already exists.'});

        let group = new GroupModel(groupReq);

        group.members.push(user);
        group.createdBy = user.id;
        group.id = crypto.randomBytes(20).toString('hex');

        user.memberOf.push(group);
        user.createdGroups.push(group.id);

        group.save();
        user.save();

        res(group);

      })
      .catch(err => {
        console.log(err)
        rej({status: 500, msg: 'Error looking up group.'});
      });

  });

};

const joinGroup = (groupReq, user) => {


  return new Promise((res, rej) => {
    
    console.log(`\t|- GeroupService --> joinGorup() --> User: '${user.id}' attempting to join group: '${groupReq.name}'`);

    GroupModel
      .findOne({name: groupReq.name})
      .populate({
        path: 'members',
        select: 'id -_id'
      })
      .then(existing => {
        if (!existing) return rej({status: 400, msg: 'Group doesnt exist.'});

        console.log(`\t|- GeroupService --> joinGorup() --> Found group: '${existing.name}' with members '${existing.members.join(', ')}'`);

        for (let i = 0; i < existing.members.length; i++) {
          if (existing.members[i].id === user.id) return rej({status: 400, msg: 'User is already a member'});
        }

        if (groupReq.password !== existing.password) return rej({status: 400, msg: 'Incorrect password'});

        console.log(`\t|- GeroupService --> joinGorup() --> Adding user to group`);

        existing.members.push(user);
        user.memberOf.push(existing);

        existing.save();
        user.save();
              
        res(existing);
      })
      .catch(err => {
        rej({status: 500, msg: 'Error looking up group.'})
      });

  });

};

const getGroup = (groupId) => {

};


module.exports = {

  createGroup: createGroup,
  getGroup: getGroup,
  joinGroup: joinGroup

};