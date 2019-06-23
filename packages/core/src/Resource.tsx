/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { registerResource } from './actions';

export interface IProps {
  list?: any;
  edit?: any;
  create?: any;
  show?: any;
  catchAll?: any;
  name: string;
  label?: string;
  context?: 'registration';
  match?: any;
  registerResource?: (resource: any) => void;
}

// @connect(
//   null,
//   { registerResource }
// )
export class Resource extends Component<IProps, any> {
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
    const {
      name,
      label,
      list,
      edit,
      create,
      show,
      match,
      context,
      catchAll
    } = this.props;

    if (context === 'registration') {
      return null;
    }

    const resource = {
      resource: name,
      label,
      hasList: !!list,
      hasEdit: !!edit,
      hasCreate: !!create,
      hasShow: !!show
    };

    return (
      <Switch>
        {list && (
          <Route
            exact
            path={match.url}
            render={props =>
              createElement(list, {
                basePath: match.url,
                ...resource,
                ...props
              })
            }
          />
        )}
        {create && (
          <Route
            exact
            path={`${match.url}/create`}
            render={props =>
              createElement(create, {
                basePath: match.url,
                ...resource,
                ...props
              })
            }
          />
        )}
        {edit && (
          <Route
            exact
            path={`${match.url}/:id`}
            render={props =>
              createElement(edit, {
                basePath: match.url,
                id: decodeURIComponent(props.match.params.id),
                ...resource,
                ...props
              })
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
                ...resource,
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
