/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, {
    Children,
    cloneElement,
    createElement,
    FunctionComponent,
    ComponentType,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WithPermissions } from '../auth';
import { useCreatePath } from '../routing';

export interface CoreRouterProps {
    children?: any;
    title?: string;
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    catchAll: ComponentType;
    layout: any;
    customRoutes: any[];
}

const defaultAuthParams = { route: 'dashboard' };

export const CoreRouter = ({
    children,
    dashboard,
    customRoutes = [],
    catchAll: CatchAll,
    layout: Layout,
    menu,
    brand,
    title,
}: CoreRouterProps) => {
    const createPath = useCreatePath();

    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <Layout dashboard={dashboard} menu={menu} title={title}>
                        <Routes>
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
