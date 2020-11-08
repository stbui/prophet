import React, { FunctionComponent, ComponentType } from 'react';
import {
    CoreContext,
    CoreUI,
    AuthProvider,
    I18nProvider,
} from '@stbui/prophet-core';

import { Layout, CatchAll, Login } from '@stbui/prophet-antd';
import defaultMessages from '@stbui/prophet-language-chinese';
import polyglotI18nProvider from '@stbui/prophet-i18n-polyglot';

interface Props {
    children?: any;
    title?: string;
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    login?: ComponentType;
    layout?: any;
    catchAll?: any;
    initialState?: object;
    authProvider?: AuthProvider;
    dataProvider?: any;
    i18nProvider?: I18nProvider;
    customRoutes?: any[];
    customSagas?: any;
    customReducers?: any;
    history?: any;
}

export const defaultI18nProvider = polyglotI18nProvider(() => defaultMessages);

const Prophet: FunctionComponent<Props> = ({
    children,
    title,
    dashboard,
    menu,
    brand,
    login,
    layout,
    catchAll,
    initialState,
    authProvider,
    dataProvider,
    i18nProvider,
    customRoutes = [],
    customSagas,
    customReducers,
    history,
}) => {
    return (
        <CoreContext
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            history={history}
            customReducers={customReducers}
            customSagas={customSagas}
            initialState={initialState}
        >
            <CoreUI
                layout={layout}
                customRoutes={customRoutes}
                dashboard={dashboard}
                menu={menu}
                brand={brand}
                catchAll={catchAll}
                title={title}
                loginPage={login}
            >
                {children}
            </CoreUI>
        </CoreContext>
    );
};

Prophet.defaultProps = {
    layout: Layout,
    catchAll: CatchAll,
    login: Login,
    i18nProvider: defaultI18nProvider,
};

export default Prophet;
