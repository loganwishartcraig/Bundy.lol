const mongoose = require('mongoose'),
      GroupModel = require('../models/GroupModel')
      // UserService = require('./UserService');


const createGroup = (groupReq, user) => {

  return new Promise((res, rej) => {
    console.log('GroupService.js -> createGroup()', groupReq);

    GroupModel
      .findOne({name: groupReq.name})
      .then(existing => {
        if (existing) return rej({status: 400, msg: 'Group already exists.'});

        let group = new GroupModel(groupReq);
            console.log(user)
            group.members.push(user);
            group.save();

        user.memberOf.push(group);
        user.createdGroups.push(group.id);
        user.save();

        res({
          group: group,
          user: user
        });



      })
      .catch(err => {
        console.log(err)
        rej({status: 500, msg: 'Error looking up group.'})
      });

  });

};


const getGroup = (groupId) => {

};

const joinGroup = (userId, groupId) => {

};

module.exports = {

  createGroup: createGroup,
  getGroup: getGroup,
  joinGroup: joinGroup

};