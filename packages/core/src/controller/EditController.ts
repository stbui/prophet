import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudUpdate } from '../actions/updateAction';

export interface IProps {
  children(props): any;
  basePath: any;
  resource: any;
  crudUpdate: any;
}

const mapStateToProps = (state, props) => {
  return {};
};

export class EditController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  save = data => {
    const { crudUpdate, resource } = this.props;
    crudUpdate(resource, data);
  };

  render() {
    const { children, basePath, resource } = this.props;

    if (!children) return null;

    return children({ basePath, resource, save: this.save });
  }
}

export default connect(
  mapStateToProps,
  { crudUpdate }
)(EditController);
