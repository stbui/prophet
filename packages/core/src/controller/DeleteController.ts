import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudDelete } from '../actions/deleteAction';

export interface IProps {
  children?(props): any;
  basePath: any;
  resource: any;
  crudDelete(resource: string, id, data): any;
}

const mapStateToProps = (state, props) => {
  return {};
};

export class DeleteController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  save = data => {
    const { crudDelete, resource } = this.props;
    crudDelete(resource, data.id, data);
  };

  render() {
    const { children, basePath, resource } = this.props;

    if (!children) return null;

    return children({
      basePath,
      resource,
      update: this.save
    });
  }
}

export default connect(
  mapStateToProps,
  { crudDelete }
)(DeleteController);
