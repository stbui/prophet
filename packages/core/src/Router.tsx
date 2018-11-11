import React, { Component, Children, cloneElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from '@admin/antd';
import { routes } from './routes';

import Login from './Login';
import Logout from './Logout';

export class CoreRouter extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { dashboard, children } = this.props;

    if (!children) {
      return <div>添加组件 &lt;Resource&gt;</div>;
    }

    return (
      <Layout routes={routes} brand="stbui">
        <Switch>
          {Children.map(children, (child: any) => (
            <Route
              key={child.props.name}
              path={`/${child.props.name}`}
              render={props => cloneElement(child, { ...props })}
            />
          ))}
          <Route path="/forms/elements" component={Logout} />
          <Route exact path="/" component={dashboard} />
        </Switch>
      </Layout>
    );
  }
}

export default CoreRouter;
