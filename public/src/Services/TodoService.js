import * as axios from 'axios';


import { CacheService } from './CacheService';

class _TodoService {

  constructor() {

    this._cacheKey = 'bundylol_todos';
  
  } 


  createTodo(todoReq) {

    
    return new Promise((res, rej) => {

      // axios.post('todo/')

      console.log('API post', todoReq)
      axios.post('task/create', {
        task: todoReq.todo,
        groupId: todoReq.groupId
      })
      .then(response => {
        // console.log('got res', response);
        res(response.data);
      })
      .catch(err => {
        console.error(err.response.data);
        rej(err.response.data);
        // rej(err.response.data);
      });
      // res({text: 'API RETURNED TODO'});
      
    });

  }

  markCompleted(todoId, groupId) {

    console.log('API post', todoId, groupId)
    axios.put('task/complete', {
      todoId: todoId,
      groupId: groupId
    })
    .then(response => {
      console.log('got res', response)
    })
    .catch(err => {
      console.error(err.response.data);
    });

  }

  getTodo() {
    // return new Promise((res, rej) => {
    //   axios
    //     .post('todo/getTodo')
    //     .then(response => {
    //       res(response.data.todo);
    //     })
    //     .catch(err => {
    //       rej(err.response.data);
    //     });
    // });
  }

  clearStorage() {
    
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
