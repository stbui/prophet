import React, { FunctionComponent } from 'react';
import { CoreContext, CoreUI } from '@stbui/prophet-core';

import { Layout, CatchAll, Login } from '@stbui/prophet-antd';
import defaultMessages from '@stbui/prophet-language-chinese';
import polyglotI18nProvider from '@stbui/prophet-i18n-polyglot';

const defaultI18nProvider = polyglotI18nProvider(() => defaultMessages);

const Prophet: FunctionComponent<any> = ({
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
