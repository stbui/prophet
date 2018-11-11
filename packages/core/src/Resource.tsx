import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { registerResource } from './actions';

export class Resource extends Component<any, any> {
  componentWillMount() {
    const { registerResource, name, list, edit, create, show } = this.props;
    const resource = { name };
    registerResource(resource);
  }

  render() {
    const { name, list, edit, create, show, match } = this.props;
    console.log('resource render', this.props);
    return (
      <Switch>
        <Route
          exact
          path={`${match.url}/list`}
          render={props =>
            createElement(list, { basePath: match.url, ...props })
          }
        />
        <Route
          exact
          path={`${match.url}/create`}
          render={props => <div>create</div>}
        />
        <Route
          exact
          path={`${match.url}/edit`}
          render={props => <div>edit</div>}
        />
        <Route
          exact
          path={`${match.url}/show`}
          render={props => <div>show</div>}
        />
      </Switch>
    );
  }
}

export default connect(
  null,
  { registerResource }
)(Resource);
