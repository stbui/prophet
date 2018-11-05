import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

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
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" render={Logout} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Core;
