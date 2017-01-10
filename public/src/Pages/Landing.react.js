import React, { Component } from 'react'
import { Link } from 'react-router';


export class Landing extends Component {


  render() {
    return (
      <div>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}
