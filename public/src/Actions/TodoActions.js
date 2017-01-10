import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { TodoConstants } from '../Constants/TodoConstants';

const setTodos = (todos) => {
  AppDispatcher.dispatch({
    type: TodoConstants.SET_TODOS,
    todos: todos
  });
};

const updateTodos = (todos) => {
  AppDispatcher.dispatch({
    type: TodoConstants.UPDATE_TODOS,
    todos: todos
  });
};

const addTodo = (message) => {
  AppDispatcher.dispatch({
    type: TodoConstants.ADD_TODO
  })
};

const editTodo = (todoId, message) => {
  AppDispatcher.dispatch({
    type: TodoConstants.EDIT_TODO,
    todoId: todoId,
    message: message
  });
};

const toggleAdding = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.TOGGLE_ADDING
  });
};

const toggleFavorites = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.TOGGLE_FAVORITES
  });
};

const toggleComplete = (id) => {
  AppDispatcher.dispatch({
    type: TodoConstants.TOGGLE_COMPLETE,
    id: id
  });
};

const setFilter = (filterFunc) => {
  AppDispatcher.dispatch({
    type: TodoConstants.SET_FILTER,
    filterFunc: filterFunc
  })
};

export const TodoActions = {

  setTodos,
  updateTodos,
  toggleAdding,
  toggleFavorites,
  addTodo,
  toggleComplete,
  editTodo,
  setFilter

};