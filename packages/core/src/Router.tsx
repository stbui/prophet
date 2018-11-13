import React, { Component, Children, cloneElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from '@admin/antd';

export class CoreRouter extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { dashboard, children } = this.props;

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
