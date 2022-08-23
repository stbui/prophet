/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { FunctionComponent, ComponentType, isValidElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoreRouter } from './CoreRouter';

export interface CoreUIProps {
    title?: string;
    dashboard?: ComponentType;
    layout: ComponentType;
    loginPage?: any;
    catchAll: ComponentType<any>;
    menu?: ComponentType;
    brand?: ComponentType;
    customRoutes?: any[];
    children?: any;
}

const CoreUI: FunctionComponent<CoreUIProps> = ({
    children,
    title = 'Stbui',
    dashboard,
    layout,
    loginPage: LoginPage,
    catchAll = () => null,
    menu,
    brand,
    customRoutes = [],
}) => (
    <Routes>
        {LoginPage ? (
            <Route
                path="/login"
                element={isValidElement(LoginPage) ? LoginPage : <LoginPage />}
            />
        ) : null}
        <Route
            path="/*"
            element={
                <CoreRouter
                    layout={layout}
                    dashboard={dashboard}
                    customRoutes={customRoutes}
                    catchAll={catchAll}
                    menu={menu}
                    brand={brand}
                    title={title}
                >
                    {children}
                </CoreRouter>
            }
        />
    </Routes>
);

export default CoreUI;
