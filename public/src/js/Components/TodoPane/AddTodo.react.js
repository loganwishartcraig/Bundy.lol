import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import CreateTodo from './CreateTodo.react';
import FaveList from './FaveList.react';

export default class AddTodo extends Component {
  constructor(props, context) {
    super(props, context); 
  }

  _handleShowFaves(evt) {
    TodoActions.showFaves();
  }

  _handleShowCreate(evt) {
    TodoActions.startCreate();
  }

  render() {
    return (
      <div className="add--todo--container flex-col"> 
        <div className="add--todo--tabs tab--container">
          <button className="btn--tab" type="button" onClick={this._handleShowCreate} className={(!this.props.showFaves) ? 'page--tab active' : 'page--tab'}>Create New</button>
          <button className="btn--tab" type="button" onClick={this._handleShowFaves} className={(this.props.showFaves) ? 'page--tab active' : 'page--tab'}>From Favorites</button> 
        </div>
        {(this.props.showFaves) ?
            <FaveList addTo={this.props.addTo} hasFavorites={this.props.hasFavorites} favorites={this.props.favorites} />
          :
            <CreateTodo addTo={this.props.addTo} />
        }
      </div>

    )
  }

}