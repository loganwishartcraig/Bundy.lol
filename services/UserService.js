const mongoose = require('mongoose'),
      UserModel = require('../models/UserModel'),
      AuthOps = require('../auth/AuthOps');;

// const AuthService = require('./AuthService');


const getUser = email => {
  return new Promise((res, rej) => {

  UserModel
    .findOne({email: email})
    .populate({
      path: 'memberOf',
      select: 'id name members tasks createdBy -_id'
    })
    .then((user) => {
      if (user) res(user);
      else rej({status: 400, msg: `User '${email}' not found`});
    })
    .catch((err) => {
      rej({status: 500, msg: `Error looking up user '${email}'`})
    })

  });
};

const createUser = userObject => {
  return new Promise((res, rej) => {

    UserModel
      .findOne({email: userObject.email})
      .then(existing => {

        if (existing) return rej({status: 400, msg: `Email "${userObject.email}" already used.`});

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

const removeUser = email => {
  UserModel
    .findOneAndRemove({email: email})
    .then(err => {
      if (err) console.log('\t', err);
    });
};

const getByToken = token => {
  return new Promise((res, rej) => {

    console.log('\t|- UserService --> getByToken() --> Getting user by token');

    AuthOps
      .decryptToken(token)
      .then(userId => {

        /// ***** ABSTRACT TO FUNCTION THAT TAKES A QUERY OBJECT *****
        UserModel
          .findOne({id: userId})
          .populate({
            path: 'memberOf',
            select: 'id name members tasks createdBy -_id'
          })
          .then(user => {
            if (!user) return rej({status: 400, msg: 'User not found'});
            res(user);
          })
          .catch(err => {
            rej({status: 500, msg: 'Error looking up user'});
          });

      })
      .catch(err => { rej(err); })  
  });
};

module.exports = {
  getUser,
  createUser,
  removeUser,
  getByToken
};