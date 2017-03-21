import { AppDispatcher } from '../Dispatcher/AppDispatcher';

import { TodoConstants } from '../Constants/TodoConstants';
import { TodoService } from '../Services/TodoService';

const addTodo = (todo) => {

  AppDispatcher.dispatch({
    type: TodoConstants.ADD_TODO,
    todo: todo
  });
  
};

const markComplete = (todoId) => {

  AppDispatcher.dispatch({
    type: TodoConstants.MARK_COMPLETE,
    todo: todoId
  })

}

const createTodo = (todo) => {

  TodoService
    .createTodo(todo)
    .then(addTodo)
    .catch((err) => {
      console.log(err);
    });

};

const toggleComplete = (todoId, groupId) => {

  TodoService
    .markCompleted(todoId, groupId)
    .then(markComplete)
    .catch(err => {
      console.log(err);
    });

};

const setTodos = (todos) => {
  AppDispatcher.dispatch({
    type: TodoConstants.SET_TODOS,
    todos: todos
  });
}

const resetTodos = () => {
  TodoService.clearStorage();
  setTodos([]);
};



export const TodoActions = {
  addTodo,
  createTodo,
  toggleComplete,
  resetTodos
}