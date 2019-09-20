import React from 'react';
import { Route } from 'react-router';
import { Prophet, Resource, Layout, CatchAll, Login } from '@stbui/prophet';
import dataProvider from './dataProvider';
import Dashboard from './dashboard';
import authProvider from './authProvider';
import Menu from './Menu/Menu';
import Brand from './Menu/Brand';
import users from './setting/users';
import goodsCategory from './goods/category';
import goodsList from './goods/list';

import './App.scss';

const Show = props => <div>custom</div>;

export default () => (
    <Prophet
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        layout={Layout}
        menu={Menu}
        brand={Brand}
        login={() => <Login />}
        catchAll={() => <CatchAll auth={403} />}
        customRoutes={[<Route exact path="/custom" component={Show} />]}
    >
        <Resource name="store" {...goodsList} />
        <Resource name="goods/category" {...goodsCategory} />
        <Resource name="user" label="用户设置" {...users} />
    </Prophet>
);
