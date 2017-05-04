const express = require('express');
const router = express.Router();

const AuthOps = require('../auth/AuthOps');

const ProfileFacade = require('../facades/ProfileFacade');

router.get('/', 
  AuthOps.verifyAuth,
  function(req, res, next) {

  // res.sendStatus(200);
  ProfileFacade
    .getProfileByToken(req.get('Authorization'))
    .then(payload => {
      res.status(200).json(payload);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
      // res.status(err.status).json(err);
    })

});

module.exports = router;