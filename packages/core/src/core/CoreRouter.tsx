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
} from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreRoutesWithLayout from './CoreRoutesWithLayout';
import { useGetPermissions, useAuthState } from '../auth';

export interface CoreRouterProps {
    children?: any;
    title?: string;
    dashboard?: ComponentType;
    menu?: ComponentType;
    brand?: ComponentType;
    catchAll: ComponentType;
    layout: ComponentType;
    customRoutes: any[];
    defalutRedirect?: string;
}

const CoreRouter: FunctionComponent<CoreRouterProps> = ({
    children,
    dashboard,
    customRoutes = [],
    catchAll,
    layout,
    menu,
    brand,
    title,
    defalutRedirect,
}) => {
    const getPermissions = useGetPermissions();
    const { authenticated } = useAuthState();
    const [computedChildren, setComputedChildren] = useState([]);

    useEffect(() => {
        if (typeof children === 'function') {
            initializeResources();
        }
    }, [authenticated]);

    const initializeResources = async () => {
        try {
            const permissions = await getPermissions();
            const resolveChildren = children;
            const childrenFuncResult = resolveChildren(permissions);
            if (childrenFuncResult.then) {
                childrenFuncResult.then(resolvedChildren =>
                    setComputedChildren(
                        resolvedChildren
                            .filter(child => child)
                            .map(child => ({
                                ...child,
                                props: {
                                    ...child.props,
                                    key: child.props.name,
                                },
                            }))
                    )
                );
            } else {
                setComputedChildren(childrenFuncResult.filter(child => child));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderCustomRoutesWithoutLayout = (route, routeProps) => {
        if (route.props.render) {
            return route.props.render({ ...routeProps, title });
        }

        if (route.props.component) {
            return createElement(route.props.component, {
                ...routeProps,
                title,
            });
        }
    };

    if (typeof children !== 'function' && !children) {
        return <div>缺失组件 &lt;Resource&gt;</div>;
    }

    const childrenToRender =
        typeof children === 'function' ? computedChildren : children;

    return (
        <React.Fragment>
            {Children.map(childrenToRender, (child: any) =>
                cloneElement(child, {
                    key: child.props.name,
                    intent: 'registration',
                })
            )}
            <Switch>
                {customRoutes
                    .filter(route => route.props.noLayout)
                    .map((route, key) =>
                        cloneElement(route, {
                            key,
                            render: routeProps =>
                                renderCustomRoutesWithoutLayout(
                                    route,
                                    routeProps
                                ),
                        })
                    )}
                <Route
                    render={routeProps =>
                        createElement<any>(
                            layout,
                            {
                                ...routeProps,
                                dashboard,
                                menu,
                                title,
                                brand,
                            },
                            <CoreRoutesWithLayout
                                catchAll={catchAll}
                                customRoutes={customRoutes.filter(
                                    route => !route.props.noLayout
                                )}
                                dashboard={dashboard}
                                title={title}
                                defalutRedirect={defalutRedirect}
                            >
                                {Children.map(childrenToRender, child =>
                                    cloneElement(child, {
                                        key: child.props.name,
                                        intent: 'route',
                                    })
                                )}
                            </CoreRoutesWithLayout>
                        )
                    }
                />
            </Switch>
        </React.Fragment>
    );
};

export default CoreRouter;
