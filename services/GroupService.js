const GroupModel = require('../models/GroupModel');


/**
 * Generic function for group document retrieval.
 *
 * @param      {Object}   query   A query object with a key value pair to search for. e.x. {name: 'AwesomeGroup'}
 * @return     {Promise}  Promise resolves with matched group document if found, or client-ready error if not.
 */
const _getBy = query => {
  return new Promise((res, rej) => {

    /**
     * Query DB for group, populating needed fields.
     */
    GroupModel
      .findOne(query)
      .populate([{
        path: 'members',
        select: '_id fName lName'
      },{
        path: 'tasks'
      }])
      .then(group => {

        console.log(`\t|- GroupService --> _getBy() --> result of query`, JSON.stringify(query), group)
        
        if (group === null) return rej({status: 400, msg: 'Group not found'});
        res(group)
     
      })
      .catch(err => {
        rej({status: 500, msg: 'Error looking up group'})
      })
  });
};


/**
 * Lets a user create a new group
 *
 * @param      {Object}   groupReq  Contains group info for the group. See 'required fields' in /models/GroupModel.js
 * @param      {Document}   user      The creating users Mongod DB document.
 * @return     {Promise}  Resolves with new group on successful creation, rejects with client-ready error otherwise
 */
const createGroup = (groupReq, user) => {

  return new Promise((res, rej) => {

    console.log(`\t|- GroupService --> createGorup() --> User: '${user._id}' creating Group: '${groupReq.name}'`);
    _getBy({name: groupReq.name})
      .then(existing => {

        /**
         * If group exists, reject.
         */
        console.log(`\t|- GroupService --> createGorup() --> Group already exists`)
        
        rej({status: 400, msg: 'Group already exists.'});
      
      })
      .catch(() => {

        console.log(`\t|- GroupService --> createGorup() --> No existing found, creating....`)

        /**
         * Create new group from request
         */
        const group = new GroupModel(groupReq);
        

        /**
         * Add user to group member list, set group creator to user.
         */
        group.members.push(user);
        group.createdBy = user._id.toString();

        console.log(`\t|- GroupService --> createGorup() --> Created! Associating...`, group)

        /**
         * Add group to users group list
         */
        user.memberOf.push(group);

        console.log(`\t|- GroupService --> createGorup() --> Associated! Saving....`)

        user.save();

        group.save(err => {
          if (err) return rej({status: 500, msg: "Failed to save group info"})

          /**
           * On successful save, re-populate group object.
           * Needed to populate creating users info correctly.
           */
          GroupModel.populate(group, {
            path: 'members',
            select: '_id fName lName'
          })
          .then(populated => {
            res(populated);
          }).catch(err => {
            rej({status: 500, msg: "Error populating group members"});
          });
        });

      });

  });

};


/**
 * Joins a user to a group
 *
 * @param      {Object}   groupReq  Contains group info for the group. See 'required fields' in /models/GroupModel.js
 * @param      {Document}   user      The joining users Mongod DB document.
 * @return     {Promise}  Resolves on with joined group on success, rejects with client-ready error otherwise.
 */
const joinGroup = (groupReq, user) => {

  return new Promise((res, rej) => {
    
    console.log(`\t|- GroupService --> joinGorup() --> User: '${user.id}' attempting to join group: '${groupReq.name}'`);

    _getBy({name: groupReq.name})
      .then(existing => {

        /**
         * Check if user is already a member of the group
         */
        for (let i = 0; i < existing.members.length; i++) {
          if (existing.members[i]._id.toString() === user._id.toString()) return rej({status: 400, msg: "Group already has user as a member"});
        }

        /**
         * Check if supplied group password is valid
         */
        if (groupReq.password !== existing.password) return rej({status: 400, msg: 'Incorrect password'});

        console.log(`\t|- GroupService --> joinGorup() --> Adding user to group`);

        /**
         * Associate user and group
         */
        user.memberOf.push(existing);
        existing.members.push(user);

        user.save();

        existing.save(err => {
          
          if (err) return rej({status: 500, msg: "Failed to save group info"});

          /**
           * On successful save, re-populate group object.
           * Needed to populate creating users info correctly.
           */
          GroupModel.populate(group, {
            path: 'members',
            select: '_id fName lName'
          }).then(populated => {
            res(populated);
          }).catch(err => {
            rej({status: 500, msg: "Error populating group members"});
          });
        });

      })
      .catch((err) => {
        rej(err);
      });

  });

};


/**
 * Removes a user from a group
 *
 * @param      {String}   name    The name of the group to leave
 * @param      {Document}   user    The user leaving
 * @return     {Promise}  Resolves on successful leave, rejects with client-ready error otherwise.
 */
const leaveGroup = (name, user) => {
  return new Promise((res, rej) => {

    _getBy({name: name})
      .then(existing => {

        console.log(`\t|- GroupService --> leaveGroup() --> Removing user "${user.email}" from group "${name}"`);

        /**
         * Remove user from group
         */
        existing.members = existing.members.filter(member => (member._id.toString() !== user._id.toString()));
        
        /**
         * Remove user created tasks from group
         */
        existing.tasks.forEach(task => { 
          if (task.createdBy._id.toString() === user._id.toString()) task.remove();
        });

        /**
         * Remove group from user
         */
        user.memberOf = user.memberOf.filter(group => (group.name !== name))

        console.log(`\t|- GroupService --> leaveGroup() --> Removing!"`);

        existing.save();
        user.save();

        res();


      })
      .catch(err => {
        rej(err);
      });

  });

};

module.exports = {

  createGroup: createGroup,
  joinGroup: joinGroup,
  leaveGroup: leaveGroup

};