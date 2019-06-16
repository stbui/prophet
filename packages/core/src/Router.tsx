/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component, Children, cloneElement, createElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export interface IProps {
  children: any;
  customRoutes: any;
  dashboard: React.ComponentType;
  catchAll: React.ComponentType;
  Layout: React.ComponentType;
}
export class CoreRouter extends Component<IProps, any> {
  constructor(props) {
    super(props);
  }

  renderCustomRoutesWithoutLayout = (route, props) => {
    if (route.props.render) {
      return route.props.render({ ...props });
    }

    if (route.props.component) {
      return createElement(route.props.component, { ...props });
    }
  };

  render() {
    const { children, dashboard, customRoutes, catchAll, Layout } = this.props;

    if (!children) {
      return <div>添加组件 &lt;Resource&gt;</div>;
    }

    const childrenArray = Children.toArray(children);
    const firstChild: any = childrenArray.length > 0 ? childrenArray[0] : null;

    return (
      <Layout {...this.props}>
        {Children.map(children, (child: any) =>
          cloneElement(child, {
            key: child.props.name,
            context: 'registration'
          })
        )}
        <Switch>
          {customRoutes.map((route, index) => (
            <Route
              key={index}
              exact={route.props.exact}
              path={route.props.path}
              render={props =>
                this.renderCustomRoutesWithoutLayout(route, props)
              }
            />
          ))}
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
          <Route render={() => createElement(catchAll)} />
        </Switch>
      </Layout>
    );
  }
}

export default CoreRouter;
