const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../auth/config')

const HashService = require('./HashService');


const _generateToken = (userId) => {

  let payload = {
      sub: userId
    };
  // create a token string
  let token = jwt.sign(payload, authConfig.secret);
  console.log(`\t|- AuthService --> _generateToken(${userId}) --> Generated token: ${token.split('.')[2].substr(0, 5).concat('...')}`);
  return token;

};

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

const getToken = (userId, password) => {

  return new Promise((res, rej) => {

    console.log(`\t|- AuthService --> getToken(${userId}, ${password}) --> Verifying password`);

    HashService
      .getHash(userId)
      .then(hash => {
        bcrypt.compare(password, hash, (err, valid) => {
          console.log(`\t|- AuthService --> getToken(${userId}, ${password}) --> Password valid: ${valid}`);
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
  // generateToken: generateToken
}
