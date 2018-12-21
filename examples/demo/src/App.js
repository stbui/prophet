import React, { Component } from 'react';
import { Route } from 'react-router';
import { Admin, Resource } from 'prophet-core';
import { Layout, CatchAll } from 'prophet-antd';
import dataProvider from './dataProvider';
import Dashboard from './dashboard';
import Menu from './Menu';
import Brand from './Menu/Brand';
import { appList, appDetail } from './container/applications';
import { resourceList } from './container/resources';
import { InterfaceList } from './container/interfaces';
import users from './setting/users';

import './App.scss';

const Show = props => <div>custom</div>;

class App extends Component {
  render() {
    return (
      <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
        layout={Layout}
        menu={Menu}
        brand={Brand}
        login={CatchAll}
        catchAll={() => <CatchAll auth={403} />}
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
        <Resource name="setting/user" {...users} />
      </Admin>
    );
  }
}

export default App;
