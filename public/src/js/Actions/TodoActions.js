import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { TodoConstants } from '../Constants/TodoConstants';
import { TodoService } from '../Services/TodoService';

const createTodo = (groupId, todo) => {

  console.warn('Adding', groupId, todo)
  TodoService
    .createTodo(groupId, todo)
    .then(todo => {
      console.warn(todo);
      addTodo(todo);
    })
    .catch(err => {
      console.error(err)
    });

};

const addTodo = (todo) => {
  AppDispatcher.dispatch({
    type: TodoConstants.ADD_TODO,
    todo: todo
  });
};

const startCreate = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.START_CREATE
  });
};

const endCreate = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.END_CREATE
  });
};

const updateTodo = (todoId, todo) => {
  AppDispatcher.dispatch({
    type: TodoConstants.UPDATE_TODO,
    id: todoId,
    todo: todo
  })
};

const removeTodo = (todoId) => {
  AppDispatcher.dispatch({
    type: TodoConstants.REMOVE_TODO,
    id: todoId
  });
};

const markComplete = (todoId) => {
  TodoService
    .markComplete(todoId)
    .then(todo => {
      updateTodo(todoId, todo);
    })
    .catch(err => {
      console.warn('got err', err)
    })
};

const deleteTodo = (todoId) => {
  TodoService
    .deleteTodo(todoId)
    .then(() => {
      removeTodo(todoId);
    })
    .catch(err => {
      console.warn('got err', err)
    })
};


const setFilter = (filterId) => {

  AppDispatcher.dispatch({
    type: TodoConstants.SET_FILTER,
    id: filterId
  });

};

const startEdit = (todoId) => {
  AppDispatcher.dispatch({
    type: TodoConstants.START_EDIT,
    id: todoId
  })
};

const endEdit = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.END_EDIT
  });
};

const dispatchEdit = (todoId, todo) => {
  AppDispatcher.dispatch({
    type: TodoConstants.COMIT_EDIT,
    id: todoId,
    todo: todo
  });
};

const comitEdit = (newText, todoId, userId) => {

  TodoService
    .comitEdit(newText, todoId, userId)
    .then(todo => {
      console.warn(todo)
      dispatchEdit(todoId, todo);
    })
    .catch(err => {
      console.warn(err)
    })  

}

export const TodoActions = {
  addTodo,
  createTodo,
  startCreate,
  endCreate,
  markComplete,
  deleteTodo,
  setFilter,
  startEdit,
  endEdit,
  comitEdit
}