const express = require('express');
const router = express.Router();

const AuthOps = require('../auth/AuthOps');

const UserService = require('../services/UserService');
const GroupService = require('../services/GroupService');
const TaskService = require('../services/TaskService');

const RequestFilter = require('../mixins/RequestFilter');


/**
 * defines required params for a new task request
 *  'title'     {String}    The text for the task being created
 *  'groupId'   {String}    The owning groups name
 *  'favorite'  {Boolean}   Indiciates if the task should be saved to users favorites 
 */
const validateTodoReq = new RequestFilter(['title', 'groupId', 'toFave']);


/**
 * route used to handle task creation
 * 
 */
router.post('/create', 
  AuthOps.verifyAuth,
  (req, res) => {

    const token = req.get('Authorization');
    const taskReq = req.body.taskReq;

    console.log('creating', req.body.taskReq)

    if (!validateTodoReq.validate(taskReq)) 
      return res.status(400).json({status: 400, msg: 'Task request not valid'})
    

    /**
     * Get user profile
     */
    UserService
      .getByToken(token)
      .then(user => {

        /**
         * Get users group specified in request
         */
        const group = user.memberOf.filter(group => {
          return (group.name.toString() === taskReq.groupId) ? true : false
        })[0];
        
        /**
         * if no matching user group found, reject request
         */
        if (group === undefined) 
          return res.status(400).json({status: 400, msg: 'User is not a member of that group...'});


        /**
         * Create new task
         */
        TaskService
          .createTask(user, group, taskReq)
          .then(task => {

            const favorite = (taskReq.toFave) ? UserService.addFavorite(user, task) : undefined;

            ////////////////////////// STAGED FOR REMOVAL ////////////////////////
            // /**
            //  * If task is to be favorited, create new favorite object
            //  * and push to user's favroties
            //  * 
            //  * SHOULD BE A USER SERVICE CALL TO addFavorite(user, task)
            //  */
            // if (taskReq.favorite) {
            //   favorite = {
            //     id: task._id.toString(),
            //     title: task.title.toString()
            //   };
            //   user.favorites.push(favorite)
            //   user.save()
            // }
            //////////////////////////////////////////////////////////////////////

            /**
             * On success, return new task and item to favorite
             */
            res.status(200).json({task: task, toFave: favorite})
          })
          .catch(err => {
            res.status(err.status).json(err);
          });

      })
      .catch(err => {
        res.status(err.status).json(err);
      })

});

/**
 * route used to handle task completion
 * 
 */
router.put('/complete',
  AuthOps.verifyAuth,
  (req, res) => {
    
    const token = req.get('Authorization');
    const taskId = req.body.id

    if (typeof taskId !== 'string' || taskId.length === 0)
      return res.status(400).json({status: 400, msg: "Invalid completion request"})

    /**
     * Get user profile
     */
    UserService
      .getByToken(token)
      .then(user => {

        /**
         * Mark task completed
         */
        TaskService
          .completeTask(taskId, user)
          .then(task => {

            /**
             * On success, send updated task
             */
            res.status(200).json({task: task})
          })
          .catch(err => {
            res.status(err.status).json(err)
          })
      })
      .catch(err => {
        res.status(err.status).json(err)
      })

  });


/**
 * route used to handle task removal
 * 
 */
router.post('/remove', 
  AuthOps.verifyAuth,
  (req, res) => {

    const token = req.get('Authorization');
    const taskId = req.body.id;

    if (typeof taskId !== 'string' || taskId.length === 0)
      return res.status(400).json({status: 400, msg: "Invalid removal request"})

    /**
     * Get user ID from auth token
     */
    AuthOps
      .decryptToken(token)
      .then(userId => {

        /**
         * Remove task
         */
        TaskService
          .removeTask(taskId, userId)
          .then(() => {

            /**
             * On succsss, send OK response
             */
            res.sendStatus(200);
          })
          .catch(err => {
            res.status(err.status).json(err);
          });

      })


  });

  router.post('/edit', 
    AuthOps.verifyAuth,
    (req, res) => {

      const token = req.get('Authorization');
      const taskId = req.body.taskId;
      const taskTitle = req.body.taskTitle;
      
      if (typeof taskId !== 'string' || typeof taskTitle !== 'string' || taskId.length === 0 || taskTitle.length === 0) 
        return res.status(400).json({status: 400, msg: 'Invalid edit request'})

      /**
     * Get user ID from auth token
     */
      AuthOps
        .decryptToken(token)
        .then(userId => {

          /**
           * Apply edit to task
           */
          TaskService
            .editTask(taskId, taskTitle, userId)
            .then(task => {

              /**
               * On success, send updated task
               */
              res.status(200).json({task: task});
            })
            .catch( err => {
              res.status(err.status).json(err);
            })
        })
        .catch(err => {
        res.status(err.status).json(err);
      });


  });

module.exports = router;
