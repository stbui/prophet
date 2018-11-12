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
        {list && (
          <Route
            exact
            path={`${match.url}/list`}
            render={props =>
              createElement(list, { basePath: match.url, ...props })
            }
          />
        )}
        {create && (
          <Route
            exact
            path={`${match.url}/create`}
            render={props =>
              createElement(create, { basePath: match.url, ...props })
            }
          />
        )}
        {edit && (
          <Route
            exact
            path={`${match.url}/edit`}
            render={props =>
              createElement(edit, { basePath: match.url, ...props })
            }
          />
        )}
        {show && (
          <Route
            exact
            path={`${match.url}/show`}
            render={props =>
              createElement(show, {
                basePath: match.url,
                id: decodeURIComponent(props.match.params.id),
                ...props
              })
            }
          />
        )}
      </Switch>
    );
  }
}

export default connect(
  null,
  { registerResource }
)(Resource);
