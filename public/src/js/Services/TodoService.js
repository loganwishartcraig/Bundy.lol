import * as axios from 'axios';


import { CacheService } from './CacheService';

class _TodoService {

  constructor() {

  } 

  /**
   * Used to make todo creation requests
   * 
   * !! -- Rework to just expect a todo object returned & resolve with that explicitly
   *
   * @param      {Object}   todoReq  Request object for the todo to create
   * @return     {Promise}  Resolves with new todo (and fave entry if indicated in request) on success, rejects with error payload otherwise
   */
  createTodo(todoReq) {

    
    return new Promise((res, rej) => {

      axios.post('task/create', {
        taskReq: todoReq
      })
      .then(response => {
        res(response.data);
      })
      .catch(err => {
        rej(err.response.data);
      });
    });

  };


  /**
   * Used to make a completion request
   *
   * @param      {String}   todoId  ID of the todo to complete
   * @return     {Promise}  Resolves with new todo object on success, rejects with error payload otherwise
   */
  markComplete(todoId) {

    return new Promise((res, rej) => {

      axios.put('task/complete', {
        id: todoId
      })
      .then(response => {
        res(response.data.task);
      })
      .catch(err => {
        rej(err.response.data);
      });

    });

  }


  /**
   * Used to make a deletion request
   *
   * @param      {String}   todoId  ID of the todo to delete
   * @return     {Promise}  Resolves on successful delete, rejects with error payload otherwise
   */
  deleteTodo(todoId) {

    return new Promise((res, rej) => {

      axios.post('task/remove', {
        id: todoId
      })
      .then(response => {
        console.warn('would delete todo')
        res();
      })
      .catch(err => {
        rej(err.response.data);
      });

    });

  }

  /**
   * Used to make an edit request to a todo
   *
   * @param      {String}   todoTitle  New text for the todo
   * @param      {String}   todoId     ID of the todo to update
   * @return     {Promise}  Resolves with new todo object on success, rejects with error payload otherwise
   */
  comitEdit(todoTitle, todoId) {
    return new Promise((res, rej) => {
      console.warn(todoTitle, todoId);
      axios.post('task/edit', {
        taskId: todoId,
        taskTitle: todoTitle
      })
      .then(response => {
        res(response.data.task);
      })
      .catch(err => {
        rej(err.response.data);
      });

    });
  }

}


export const TodoService = new _TodoService();
