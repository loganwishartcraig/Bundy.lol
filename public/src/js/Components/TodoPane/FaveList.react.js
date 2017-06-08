import React, { Component } from 'react'

import { TodoActions } from '../../Actions/TodoActions';
import { UserActions } from '../../Actions/UserActions';


const _handleTodoEnd = evt => {
  TodoActions.endCreate();
};

const _handleTodoCreate = evt => {
  TodoActions.startCreate();
};

const _handleFaveDel = faveId => (
  evt => {
    UserActions.deleteFave(faveId);
  }
);

const _handleTodoRequest = (title, groupId) => {

  const todoReq = {
    groupId: groupId,
    title: title,
    toFave: false
  };

  return evt => { TodoActions.createTodo(todoReq); };

};

/**
 * Renders a users favoirte todos as a list
 * Allows user to push a new todo from this list
 *
 * @class      FaveList (name)
 * @param      {Object}  arg1               Component props
 * @param      {Boolean}  arg1.hasFavorites  Indicates if favorites are available
 * @param      { [ Object ] }  arg1.favorites     The favorites list
 * @param      {String}  arg1.addTo         ID of the group to add todo to
 * @return     {Object}  React component
 */
const FaveList = ({
  hasFavorites,
  favorites,
  addTo
}) => (
  <div className="todo--fave--container flex-col">

    {(hasFavorites) ? <span className="todo--create--desc">Pick from your favorites below</span> : null}
    
    <ul className={(hasFavorites) ? "todo--list todo--fave--list" : "todo--list todo--fave--list empty"}>

      {/* If no favorites, show empty favorite message */}
      {(!hasFavorites) ? <li>No favorites... <br/> Try <button onClick={_handleTodoCreate} className="empty--req--add light--text--btn">creating</button> a todo</li>: null}

      {/* Map over favorites, provide new entry for each fave. 
        * !! -- Could likely abstract to 'FaveEntry' component
        * !! -- Coule likely use event bubbling
        */}
      {(hasFavorites) ? (favorites.map((fave, i) => {
        return (
          <li className="todo--item todo--fave" key={i}>
            <button onClick={_handleTodoRequest(fave.title, addTo)} className="wire--btn--pink btn--md" type="button">Request It</button>
            <span className="todo--meta">{fave.title}</span>
            <button onClick={_handleFaveDel(fave.id)} className="fave--del--btn text--btn--grey btn--delete v-align-p" type="button">Delete</button>
          </li>
        )
      })) : null}

    </ul>
    <div className="todo--fave--actions">
      <button className="btn--cancel wire--btn--blue btn--lg" onClick={_handleTodoEnd} type="button">Cancel</button>
    </div>
  </div>
);

export default FaveList;