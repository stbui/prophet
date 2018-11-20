import React, { Component } from 'react';
import { Route } from 'react-router';
import { Admin, Resource } from 'prophet-core';
import Dashboard from './Dashboard';
import Menu from './Menu';
import jsonServerProvider from 'prophet-data-json-server';

import {
  MaterialCreate,
  MaterialEdit,
  MaterialList,
  MaterialShow
} from './materials';

const List = props => <div>list</div>;
const Edit = props => <div>edit</div>;
const Create = props => <div>create</div>;
const Show = props => <div>custom</div>;

class App extends Component {
  render() {
    return (
      <Admin
        dataProvider={jsonServerProvider('http://localhost:3000/materials.json')}
        dashboard={Dashboard}
        menu={Menu}
        customRoutes={[<Route exact path="/custom" component={Show} />]}
      >
        <Resource
          name="materials"
          create={MaterialCreate}
          edit={MaterialEdit}
          list={MaterialList}
          show={MaterialShow}
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
