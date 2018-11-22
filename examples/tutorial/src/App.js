import React, { Component } from 'react';
import { Route } from 'react-router';
import { Admin, Resource } from 'prophet-core';
import dataProvider from './dataProvider';
import Dashboard from './Dashboard';
import Menu from './Menu';
import Brand from './Menu/Brand';
import { appList, appDetail } from './container/applications';
import { resourceList } from './container/resources';
import { InterfaceList } from './container/interfaces';

const List = props => <div>list</div>;
const Edit = props => <div>edit</div>;
const Create = props => <div>create</div>;
const Show = props => <div>custom</div>;
const CatchAll = props => <div>CatchAll</div>;

class App extends Component {
  render() {
    return (
      <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
        menu={Menu}
        brand={Brand}
        catchAll={CatchAll}
        customRoutes={[<Route exact path="/custom" component={Show} />]}
      >
        <Resource
          name="container/application"
          list={appList}
          show={appDetail}
        />
        <Resource name="container/resource" list={resourceList} />
        <Resource name="container/interface" list={InterfaceList} />
        <Resource name="container/application.pod" />
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
