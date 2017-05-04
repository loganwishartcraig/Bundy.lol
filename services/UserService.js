const mongoose = require('mongoose'),
      UserModel = require('../models/UserModel'),
      AuthOps = require('../auth/AuthOps'),
      crypto = require('crypto');

// const AuthService = require('./AuthService');

const _getBy = (query) => {
  return new Promise((res, rej) => {
    UserModel
      .findOne(query)
      .populate({
        path: 'memberOf',
        select: 'name members tasks createdBy',
        populate: {
          path: 'tasks',
          model: 'Task',
          select: 'title createdBy dateCreated completed completedBy dateCompleted'
        }
      })
      .then(user => {
        if (user === null) return rej({status: 400, msg: 'User not found'});
        res(user);
      })
      .catch(err => {
        rej({status: 500, msg: `Error looking user up`});
      });

  });
};

const getByEmail = email => {

  return _getBy({email: email});

};

const getById = userId => {

  return _getBy({_id: userId});

}

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

const getByToken = token => {
  return new Promise((res, rej) => {

    console.log(`\t|- UserService --> getByToken(${token.split('.')[2].substr(0, 5).concat('...')}) --> Getting user by token`);

    AuthOps
      .decryptToken(token)
      .then(userId => {
        console.log(`\t|- UserService --> getByToken(${token.split('.')[2].substr(0, 5).concat('...')}) --> Decrypted token userId: ${userId}`);
        /// ***** ABSTRACT TO FUNCTION THAT TAKES A QUERY OBJECT *****
        _getBy({_id: userId})
          .then(user => res(user))
          .catch(err => rej(err));
      })
      .catch(err => { rej(err); })  
  });
};

module.exports = {
  getByEmail,
  getById,
  getByToken,
  createUser
};