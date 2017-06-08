import React, { Component } from 'react';

import { TodoActions } from '../../Actions/TodoActions';


/**
 * Provides a todo filter item for use in the todo filter list
 * Text will be provided as child of component
 *
 * @class      TodoFilterItem (name)
 * @param      {Object}  arg1           Component props
 * @param      {String}  arg1.id        Filter ID
 * @param      {String}  arg1.active    Active filter ID
 * @param      {Object}  arg1.children  Child constains label text
 * @return     {Object}  React component
 */
const TodoFilterItem = ({
  id,
  active,
  children
}) => (
  <li className="todo--filter">
    <button data-filterid={id} className={(id === active) ? 'wire--btn--blue active' : 'wire--btn--blue'}>{children}</button>
  </li>
);

export default TodoFilterItem;
