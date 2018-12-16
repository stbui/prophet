import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudCreate } from '../actions/createAction';

export interface IProps {
  children?(props): any;
  basePath: any;
  resource: any;
  crudCreate(resource: string, data): any;
}

const mapStateToProps = (state, props) => {
  return {};
};

export class CreateController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  save = data => {
    const { crudCreate, resource } = this.props;
    crudCreate(resource, data);
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
