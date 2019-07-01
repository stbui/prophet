/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudCreate } from '../actions/createAction';

export interface IProps {
  children?(props): any;
  basePath: any;
  resource: any;
  redirectTo: any;
  refresh: any;
  crudCreate(resource: string, data: any, basePath?: any, redirectTo?: any, refresh?: any, callback?: any): any;
}

const mapStateToProps = (state, props) => {
  return {};
};

export class CreateController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  save = (data, callback?: any) => {
    const { crudCreate, resource, basePath, redirectTo, refresh } = this.props;
    crudCreate(resource, data, basePath, redirectTo, refresh, callback);
  };

  render() {
    const { children, basePath, resource } = this.props;

    if (!children) return null;

    return children({
      basePath,
      resource,
      save: this.save
    });
  }
}

export default connect(
  mapStateToProps,
  { crudCreate }
)(CreateController);
