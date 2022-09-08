/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Children, ComponentType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WithPermissions } from '../auth';
import { useCreatePath } from '../routing';
import { useConfigureAdminRouterFromChildren } from './useConfigureAdminRouterFromChildren';

export interface CoreRouterProps {
    children?: any;
    title?: string;
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    catchAll: any;
    layout: any;
    customRoutes: any[];
}

const defaultAuthParams = { route: 'dashboard' };

export const CoreRouter = ({
    children,
    dashboard,
    catchAll: CatchAll,
    layout: Layout,
    menu,
    title,
}: CoreRouterProps) => {
    const createPath = useCreatePath();

    const {
        customRoutesWithLayout,
        customRoutesWithoutLayout,
        status,
        resources,
    } = useConfigureAdminRouterFromChildren(children);

    return (
        <Routes>
            {customRoutesWithoutLayout}
            <Route
                path="/*"
                element={
                    <Layout dashboard={dashboard} menu={menu} title={title}>
                        <Routes>
                            {customRoutesWithLayout}
                            {Children.map(resources, resource => (
                                <Route
                                    key={resource.props.name}
                                    path={`${resource.props.name}/*`}
                                    element={resource}
                                />
                            ))}
                            <Route
                                path="/"
                                element={
                                    dashboard ? (
                                        <WithPermissions
                                            authParams={defaultAuthParams}
                                            component={dashboard}
                                        />
                                    ) : resources.length > 0 ? (
                                        <Navigate
                                            to={createPath({
                                                resource:
                                                    resources[0].props.name,
                                                type: 'list',
                                            })}
                                        />
                                    ) : null
                                }
                            />
                            <Route
                                path="*"
                                element={<CatchAll title={title} />}
                            />
                        </Routes>
                    </Layout>
                }
            />
        </Routes>
    );
};
