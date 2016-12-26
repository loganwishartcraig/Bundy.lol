const mongoose = require('mongoose'),
      UserModel = require('../models/UserModel');

// const AuthService = require('./AuthService');


exports.serializeUser = (user) => {

  
  let requiredKeys = [
    'email',
    'fName',
    'lName',
    'createdGroups',
    'memberOf',
    'favorites',
    'accountCreated',
    'lastLogin',
    'lastLogout',
    'tasksCompleted',
    'tasksStarted'
  ];

  return requiredKeys.reduce((serializedUser, key) => {

    serializedUser[key] = user[key];
    return serializedUser;

  }, {});

};

exports.getUser = (email) => {

  return new Promise((res, rej) => {

  UserModel
    .findOne({email: email})
    .then((user) => {
      if (user) res(user);
      else rej({status: 400, msg: `User '${email}' not found`});
    })
    .catch((err) => {
      rej({status: 500, msg: `Error looking up user '${email}'`})
    })

  });

};


exports.createUser = (userObject) => {

  return new Promise((res, rej) => {

    UserModel
      .findOne({email: userObject.email})
      .then(existing => {

        if (existing !== null) return rej({status: 400, msg: `Email "${userObject.email}" already used.`});

        let user = new UserModel(userObject);

        user.save(err => {

          if (err) return rej({status: 500, msg: 'Error writing user to db'});
          return res(user);

        });

      })
      .catch(err => {
        rej({status: 500, msg: 'Error looking up user'});
      });

  });

};

exports.removeUser = (email) => {

  UserModel
    .findOneAndRemove({email: email})
    .then(err => {
      if (err) console.log('\t', err);
    });

};