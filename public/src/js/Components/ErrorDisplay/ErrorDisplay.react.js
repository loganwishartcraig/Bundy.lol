import React, { Component } from 'react';
import ErrorStore from '../../Stores/ErrorStore';

const getErrorState = () => ({
  hasError: ErrorStore.hasError(),
  errMsg: ErrorStore.getError()
});

export default class ErrorDisplay extends Component {
  constructor(props, context) {
    
    super(props, context)
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

  render() {
    return (this.state.hasError) ? <span className={(this.props.addClass) ? "err--msg ".concat(this.props.addClass) : "err--msg"}>{this.state.errMsg}</span> : null
  }
}