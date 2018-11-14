import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { registerResource } from './actions';

export class Resource extends Component<any, any> {
  componentWillMount() {
    const {
      registerResource,
      name,
      label,
      list,
      edit,
      create,
      show,
      context
    } = this.props;

    if (context === 'registration') {
      const resource = {
        name,
        label,
        hasList: !!list,
        hasEdit: !!edit,
        hasCreate: !!create,
        hasShow: !!show
      };

      registerResource(resource);
    }
  }

  render() {
    const { list, edit, create, show, match, context, catchAll } = this.props;

    if (context === 'registration') {
      return null;
    }

    return (
      <Switch>
        {list && (
          <Route
            exact
            path={match.url}
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
            path={`${match.url}/:id`}
            render={props =>
              createElement(edit, { basePath: match.url, ...props })
            }
          />
        )}
        {show && (
          <Route
            exact
            path={`${match.url}/:id/show`}
            render={props =>
              createElement(show, {
                basePath: match.url,
                id: decodeURIComponent(props.match.params.id),
                ...props
              })
            }
          />
        )}
        <Route render={() => createElement(catchAll)} />
      </Switch>
    );
  }
}

export default connect(
  null,
  { registerResource }
)(Resource);
