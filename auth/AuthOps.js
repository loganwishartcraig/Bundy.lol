const jwt = require('jsonwebtoken');
const authConfig = require('./config');

/**
 * Internal implemention of decryption for tokens.
 * Asyncronously decrypts a JWT token
 *
 * @param      {String}   token   The token
 * @return     {Promise}  Will resolve w/ userId {String} on successful decryption, reject otherwise
 */
const _decrypt = token => {

 return new Promise((res, rej) => {

   /**
    * verify token with jwt
    */
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return rej();
      else res(decoded.sub);
    });
    
  });

}

/**
 * Utility to decrypt token
 * Provides external access to _decrypt with appropriate error responses to the client
 *
 * @param      {string}   token   HTTP 'authentication' header value
 * @return     {Promise}  Will resolvve with userId {String} on success, reject with an error obj {status: Int, msg: Str} otherwise
 */
const decryptToken = token => {

  return new Promise((res, rej) => {

    if (token === undefined)
      return rej({status: 403, msg: 'Not authorized'});

    if (typeof token !== 'string' || token.length === 0)
      return rej({status: 403, msg: 'Misconfigured authroization'});

    /**
     * Strip out 'Bearer' from auth header
     */
    const raw = token.split(' ')[1]

    _decrypt(raw)
      .then(decoded => {
        res(decoded);
      })
      .catch(() => {
        rej({status: 403, msg: 'Malformed authorization'});
      });

  });

};


/**
 * Authentication verificastion middleware. 
 * Used to auhtenticate incoming requests.
 *
 * @param      {Express Request}    req     The request
 * @param      {Express Response}    res     The resource
 * @param      {Function}  next    The 'done' callback
 */
const verifyAuth = (req, res, next) => {

  // Tood: Handle "token out of date" case

  let token = req.get('Authorization');

  console.log(`\t|- AuthOps --> verifyAuth(${token.split('.')[2].substr(0, 5).concat('...')}) --> Verifying Token`);

  /**
   * decrypt token
   * if successful, move to next function in pipeline
   * if failed, respond to client with error
   */
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



module.exports = {
  verifyAuth,
  decryptToken
};