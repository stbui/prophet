import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './i18n';
import Dashboard from './dashboard';
import Menu from './Menu/Menu';
import Brand from './Menu/Brand';
import routes from './routes';

import users from './setting/users';
import goodsCategory from './goods/category';
import goodsList from './goods/list';

import { createBrowserHistory } from 'history';

import './App.scss';

export default () => (
    <Prophet
        dataProvider={dataProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        history={createBrowserHistory()}
        customRoutes={routes}
        dashboard={Dashboard}
        menu={Menu}
        brand={Brand}
    >
        <Resource name="store" {...goodsList} />
        <Resource name="goods/category" {...goodsCategory} />
        <Resource name="user/list" {...users} />
    </Prophet>
);
