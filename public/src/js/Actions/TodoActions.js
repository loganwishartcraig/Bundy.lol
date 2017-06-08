import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { ErrorActions } from './ErrorActions';

import { TodoConstants } from '../Constants/TodoConstants';
import { TodoService } from '../Services/TodoService';


/**
 * Internal function used to handle AJAX request failures.
 * Sets the error message if available
 *
 * @param      {Object}  err     The server-returned error message {msg: String, status: Integer}
 */
const _handleReqFail = err => {
  console.warn(err);
  if (err.msg) ErrorActions.setError(err.msg);  
};


/**
 * Action used to create a new todo
 *
 * @param      {Object}  todoReq  The todo request object, {title: String, groupId: String, toFave: Boolean}
 */
const createTodo = (todoReq) => {

  TodoService
    .createTodo(todoReq)
    .then(res => {

      /**
       * Fires action based on if todo was to be added to favorite list
       */
      (res.toFave) ? addAndFaveTodo(res.task, res.toFave) : addTodo(res.task)

    })
    .catch(_handleReqFail);

};


/**
 * Action used to delete a todo.
 * Deletes server-side then removes.
 *
 * @param      {String}  todoId  The todo identifier
 */
const deleteTodo = todoId => {
  TodoService
    .deleteTodo(todoId)
    .then(() => { removeTodo(todoId); })
    .catch(_handleReqFail)
};


/**
 * Action used to mark a todo as complete.
 * Updates server-sied then updates todo.
 *
 * @param      {todoId}  todoId  ID of the todo to mark complete
 */
const markComplete = todoId => {
  TodoService
    .markComplete(todoId)
    .then(todo => { updateTodo(todoId, todo); })
    .catch(_handleReqFail);
};




/**
 * Action used to comit an edit to a todo
 * Updates client-side then updates todo.
 *
 * @param      {String}  newText  The new todo text
 * @param      {String}  todoId   ID of the todo to update
 * @param      {String}  userId   ID of the user updating
 */
const comitEdit = (newText, todoId, userId) => {

  TodoService
    .comitEdit(newText, todoId, userId)
    .then(todo => { updateTodo(todoId, todo); })
    .catch(_handleReqFail)

};

/**
 * Action used to add a todo
 *
 * @param      {Object}  todo    The todo object to add.
 */
const addTodo = todo => {
  AppDispatcher.dispatch({
    type: TodoConstants.ADD_TODO,
    todo: todo
  });
};


/**
 * Action used to add and favorite a todo
 * 
 * !! -- Rework to expect boolean toFave and have UserStore implement todo --> fave entry transform
 *
 * @param      {Object}  todo    The todo object to add
 * @param      {Object}  toFave  The todo favorite object
 */
const addAndFaveTodo = (todo, toFave) => {
  AppDispatcher.dispatch({
    type: TodoConstants.ADD_AND_FAVE_TODO,
    todo: todo,
    toFave: toFave
  });
};

/**
 * Action used to update a todo
 *
 * @param      {String}  todoId  ID of the todo to update
 * @param      {Object}  todo    The todo object to update with
 */
const updateTodo = (todoId, todo) => {
  AppDispatcher.dispatch({
    type: TodoConstants.UPDATE_TODO,
    id: todoId,
    todo: todo
  });
};



/**
 * Action used to remove a todo
 *
 * @param      {String}  todoId  ID of the todo to remove
 */
const removeTodo = todoId => {
  AppDispatcher.dispatch({
    type: TodoConstants.REMOVE_TODO,
    id: todoId
  });
};


/**
 * Action used to set the active todo filter
 *
 * @param      {String}  filterId  The ID of the filter
 */
const setFilter = filterId => {

  AppDispatcher.dispatch({
    type: TodoConstants.SET_FILTER,
    id: filterId
  });

};


/**
 * Action used to start creating a todo
 */
const startCreate = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.START_CREATE
  });
};


/**
 * Action used to end creating a todo
 */
const endCreate = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.END_CREATE
  });
};


/**
 * Action used to start a todo edit
 *
 * @param      {String}  todoId  ID of the todo to edit
 */
const startEdit = todoId => {
  AppDispatcher.dispatch({
    type: TodoConstants.START_EDIT,
    id: todoId
  });
};


/**
 * Action used to end an edit
 */
const endEdit = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.END_EDIT
  });
};

/**
 * Action used to show the favorites lits
 */
const showFaves = () => {
  AppDispatcher.dispatch({
    type: TodoConstants.SHOW_FAVES
  });
};


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
  comitEdit,
  showFaves
}