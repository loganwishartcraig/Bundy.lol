const UserModel = require('../models/UserModel'),
      AuthOps = require('../auth/AuthOps');


/**
 * Generic function for user document retrieval.
 *
 * @param      {Object}   query   A query object with a key value pair to search for. e.x. {email: 'john@doe.com'}
 * @return     {Promise}  Promise resolves with matched user document if found, or client-ready error if not.
 */
const _getBy = (query) => {
  return new Promise((res, rej) => {

    /**
     * Query DB for the user, populating nested fields
     */
    UserModel
      .findOne(query)
      .populate({
        path: 'memberOf',
        select: '_id name members tasks createdBy',
        populate: [{
          path: 'tasks',
          model: 'Task',
          select: '_id title createdBy dateCreated completed completedBy dateCompleted'
        }, {
          path: 'members',
          model: 'User',
          select: '_id fName lName'
        }]
      })
      .then(user => {

        /**
         * If user exists, return else return error
         */
        if (user === null) return rej({status: 400, msg: 'User not found'});
        res(user);
      })
      .catch(err => {
        rej({status: 500, msg: `Error looking user up`});
      });

  });
};


/**
 * Fetch user document via email
 *
 * @param      {String}  email   Email to search
 * @return     {Promise}  Promise resolves with user document, or client-ready error.
 */
const getByEmail = email => {

  return _getBy({email: email});

};


/**
 * Fetch user document via user ID.
 *
 * @param      {String}   userId  The user's document ID.
 * @return     {Promise}  Promise resolves with user document, or client-ready error.
 */
const getById = userId => {

  return _getBy({_id: userId});

};


/**
 * Fetch user document via authentication token
 *
 * @param      {String}   token   The unaltered 'Authentication' header from a given request
 * @return     {Promise}  Promise resolves with user document, or client-ready error.
 */
const getByToken = token => {
  return new Promise((res, rej) => {

    console.log(`\t|- UserService --> getByToken(${token.split('.')[2].substr(0, 5).concat('...')}) --> Getting user by token`);

    /**
     * Decrypt token before seraching
     */
    AuthOps
      .decryptToken(token)
      .then(userId => {

        /**
         * Token decryption yeilds user ID.
         */
        console.log(`\t|- UserService --> getByToken(${token.split('.')[2].substr(0, 5).concat('...')}) --> Decrypted token userId: ${userId}`);
        _getBy({_id: userId})
          .then(user => res(user))
          .catch(err => rej(err));
      })
      .catch(err => rej(err));
  });

};

/**
 * Creates a new user document
 *
 * @param      {Object}   userObject  Contains profile info for the user. See 'required fields' in /models/UserModel.js
 * @return     {Promise}  Promise resolves with user document if successful, client-ready error if not.
 */
const createUser = userObject => {
  return new Promise((res, rej) => {

    /**
     * Look up existing user, if found, reject user creation request.
     */
    UserModel
      .findOne({email: userObject.email})
      .then(existing => {

        if (existing) return rej({status: 400, msg: `Email already in use.`});


        /**
         * Create new user document & save
         */
        const user = new UserModel(userObject);

        user.save(err => {

          if (err) return rej({status: 500, msg: 'Error writing user to db'});
          return res(user);

        });

      })
      .catch(err => {
        rej({status: 500, msg: 'Error looking up user'});
      });

  });
};


/**
 * Adds a 'favorite' task to a users favorite list.
 * Assumes a mongoose document is passed for the 'user' argument.
 *
 * @param      {Document}  user    The user document
 * @param      {Document}  task    The task document
 * @return     {Object}  The created 'favorite' object that will be saved.
 */
const addFavorite = (user, task) => {

  const favorite = {
    id: task._id.toString(),
    title: task.title.toString()
  };

  console.log('adding favorite', favorite, user, task)
  user.favorites.push(favorite);
  user.save();

  return favorite;

};

/**
 * Removes a 'favorite' task from a users favorite list
 *
 * @param      {String}   userId  The user identifier
 * @param      {String}   faveId  Identifier for favorite to remove
 * @return     {Promise}  Promise resolves on successful removal, rejects with client-ready error otherwise
 */
const removeFavorite = (userId, faveId) => {
  return new Promise((res, rej) => {
      
    _getBy({_id: userId})
      .then(user => {

        /**
         * Remove favorites via filtering.
         */
        user.favorites = user.favorites.filter(favorite => favorite.id !== faveId)
        user.save();
        res();
      })
      .catch(err => {
        rej(err);
      })

  })
}

module.exports = {
  getByEmail,
  getById,
  getByToken,
  createUser,
  addFavorite,
  removeFavorite
};