import React, { Component } from 'react';

import { TodoStore } from '../../Stores/TodoStore';

import { TodoFilterList } from './TodoFilterList/TodoFilterList.react';
import { TodoList } from './TodoList.react';

const getTodoState = () => ({
  todos: TodoStore.getFilteredTodos()
});


class TodoPane extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = getTodoState();
  }

  _handleGroupChange() {
    console.log('handling todo change', getTodoState());
    this.setState(getTodoState());
  }

  componentWillMount() {
    // GroupActions.initGroups(this.props.memberOf);
    TodoStore.addListener(this._handleGroupChange.bind(this));
  }

  render() {
    return(
      <div>
        <div>Todo Pane</div>
        <TodoFilterList />
        <TodoList todos={this.state.todos} />
      </div> 
    );
  }

}


export { TodoPane };