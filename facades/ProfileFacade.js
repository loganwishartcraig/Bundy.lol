const AuthOps = require('../auth/AuthOps');

const UserService = require('../services/UserService');
const GroupService = require('../services/GroupService');
const TaskService = require('../services/TaskService');


const getProfileByToken = (token) => {

  return new Promise((res, rej) => {

    AuthOps
      .decryptToken(token)
      .then(userId => {

        UserService
          .getById(userId)
          .then(user => {
            let payload = {user: user.toObject()}

            payload.groups = user.memberOf.slice(0)

            delete payload.user.memberOf;
            
            res(payload)
          })
          .catch(err => {
            rej(err)
          });

      })
      .catch(err => {
        rej(err);
      })
  });

};


module.exports = {
  getProfileByToken: getProfileByToken
};