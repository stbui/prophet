import React from 'react';
import { Route } from 'react-router';
import { Prophet, Resource } from 'prophet-core';
import { Layout, CatchAll } from 'prophet-antd';
import dataProvider from './dataProvider';
import Dashboard from './dashboard';
import Menu from './Menu/Menu';
import Brand from './Menu/Brand';
import users from './setting/users';
import goodsCategory from './goods/category';

import './App.scss';

const Show = props => <div>custom</div>;

export default () => (
    <Prophet
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
        <Resource name="goods/list" {...users} />
        <Resource name="goods/category" {...goodsCategory} />
    </Prophet>
);
