import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Layout } from '@admin/antd';
import { routes } from './routes';

import Login from './Login';
import Logout from './Logout';

import Store from './Store';

const history = createHistory();

const Home = () => (
  <Layout routes={routes}>
    Content
    <Route exact path="/materials/pagination" component={Login} />
    <Route exact path="/materials/date-picker" component={Logout} />
    <Route exact path="/forms/elements" component={Logout} />
  </Layout>
);

export class Core extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/materials" component={Home} />
            <Route path="/forms" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Core;
