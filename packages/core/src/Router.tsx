import React, { Component, Children, cloneElement, createElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from '@prophet/antd';

export class CoreRouter extends Component<any, any> {
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
    const { children, dashboard, customRoutes } = this.props;

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
        </Switch>
      </Layout>
    );
  }
}

export default CoreRouter;
