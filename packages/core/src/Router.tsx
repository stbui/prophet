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
        {Children.map(children, (child: any) =>
          cloneElement(child, {
            key: child.props.name
          })
        )}
        <Switch>
          <Route path="/materials/pagination" component={Login} />
          <Route path="/materials/date-picker" component={Logout} />
          <Route path="/forms/elements" component={Logout} />
          <Route exact path="/" component={dashboard} />
        </Switch>
      </Layout>
    );
  }
}

export default CoreRouter;
