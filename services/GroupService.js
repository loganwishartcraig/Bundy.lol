const mongoose = require('mongoose'),
      GroupModel = require('../models/GroupModel');


const createGroup = (groupReq) => {

  return new Promise((res, rej) => {
    console.log('GroupService.js -> createGroup() -- NOT IMPLEMENTED --', groupReq)
    res(groupReq);
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