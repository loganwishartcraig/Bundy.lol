const express = require('express');
const router = express.Router();

const RequestFilter = require('../mixins/RequestFilter')

const GroupService = require('../services/GroupService');
const UserService = require('../services/UserService');

const AuthOps = require('../auth/AuthOps');

/**
 * defines required params for create/join group requests
 *  'name'       {String}    Name of the group to add
 *  'password'   {String}    Password for the group
 */
const validateGroupReq = new RequestFilter(['name', 'password']);



/**
 * Handles service errors, returning message to client
 * Closure over req & res
 *
 * @param      {Object}  err     The error object {status: {Integer}, msg: {String}}
 * @param      {Express Request}  req     The request
 * @param      {Express Response}  res     The response
 */
const _handleError = (req, res) => (err => {
  res.status(err.status).json(err); 
})

/**
 * route used to handle group creation
 * 
 */
router.post('/create', 
  AuthOps.verifyAuth,
  (req, res) => {

  const groupReq = Object.assign({}, req.body.groupReq);

  if (validateGroupReq.validate(groupReq)) {

    const token = req.get('Authorization');

    /**
     * Get user profile
     */
    UserService
      .getByToken(token)
      .then(user => {

        /**
         * Create a new group
         */
        GroupService
          .createGroup(groupReq, user)
          .then(group => {

            /**
             * on success, send new group to client
             */
            res.status(200).json({group: group.toObject()})
          })
          .catch(err => {
            res.status(err.status).json(err)
          });
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

  } else {

    res.status(400).json({status: 400, msg: 'Invalid group request'});

  }

});


/**
 * route used to handle group joins
 * 
 */
router.post('/join',
  AuthOps.verifyAuth,
  (req, res) => {
  
  const groupReq = Object.assign({}, req.body.groupReq);

  if (validateGroupReq.validate(groupReq)) {

    let token = req.get('Authorization');

    /**
     * Get user profile
     */
    UserService
      .getByToken(token)
      .then(user => {

        /**
         * Check if user is already a member
         */
        for (let i = 0; i < user.memberOf.length; i++) {
          if (groupReq.name === user.memberOf[i].name.toString()) 
            return res.status(400).json({status: 400, msg: "Already a member"});
        }

        /**
         * Join the group
         */
        GroupService
          .joinGroup(groupReq, user)
          .then(group => {

             /**
             * on success, send new group to client
             */
            res.status(200).json({group: group.toObject()});
          })
          .catch(err => {
            res.status(err.status).json(err);
          })
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

  } else {

    res.status(400).json({status: 400, msg: 'Invalid group request'});

  }

});


/**
 * route used to handle leaving groups
 * 
 */
router.post('/leave', 
  AuthOps.verifyAuth,
  (req, res) => {

    const token = req.get('Authorization');
    const groupId = req.body.id;

    /**
     * Get user profile
     */
    UserService
      .getByToken(token)
      .then(user => {

        /**
         * Leave grouup
         */
        GroupService
          .leaveGroup(groupId, user)
          .then(() => {

            /**
             * on success send OK status
             */
            res.sendStatus(200)
          })
          .catch(err => {
            res.status(err.status).json(err);
          });
      
      })
      .catch(err => {
        res.status(err.status).json(err);
      });

});

module.exports = router;