const bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken');

const authConfig = require('../auth/config')

const HashService = require('./HashService');

/**
 * Internal function for generating authenticaiton tokens
 * Implements JWT signature using client secret.
 *
 * @param      {String}  userId  The ID of the user recieving a token
 * @return     {String}  A JWT signed token.
 */
const _generateToken = userId => {

  /**
   * Set JWT sub param to userID
   * 
   * !! -- Currently does not set toekn expriation.
   */
  const payload = {
      sub: userId
    };

  /**
   * Generate a new token
   */
  const token = jwt.sign(payload, authConfig.secret);

  console.log(`\t|- AuthService --> _generateToken(${userId}) --> Generated token: ${token.split('.')[2].substr(0, 5).concat('...')}`);
  return token;

};


/**
 * Sets a users authentication credentials
 * Stores the encrypted password hash in the hashing DB.
 *
 * @param      {String}   userId    The user's ID
 * @param      {String}   password  The plain-text password
 * @return     {Promise}  Resolves with an auth token {String} on successful storeage, rejects with client-ready error otherwise 
 */
const setCredentials = (userId, password) => {

  console.log(`\t|- AuthService --> setCredentials(${userId}, ${password}) --> Setting credientials`);

  return new Promise((res, rej) => {

     HashService
      .setHash(userId, password)
      .then(hash => {
        console.log(`\t|- AuthService --> setCredentials(${userId}, ${password}) --> Hash was set`);
        res(_generateToken(userId));
      })
      .catch(err => {
        console.log(`\t|- AuthService --> setCredentials(${userId}, ${password}) --> Error setting hash`);
        rej(err);
      });

  });

};


/**
 * Validates a users password and provides an auth token if successful
 *
 * @param      {String}   userId    The user's ID
 * @param      {String}   password  The plain-text password from the login request
 * @return     {Promise}  Resolves with auth token {String} if password matches users entry in the hash DB. Rejects with client-ready error otherwise.
 */
const getToken = (userId, password) => {

  return new Promise((res, rej) => {

    console.log(`\t|- AuthService --> getToken(${userId}, ${password}) --> Verifying password`);

    HashService
      .getHash(userId)
      .then(hash => {

        /**
         * Compare the user provided password with the stored hash
         */
        bcrypt.compare(password, hash, (err, valid) => {
          console.log(`\t|- AuthService --> getToken(${userId}, ${password}) --> Password valid: ${valid}`);

          /**
           * On success, generate auth token and resolve
           */
          if (valid) res(_generateToken(userId));
          else rej({status: 400, msg: 'Password incorrect'}); 
        });
      })
      .catch(err => {
        rej(err);
      })

  });

};


module.exports = {
  setCredentials: setCredentials,
  getToken: getToken
}
