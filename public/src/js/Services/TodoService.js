import * as axios from 'axios';


import { CacheService } from './CacheService';

class _TodoService {

  constructor() {

    this._cacheKey = 'todos';
  
  } 

  cacheTodos(todos) {
    CacheService.cache(this._cacheKey, todos)
  }

  getTodosFromCache() {
    return CacheService.get(this._cacheKey);
  }

  clearTodos() {
    CacheService.remove(this._cacheKey);
  }

  createTodo(ownerId, todoReq) {

    
    return new Promise((res, rej) => {

      // axios.post('todo/')

      axios.post('task/create', {
        taskReq: {
          task: todoReq,
          groupId: ownerId
        }
      })
      .then(response => {
        res(response.data.task);
      })
      .catch(err => {
        rej(err.response.data);
        // rej(err.response.data);
      });
      // res({text: 'API RETURNED TODO'});
      
    });

  }

  markComplete(todoId) {

    return new Promise((res, rej) => {

      axios.put('task/complete', {
        id: todoId
      })
      .then(response => {
        res(response.data.task);
        // res(response.data.task)
      })
      .catch(err => {
        rej(err.response.data);
      });

    });


  }

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

  

  // _getFromCache() {
  //   return CacheService.get(this._cacheKey);
  // }

  // storeTodo(todo) {
  //   CacheService.cache(this._cacheKey, todo);
  // }

  // fromStorage() {
  //   return this._getFromCache();
  // }

}


export const TodoService = new _TodoService();
