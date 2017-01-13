import React, { Component } from 'react';

import { DisplayStore } from '../../Stores/DisplayStore';
import { DisplayActions } from '../../Actions/DisplayActions';

import { PaneConstants } from '../../Constants/PaneConstants';

import { TodoPane } from '../TodoPane/TodoPane.react.js'
import { AddGroupPane } from '../AddGroupPane/AddGroupPane.react.js'

const getDisplayState = () => ({
  page: DisplayStore.getActivePage()
});


class DisplayPane extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      page: PaneConstants.TODO_PANE
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

  renderPage(pageName) {

    switch(pageName) {
      case PaneConstants.TODO_PANE:
        return <TodoPane />;
        break;
      case PaneConstants.ADD_GROUP_PANE:
        return <AddGroupPane />
      default:
        return <span>Uh oh, unknown display page (should return todos)</span>;
        break;

    }

  }

  render() {
    return(
      <div>
        <span>DISPLAY PANE</span><button onClick={() => {
          DisplayActions.gotoTodos();
        }}>Goto Todos</button>
        {this.renderPage(this.state.page)}
      </div> 
    );
  }

}


export { DisplayPane };