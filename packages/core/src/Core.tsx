import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import configureStore from './Store';
import Router from './Router';
import Login from './Login';

const history = createHistory();

export class Core extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, dashboard } = this.props;

    return (
      <Provider store={configureStore({}, history)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              path="/"
              render={props => (
                <Router dashboard={dashboard} {...props}>
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
