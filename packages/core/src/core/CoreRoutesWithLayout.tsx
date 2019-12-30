/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, {
    Children,
    cloneElement,
    createElement,
    FunctionComponent,
} from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { WithPermissions } from '../auth';

export interface CoreRoutesWithLayoutProps {
    catchAll?: any;
    children?: any;
    customRoutes?: any;
    dashboard?: any;
    title?: any;
}

const CoreRoutesWithLayout: FunctionComponent<CoreRoutesWithLayoutProps> = ({
    catchAll,
    children,
    customRoutes,
    dashboard,
    title,
}) => {
    const childrenArray = Children.toArray(children);
    const firstChild: any = childrenArray.length > 0 ? childrenArray[0] : null;

    return (
        <Switch>
            {Children.map(children, (child: any) => (
                <Route
                    key={child.props.name}
                    path={`/${child.props.name}`}
                    render={props => cloneElement(child, { ...props })}
                />
            ))}
            {dashboard ? (
                <Route
                    exact
                    path="/"
                    render={routeProps => (
                        <WithPermissions
                            authParams={{
                                route: 'dashboard',
                            }}
                            component={dashboard}
                            {...routeProps}
                        />
                    )}
                />
            ) : firstChild ? (
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to={`/${firstChild.props.name}`} />}
                />
            ) : null}
            <Route
                render={routeProps =>
                    createElement(catchAll, {
                        ...routeProps,
                        title,
                    })
                }
            />
        </Switch>
    );
};

export default CoreRoutesWithLayout;
