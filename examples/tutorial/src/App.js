import React, { Component } from 'react';
import { Admin, Resource } from '@admin/core';
import Dashboard from './Dashboard';

const List = props => <div>list</div>;

class App extends Component {
  render() {
    return (
      <Admin dashboard={Dashboard}>
        <Resource
          name="materials"
          list={List}
          edit="edit"
          create="create"
          show="show"
        />
      </Admin>
    );
  }
}

export default App;
