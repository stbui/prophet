import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './i18n';
import Dashboard from './dashboard';
import Menu from './Menu/Menu';
import Brand from './Menu/Brand';

import users from './pages/setting/users';
import gatewayConfig from './pages/gateway/config';
// import proxyConfig from './pages/proxy/config';
import client from './pages/client';
import tunnel from './pages/tunnel';
import server from './pages/server';

import './App.scss';

export default () => (
    <Prophet
        dataProvider={dataProvider('/api')}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        dashboard={Dashboard}
        brand={Brand}
        menu={Menu}
    >
        <Resource name="user/list" {...users} />
        <Resource name="gateway/list" {...gatewayConfig} />
        <Resource
            name="gateway/api"
            {...require('./pages/gateway/api').default}
        />
        <Resource
            name="gateway/group"
            {...require('./pages/gateway/group').default}
        />
        <Resource
            name="gateway/plugin"
            {...require('./pages/gateway/plugin').default}
        />
        <Resource
            name="gateway/appid"
            {...require('./pages/gateway/appid').default}
        />
        <Resource
            name="gateway/ip"
            {...require('./pages/gateway/ip').default}
        />
        <Resource
            name="gateway/flow"
            {...require('./pages/gateway/flow').default}
        />
        <Resource
            name="gateway/log"
            {...require('./pages/gateway/log').default}
        />

        {/* <Resource name="proxy/list" {...proxyConfig} /> */}
        <Resource name="client" {...client} />
        <Resource name="tunnel" {...tunnel} />
        <Resource name="server" {...server} />
    </Prophet>
);
