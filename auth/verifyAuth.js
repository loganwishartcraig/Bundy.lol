const jwt = require('jsonwebtoken');
const authConfig = require('./config');

module.exports = (req, res, next) => {

  let token = req.get('Authorization');
  console.log('\tverifying', token);

  if (token === undefined)
    return res.status(403).json({status: 403, msg: 'Not authorized'});

  if (typeof token !== 'string' || token.length === 0)
    return res.status(403).json({status: 403, msg: 'Misconfigured authroization'});

  console.log()

  jwt.verify(token.split(' ')[1], authConfig.secret, (err, decoded) => {
    if (err) res.status(403).json({status: 403, msg: 'Malformed authorization'});
    else next();
  })


};