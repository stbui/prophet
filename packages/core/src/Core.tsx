import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
// import { Login } from 'prophet-antd';

import configureStore from './Store';
import Router from './Router';

const history = createHistory();

export interface PropsType {
  dashboard?: React.ComponentType;
  catchAll?: React.ComponentType;
  menu?: React.ComponentType;
  brand?: React.ComponentType;
  dataProvider?: (type?: any, resource?: any, params?: any) => Promise<any>;
  customRoutes?: any[];
  login?: React.ComponentType;
  layout?: React.ComponentType;
}

export class Core extends Component<PropsType, any> {
  render() {
    const {
      children,
      dashboard,
      customRoutes = [],
      catchAll,
      menu,
      dataProvider,
      brand,
      login,
      layout
    } = this.props;

    return (
      <Provider store={configureStore({ history, dataProvider })}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="llogin" component={login} />
            <Route
              path="/"
              render={props => (
                <Router
                  Layout={layout}
                  dashboard={dashboard}
                  customRoutes={customRoutes}
                  catchAll={catchAll}
                  menu={menu}
                  brand={brand}
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
