import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Layout } from '@admin/antd';

import Login from './Login';
import Logout from './Logout';

import Store from './Store';

const history = createHistory();

export class Core extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" render={Logout} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default Core;
