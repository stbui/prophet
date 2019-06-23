import React, { Component } from 'react';
import { Route } from 'react-router';
import { Admin, Resource } from 'prophet-core';
import { Layout, CatchAll } from 'prophet-antd';
import dataProvider from './dataProvider';
import Dashboard from './dashboard';
import Menu from './Menu/Menu';
import Brand from './Menu/Brand';
import users from './setting/users';

import './App.scss';

const Show = props => <div>custom</div>;

export default () => (
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
    <Resource name="user" label="用户设置" {...users} />
  </Admin>
);
