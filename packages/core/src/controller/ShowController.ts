import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export interface IProps {
  children(props): any;
  basePath: any;
  resource: any;
  record: any;
  id: any;
}

const mapStateToProps = (state, props) => {
  return { id: 1, record: {} };
};

export class ShowController extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData(resource?, id?) {}

  render() {
    const { children, basePath, resource, record, id } = this.props;

    if (!children) return null;

    return children({ basePath, resource, record, id });
  }
}

export default connect(mapStateToProps)(ShowController);
