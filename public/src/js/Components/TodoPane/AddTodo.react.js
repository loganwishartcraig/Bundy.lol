import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

import { TodoActions } from '../../Actions/TodoActions';

import CreateTodo from './CreateTodo.react';
import FaveList from './FaveList.react';

const _handleShowFaves = evt => {
  TodoActions.showFaves();
};

const _handleShowCreate = evt => {
  TodoActions.startCreate();
};


/**
 * Component used to handle adding new todos
 * Will render either the 'create' page, or a users 'favorites list' depending on props
 *
 * @class      AddTodo (name)
 * @param      {Object}  arg1               Component props
 * @param      {Boolean}  arg1.showFaves     Indicates if the faves list shoudl be displayed
 * @param      {String}  arg1.addTo         The Group ID to push created todos to
 * @param      {Boolean}  arg1.hasFavorites  Indicates if favorites are available
 * @param      { [ Object ] }  arg1.favorites     List of favorites
 * @return     {Object}  React Component
 */
const AddTodo = ({
  showFaves,
  addTo,
  hasFavorites,
  favorites
}) => (

  <div className="add--todo--container flex-col"> 
    <div className="add--todo--tabs tab--container">
      <button className="btn--tab" type="button" onClick={_handleShowCreate} className={(!showFaves) ? 'page--tab active' : 'page--tab'}>Create New</button>
      <button className="btn--tab" type="button" onClick={_handleShowFaves} className={(showFaves) ? 'page--tab active' : 'page--tab'}>From Favorites</button> 
    </div>
    {(showFaves) ?
        <FaveList addTo={addTo} hasFavorites={hasFavorites} favorites={favorites} />
      :
        <CreateTodo addTo={addTo} />
    }
  </div>

);

export default AddTodo;
