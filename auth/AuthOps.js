const jwt = require('jsonwebtoken');
const authConfig = require('./config');

const verifyAuth = (req, res, next) => {

  // CREATE A 'HAS TOKEN, BUT OUT OF DATE' CASE HANDLER

  let token = req.get('Authorization');
  console.log('\tverifying', token);

  decryptToken(token)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(err.status).json(err);
    });

}; 

const decryptToken = token => {

  return new Promise((res, rej) => {

    if (token === undefined)
      return rej({status: 403, msg: 'Not authorized'});

   if (typeof token !== 'string' || token.length === 0)
      return rej({status: 403, msg: 'Misconfigured authroization'});

    jwt.verify(token.split(' ')[1], authConfig.secret, (err, decoded) => {
      if (err) return rej({status: 403, msg: 'Malformed authorization'});
      else res(decoded.sub);
    });
    
  });

};

module.exports = {
  verifyAuth,
  decryptToken
};