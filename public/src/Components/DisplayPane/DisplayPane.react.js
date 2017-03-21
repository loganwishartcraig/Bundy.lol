import React, { Component } from 'react';

import { DisplayStore } from '../../Stores/DisplayStore';
import { DisplayActions } from '../../Actions/DisplayActions';

import { ViewConstants } from '../../Constants/ViewConstants';

import { TodoView } from '../TodoView/TodoView.react.js'
import { NewGroupView } from '../NewGroupView/NewGroupView.react.js';
import { NewTodoView } from '../NewTodoView/NewTodoView.react.js';

const getDisplayState = () => ({
  view: DisplayStore.getActiveView()
});


class DisplayPane extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      view: ViewConstants.TODO_VIEW
    };

    this._handleDisplayChange = this._handleDisplayChange.bind(this);
  }

  _handleDisplayChange() {
    console.log('handling display chacnge')
    this.setState(getDisplayState());
  }

  componentWillMount() {
    // GroupActions.initGroups(this.props.memberOf);
    DisplayStore.setListener(this._handleDisplayChange);
  }

  componentWillUnmount() {
    DisplayStore.unsetListener(this._handleDisplayChange);
  }

  renderView(view) {

    switch(view) {
      case ViewConstants.TODO_VIEW:
        return <TodoView />;
        break;
      case ViewConstants.NEW_GROUP_VIEW:
        return <NewGroupView />
        break;
      case ViewConstants.NEW_TODO_VIEW:
        return <NewTodoView />
        break;
      default:
        return <span>Uh oh, unknown view :/ (should return todos)</span>;
        break;

    }

  }

  render() {
    return(
      <div>
        <span>DISPLAY PANE</span><button onClick={() => {
          DisplayActions.viewTodos();
        }}>Goto Todos</button>
        {this.renderView(this.state.view)}
      </div> 
    );
  }

}


export { DisplayPane };