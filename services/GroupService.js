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
            group.createdBy = user.id;
            group.save();

        user.memberOf.push(group);
        user.createdGroups.push(group.id);
        user.save();

        res(group);

      })
      .catch(err => {
        console.log(err)
        rej({status: 500, msg: 'Error looking up group.'})
      });

  });

};

const joinGroup = (groupReq, user) => {


  return new Promise((res, rej) => {
    
    GroupModel
      .findOne({name: groupReq.name})
      .then(existing => {
        console.log('JOINING GROUP', existing)
        if (!existing) return rej({status: 400, msg: 'Group doesnt exist.'});
        if (groupReq.password !== existing.password) return rej({status: 400, msg: 'Incorrect password'});
        res();
      })
      .catch(err => {
        console.log(err)
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