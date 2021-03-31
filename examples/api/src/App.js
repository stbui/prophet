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
import gatewayConfig from './gateway/config';

import { createBrowserHistory } from 'history';

import './App.scss';

export default () => (
    <Prophet
        dataProvider={dataProvider('/api')}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        history={createBrowserHistory()}
        customRoutes={routes}
        dashboard={Dashboard}
        brand={Brand}
        menu={Menu}
    >
        <Resource name="store" {...goodsList} />
        <Resource name="goods/category" {...goodsCategory} />
        <Resource name="user/list" {...users} />
        <Resource name="gateway/list" {...gatewayConfig} />
    </Prophet>
);
