const mongoose = require('mongoose'),
      HashModel = require('../models/HashModel');

const bcrypt = require('bcryptjs');

const _genrateHash = (password) => {

  return new Promise((res, rej) => {

    bcrypt.hash(password, 12, (err, hash) => {
      if (err) rej(err);
      else res(hash);  
    });
    
  });

};

const getHash = (userId) => {

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

            if (record) {

              record.hash = hash;

              record.save((err) => {
                if (err) rej({status: 500, msg: 'Error processing credentials'});
                else res();
              });

            } else {

              let stagedHash = new HashModel({
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


const clearHash = (email) => {

};

module.exports = {

  getHash: getHash,
  setHash: setHash,
  clearHash: clearHash

};