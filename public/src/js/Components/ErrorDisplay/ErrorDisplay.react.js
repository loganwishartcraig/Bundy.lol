import React, { Component } from 'react';
import ErrorStore from '../../Stores/ErrorStore';

/**
 * Gets current error state from store
 */
const getErrorState = () => ({
  hasError: ErrorStore.hasError(),    // Boolean indicating error available
  errMsg: ErrorStore.getError()       // String containing the error message
});


/**
 * Component for rendering the active error message
 * Renders a span containing active error text
 *
 * @class      ErrorDisplay (name)
 */
export default class ErrorDisplay extends Component {
  constructor(props, context) {
    
    super(props, context)

    /**
     * Initial state
     */
    this.state = getErrorState();

    this._handleErrorChange = this._handleErrorChange.bind(this);
  
  }

  _handleErrorChange() {
    this.setState(getErrorState())
  }

  componentWillMount() {
    ErrorStore.setListener(this._handleErrorChange);
  }

  componentWillUnmount() {
    ErrorStore.unsetListener(this._handleErrorChange);
  }

  /**
   * Renders compononet if error message exists, will add classes {String} attached to 'addClass' prop.
   *
   * @return     {Component}  Error message component, or null if no error is active
   */
  render() {
    return (this.state.hasError) ? <span className={(this.props.addClass) ? "err--msg ".concat(this.props.addClass) : "err--msg"}>{this.state.errMsg}</span> : null
  }
}