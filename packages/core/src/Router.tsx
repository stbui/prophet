/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Children, cloneElement, createElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default props => {
    const { children, dashboard, customRoutes, catchAll, Layout } = props;

    if (!children) {
        return <div>缺失组件 &lt;Resource&gt;</div>;
    }

    const childrenArray = Children.toArray(children);
    const firstChild: any = childrenArray.length > 0 ? childrenArray[0] : null;

    const renderCustomRoutesWithoutLayout = (route, props) => {
        if (route.props.render) {
            return route.props.render({ ...props });
        }

        if (route.props.component) {
            return createElement(route.props.component, { ...props });
        }
    };

    return (
        <Layout {...props}>
            {Children.map(children, (child: any) =>
                cloneElement(child, {
                    key: child.props.name,
                    context: 'registration',
                })
            )}
            <Switch>
                {customRoutes.map((route: any, key: any) =>
                    cloneElement(route, {
                        key,
                        render: props =>
                            renderCustomRoutesWithoutLayout(route, props),
                    })
                )}
                {Children.map(children, (child: any) => (
                    <Route
                        key={child.props.name}
                        path={`/${child.props.name}`}
                        render={props => cloneElement(child, { ...props })}
                    />
                ))}
                {dashboard ? (
                    <Route exact path="/" component={dashboard} />
                ) : firstChild ? (
                    <Redirect to={`/${firstChild.props.name}`} />
                ) : null}
                <Route
                    render={(props: any) =>
                        createElement(catchAll, { ...props })
                    }
                />
            </Switch>
        </Layout>
    );
};
