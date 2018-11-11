import React, { Component } from 'react';
import { Admin, Resource } from '@admin/core';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Admin dashboard={Dashboard}>
        <Resource
          name="materials"
          list="list"
          edit="edit"
          create="create"
          show="show"
        />
      </Admin>
    );
  }
}

export default App;
