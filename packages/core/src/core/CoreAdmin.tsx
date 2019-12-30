/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { FunctionComponent, ComponentType, Children } from 'react';
import CoreContext from './CoreContext';
import CoreUI from './CoreUI';

export interface CoreAdminProps {
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    login?: ComponentType;
    layout: ComponentType;
    catchAll?: any;
    initialState?: any;
    authProvider?: any;
    dataProvider: any;
    i18nProvider?: any;
    customRoutes?: any;
    customSagas?: any;
    customReducers?: any;
    history?: any;
    title?: string;
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

export default CoreAdmin;
