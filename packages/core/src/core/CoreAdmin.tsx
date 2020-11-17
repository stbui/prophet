/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { FunctionComponent, ComponentType } from 'react';
import CoreContext from './CoreContext';
import CoreUI from './CoreUI';
import { AuthProvider, I18nProvider } from '../types';

export interface CoreAdminProps {
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    login?: ComponentType;
    layout: ComponentType;
    catchAll?: any;
    initialState?: object;
    authProvider?: AuthProvider;
    dataProvider: any;
    i18nProvider?: I18nProvider;
    customRoutes?: any[];
    customSagas?: any[];
    customReducers?: object;
    history?: any;
    title?: string;
    defalutRedirect?: string;
}

const CoreAdmin: FunctionComponent<CoreAdminProps> = ({
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
    defalutRedirect,
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
                defalutRedirect={defalutRedirect}
            >
                {children}
            </CoreUI>
        </CoreContext>
    );
};

export default CoreAdmin;
