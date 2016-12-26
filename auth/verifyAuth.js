const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  let authHeader = req.get('Authorization');
  console.log('\tverifying', authHeader);

  if (authHeader === undefined)
    return res.status(403).json({status: 403, msg: 'Not authorized'});

  if ((typeof authHeader !== 'string') || (authHeader.length === 0))
    return res.status(403).json({status: 403, msg: 'Misconfigured authroization'});

  console.log(`verifying auth for ${token}`)

  next();

};