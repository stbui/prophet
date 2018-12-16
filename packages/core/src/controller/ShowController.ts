import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export interface IProps {
  children(props): any;
  basePath: any;
  resource: any;
}

const mapStateToProps = (state, props) => {
  return {};
};

export class ShowController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, basePath, resource } = this.props;

    return children({ basePath, resource });
  }
}

export default connect(mapStateToProps)(ShowController);
