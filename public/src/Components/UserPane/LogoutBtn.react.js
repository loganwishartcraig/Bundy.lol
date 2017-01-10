import React, { Component } from 'react';

import { AuthActions } from '../../Actions/AuthActions'

const _handleLogout = (e) => {
  AuthActions.logout();
}

export const LogoutBtn = ({}) => (
    <button onClick={_handleLogout}>Logout</button>
);