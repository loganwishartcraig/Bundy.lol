import React, { Component } from 'react'

import { TodoActions } from '../../Actions/TodoActions';
import { UserActions } from '../../Actions/UserActions';

export default class FaveList extends Component {
  constructor(props, context) {
    super(props, context)

    this._handleTodoRequest = this._handleTodoRequest.bind(this)
  }

  _handleTodoEnd(evt) {
    TodoActions.endCreate();
  }

  _handleTodoCreate(evt) {
    TodoActions.startCreate();
  }

  _handleFaveDel(faveId) {
    return function(evt) {
      UserActions.deleteFave(faveId);
    }
  }

  _handleTodoRequest(title) {
    return function(evt) {
      TodoActions.createTodo(this.props.addTo, {
        title: title
      });
    }.bind(this)
  }

  render() {
    return(
      <div className="todo--fave--container flex-col">
        {(this.props.hasFavorites) ? <span className="todo--create--desc">Pick from your favorites below</span> : null}
        <ul className={(this.props.hasFavorites) ? "todo--list todo--fave--list" : "todo--list todo--fave--list empty"}>

          {(!this.props.hasFavorites) ? <li>No favorites... <br/> Try <button onClick={this._handleTodoCreate} className="empty--req--add light--text--btn">creating</button> a todo</li>: null}

          {this.props.favorites.map((fave, i) => {
            return <li className="todo--item todo--fave" key={i}><button onClick={this._handleTodoRequest(fave.title)} className="wire--btn--pink btn--md" type="button">Request It</button><span className="todo--meta">{fave.title}</span><button onClick={this._handleFaveDel(fave.id)} className="fave--del--btn text--btn--grey btn--delete v-align-p" type="button">Delete</button></li>
          })}

        </ul>
        <div className="todo--fave--actions">
          <button className="btn--cancel wire--btn--blue btn--lg" onClick={this._handleTodoEnd} type="button">Cancel</button>
        </div>
      </div>
    )
  }
}