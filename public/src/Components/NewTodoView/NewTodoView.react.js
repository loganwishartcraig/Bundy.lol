import React, { Component } from 'react';

import { TodoStore } from '../../Stores/TodoStore';

const getViewState = () => ({
  showFaves: TodoStore.showFaves()
});


class NewTodoView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = getViewState();

    // this._handleTodoChange = this._handleTodoChange.bind(this);
  }

  // _handleTodoChange() {
  //   this.setState(getViewState());
  // }

  // componentWillMount() {
  //   TodoStore.setListener(this._handleTodoChange);
  // }

  // componentWillUnmount() {
  //   TodoStore.unsetListener(this._handleTodoChange);
  // }

  render() {
    return(
      <div>
        <span>New Todo View!! Adding: {(this.state.showFaves) ? 'FROM_FAVES' : 'FROM_NEW'}</span>
      </div> 
    );
  }

}


export { NewTodoView };