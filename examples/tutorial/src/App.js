import React, { Component } from 'react';
import { Admin, Resource } from '@admin/core';
import Dashboard from './Dashboard';

const List = props => <div>list</div>;
const Edit = props => <div>edit</div>;
const Create = props => <div>create</div>;
const Show = props => <div>show</div>;

class App extends Component {
  render() {
    return (
      <Admin dashboard={Dashboard}>
        <Resource
          name="materials"
          list={List}
          edit={Edit}
          create={Create}
          show={Show}
        />
        <Resource
          name="forms"
          list={List}
          edit={Edit}
          create={Create}
          show={Show}
        />
      </Admin>
    );
  }
}

export default App;
