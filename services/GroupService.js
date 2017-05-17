const mongoose = require('mongoose'),
      GroupModel = require('../models/GroupModel'),
      crypto = require('crypto');



const _getBy = (query) => {
  return new Promise((res, rej) => {
    GroupModel
      .findOne(query)
      .populate([{
        path: 'members',
        select: '_id fName lName'
      },{
        path: 'tasks'
      }])
      .populate()
      .then(group => {
        console.log(`\t|- GroupService --> _getBy() --> result of query`, JSON.stringify(query), group)
        if (group === null) return rej({status: 400, msg: 'Group not found'});
        res(group)
      })
      .catch(err => {
        rej({status: 500, msg: 'Error looking up group'})
      })
  });
}

const createGroup = (groupReq, user) => {

  return new Promise((res, rej) => {

    console.log(`\t|- GroupService --> createGorup() --> User: '${user.id}' creating Group: '${groupReq.name}'`);

    _getBy({name: groupReq.name})
      .then(existing => {
        console.log(`\t|- GroupService --> createGorup() --> Group already exists`)
        rej({status: 400, msg: 'Group already exists.'});
      })
      .catch(() => {

        console.log(`\t|- GroupService --> createGorup() --> No existing found, creating....`)

      let group = new GroupModel(groupReq)
          group.members.push(user)
          group.createdBy = user._id        

        console.log(`\t|- GroupService --> createGorup() --> Created! Associating...`, group)

        user.memberOf.push(group);

        console.log(`\t|- GroupService --> createGorup() --> Associated! Saving....`)

        user.save();
        group.save(err => {
          if (err) return rej({status: 500, msg: "Failed to save group info"})
          GroupModel.populate(group, {
            path: 'members',
            select: '_id fName lName'
          }).then(populated => {
            res(populated);
          }).catch(err => {
            rej({status: 500, msg: "Error populating group members"});
          });
        });

      });

  });

};

const joinGroup = (groupReq, user) => {

  return new Promise((res, rej) => {
    
    console.log(`\t|- GroupService --> joinGorup() --> User: '${user.id}' attempting to join group: '${groupReq.name}'`);

    _getBy({name: groupReq.name})
      .then(existing => {

        for (let i = 0; i < existing.members.length; i++) {
          if (existing.members[i]._id.toString() === user._id.toString()) return rej({status: 400, msg: "Group already has user as a member"})
        }

        if (groupReq.password !== existing.password) return rej({status: 400, msg: 'Incorrect password'});

        console.log(`\t|- GroupService --> joinGorup() --> Adding user to group`);

        user.memberOf.push(existing);
        existing.members.push(user);

        user.save();
        existing.save(err => {
          if (err) return rej({status: 500, msg: "Failed to save group info"})
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

const leaveGroup = (name, user) => {
  return new Promise((res, rej) => {

    _getBy({name: name})
      .then(existing => {

        console.log(`\t|- GroupService --> leaveGroup() --> Removing user "${user.email}" from group "${name}"`);

        existing.members = existing.members.filter(member => (member._id.toString() !== user._id.toString()))
        existing.tasks.forEach(task => { 
          if (task.createdBy._id.toString() === user._id.toString()) task.remove();
        })
        user.memberOf = user.memberOf.filter(group => (group.name !== name))

        console.log(`\t|- GroupService --> leaveGroup() --> Removing!"`);

        existing.save();
        user.save();

        res();


      })
      .catch(err => {
        rej(err);
      });


  })
};

module.exports = {

  createGroup: createGroup,
  joinGroup: joinGroup,
  leaveGroup: leaveGroup

};