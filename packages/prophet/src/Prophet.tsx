import React, { ComponentType } from 'react';
import {
    CoreContext,
    CoreUI,
    AuthProvider,
    I18nProvider,
    localStorageStore,
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
    store: any;
    queryClient?: any;
}

export const defaultI18nProvider = polyglotI18nProvider(() => defaultMessages);

export const Prophet = ({
    children,
    title,
    dashboard,
    menu,
    brand,
    login,
    layout,
    catchAll,
    authProvider,
    dataProvider,
    i18nProvider,
    store,
    queryClient,
}: Props) => {
    return (
        <CoreContext
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            store={store}
            queryClient={queryClient}
        >
            <CoreUI
                layout={layout}
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
    store: localStorageStore(),
    i18nProvider: defaultI18nProvider,
};
