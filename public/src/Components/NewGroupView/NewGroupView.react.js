import React, { Component } from 'react';

import { CreateGroup } from './CreateGroup.react.js';
import { JoinGroup } from './JoinGroup.react.js';

export const NewGroupView = ({

}) => {
  return (
    <div>
      <CreateGroup />
      <JoinGroup />
    </div>
  );
};