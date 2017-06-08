import React, { Component } from 'react';
import Logger from '../../Utility/Logging';

/**
 * Barebones form state manager.
 * Expects an 'input' props object defining input default values for initial state
 * Will update state on input changes & call 'onSubmit' prop when submitted.
 *
 * @class      Form (name)
 */
export default class Form extends Component {

  constructor(props, context) {
    super(props, context);

    // Expects an object {input1 name: default value, input2 name: default value, ...}
    this.state = this.props.inputs;

    this._handleChange = this._handleChange.bind(this);
  
  }

  /**
   * Update input state on change.
   *
   * @param      {Object}  e       Browser event object
   */
  _handleChange(evt) {

    const elm = evt.target.tagName.toLowerCase();

    if (elm !== 'input' && elm !== 'textarea' && elm !== 'select' && elm !== 'option') return;
    
    const type = evt.target.getAttribute('type');
    const inputName = evt.target.getAttribute('name');
    const stateChange = {};

    stateChange[inputName] = (type === 'checkbox' || type === 'radio') ? !this.state[inputName] : evt.target.value
    
    this.setState(stateChange);

  }

  render() {
    return(
      <form onSubmit={this.props.onSubmit.bind(this)} onChange={this._handleChange} method={this.props.method} action={this.props.action} className={this.props.className}>
        {this.props.children}
      </form>
    )
  }

}