import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Login } from '@coat/antd';

import configureStore from './Store';
import Router from './Router';

const history = createHistory();

export interface PropsType {
  dashboard?: React.ReactNode;
  customRoutes?: any;
  catchAll?: React.ReactNode;
  menu?: React.ReactNode;
}

export class Core extends Component<PropsType, any> {
  render() {
    const {
      children,
      dashboard,
      customRoutes = [],
      catchAll,
      menu
    } = this.props;

    return (
      <Provider store={configureStore({}, history)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              path="/"
              render={props => (
                <Router
                  dashboard={dashboard}
                  customRoutes={customRoutes}
                  catchAll={catchAll}
                  menu={menu}
                  {...props}
                >
                  {children}
                </Router>
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Core;
