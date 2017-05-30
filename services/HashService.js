const HashModel = require('../models/HashModel');

const bcrypt = require('bcryptjs');


/**
 * Internal implementation of bcrypt hashing for passwords
 *
 * @param      {String}   password  The plain-text password
 * @return     {Promise}  Resolves with hashed password {String} on success, rejects with bcrypt error otherwise.
 */
const _genrateHash = password => {

  return new Promise((res, rej) => {

    /**
     * Hash using bcrypt + 12 salt rounds
     */
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) rej(err);
      else res(hash);  
    });
    
  });

};


/**
 * Gets a users stored password hash
 *
 * @param      {String}   userId  User ID to look up the hash for
 * @return     {Promise}  Resolves with users hash {String} on success, client-ready error otherwise
 */
const getHash = userId => {

  return new Promise((res, rej) => {

    HashModel
      .findOne({userId: userId})
      .then(hashRecord => {
        console.log('\t|- HashService --> getHash() --> Hash query complete');
        if (hashRecord) res(hashRecord.hash);
        else rej({status: 500, msg: 'Error processing credentials'});
      })
      .catch(err => {
        console.log('\t|- HashService --> getHash() --> Error looking up hash');
        rej({status: 500, msg: 'Error processing credentials'});
      });  

  });

};


/**
 * Hashes and stores a given users password
 * !! -- Currently just overwites existing records if found
 *
 * @param      {String}   userId    User ID to store password for
 * @param      {String}   password  The plain-text password
 * @return     {Promise}  Resolves on success, rejects with client-ready error otherwise
 */
const setHash = (userId, password) => {

  return new Promise((res, rej) => {

    console.log(`\t|- HashService --> setHash(${userId}, ${password}) --> Setting hash`);

    HashModel
      .findOne({userId: userId})
      .then(record => {

        console.log('\t|- HashService --> setHash() --> Hash query complete');

        _genrateHash(password)
          .then(hash => {
            
            console.log('\t|- HashService --> setHash() --> Generated hash');

            /**
             * If hash already found, overwrite entry, otherwise create new entry.
             */
            if (record) {

              record.hash = hash;

              record.save((err) => {
                if (err) rej({status: 500, msg: 'Error processing credentials'});
                else res();
              });

            } else {

              const stagedHash = new HashModel({
                userId: userId,
                hash: hash
              });

              stagedHash.save((err) => {
                if (err) rej({status: 500, msg: 'Error processing credentials'});
                else res();
              })

            }


          })
          .catch(err => {
            rej({status: 500, msg: 'Error processing credentials'});
          });

      })
      .catch(err => {
        rej({status: 500, msg: 'Error processing credentials'});
      });  

  });

};



module.exports = {

  getHash: getHash,
  setHash: setHash

};