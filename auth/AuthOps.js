const jwt = require('jsonwebtoken');
const authConfig = require('./config');

const _decrypt = token => {

 return new Promise((res, rej) => {

    if (token === undefined)
      return rej();

   if (typeof token !== 'string' || token.length === 0)
      return rej();

    jwt.verify(token.split(' ')[1], authConfig.secret, (err, decoded) => {
      if (err) return rej();
      else res(decoded.sub);
    });
    
  });


}

const verifyAuth = (req, res, next) => {

  // CREATE A 'HAS TOKEN, BUT OUT OF DATE' CASE HANDLER

  let token = req.get('Authorization');
  // if (token === undefined) return res.status(err.st)
  console.log(`\t|- AuthOps --> verifyAuth(${token.split('.')[2].substr(0, 5).concat('...')}) --> Verifying Token`);

  decryptToken(token)
    .then(() => {
      console.log('\t|- AuthOps --> verifyAuth() --> Token OK');
      next();
    })
    .catch(err => {
      console.log('\t|- AuthOps --> verifyAuth() --> Token REJECTED');
      res.status(err.status).json(err);
    });

}; 

const decryptToken = token => {

  return new Promise((res, rej) => {

    if (token === undefined)
      return rej({status: 403, msg: 'Not authorized'});

    if (typeof token !== 'string' || token.length === 0)
      return rej({status: 403, msg: 'Misconfigured authroization'});

    _decrypt(token)
      .then(decoded => {
        res(decoded);
      })
      .catch(() => {
        rej({status: 403, msg: 'Malformed authorization'});
      });

  });

};

module.exports = {
  verifyAuth,
  decryptToken
};