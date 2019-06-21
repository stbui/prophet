/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudGetOne } from '../actions';

export interface IProps {
  children(props): any;
  basePath: any;
  resource: any;
  id: string | number;
  record: any;
  crudGetOne: (resource: string, id: string | number) => any;
}

const mapStateToProps = (state, props) => {
  return {
    id: props.id,
    record: state.resources[props.resource]
      ? state.resources[props.resource].data[props.id]
      : null
  };
};
export class ShowController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { resource, id } = this.props;
    this.updateData(resource, id);
  }

  updateData(resource: string, id: string | number) {
    this.props.crudGetOne(resource, id);
  }

  render() {
    const { children, basePath, resource, record, id } = this.props;

    if (!children) return null;

    return children({ basePath, resource, record, id });
  }
}

export default connect(
  mapStateToProps,
  { crudGetOne }
)(ShowController);
