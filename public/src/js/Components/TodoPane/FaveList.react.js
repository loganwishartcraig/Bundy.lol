import React, { Component } from 'react'

import { TodoActions } from '../../Actions/TodoActions';
import { UserActions } from '../../Actions/UserActions';


/**
 * Renders a users favoirte todos as a list
 * Allows user to push a new todo from this list
 *
 * @class      FaveList (name)
 */
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

  /**
   * Handnles adding todo from  favorite.
   * Provies an event hanlder to each 'favorite' item with closure over it's title.
   * 
   * !! -- Could be reworked to use event bubbling
   *
   * @param      {String}  title   The title of the todo
   * @return     {Function}  The event handler that adds the todo when called.
   */
  _handleTodoRequest(title) {
    return function(evt) {
      TodoActions.createTodo(Object.assign({groupId: this.props.addTo}, {
        title: title,
        toFave: false
      }));
    }.bind(this)
  }

  render() {
    return(
      <div className="todo--fave--container flex-col">

        {(this.props.hasFavorites) ? <span className="todo--create--desc">Pick from your favorites below</span> : null}
        
        <ul className={(this.props.hasFavorites) ? "todo--list todo--fave--list" : "todo--list todo--fave--list empty"}>

          {/* If no favorites, show empty favorite message */}
          {(!this.props.hasFavorites) ? <li>No favorites... <br/> Try <button onClick={this._handleTodoCreate} className="empty--req--add light--text--btn">creating</button> a todo</li>: null}

          {/* Map over favorites, provide new entry for each fave. 
            * !! -- Could likely abstract to 'FaveEntry' component
            */}
          {(this.props.hasFavorites) ? (this.props.favorites.map((fave, i) => {
            return (
              <li className="todo--item todo--fave" key={i}>
                <button onClick={this._handleTodoRequest(fave.title)} className="wire--btn--pink btn--md" type="button">Request It</button>
                <span className="todo--meta">{fave.title}</span>
                <button onClick={this._handleFaveDel(fave.id)} className="fave--del--btn text--btn--grey btn--delete v-align-p" type="button">Delete</button>
              </li>
            )
          })) : null}

        </ul>
        <div className="todo--fave--actions">
          <button className="btn--cancel wire--btn--blue btn--lg" onClick={this._handleTodoEnd} type="button">Cancel</button>
        </div>
      </div>
    )
  }
}