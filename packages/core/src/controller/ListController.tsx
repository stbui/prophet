import React, { Component } from 'react';
import { connect } from 'react-redux';

import { crudGetList } from '../actions';

export interface PropsType {
  children?: any;
  data?: any;
  basePath?: string;
  hasCreate?: boolean;
  resource?: string;
  crudGetList?: any;
}

const mapStateToProps = (state, props) => {
  const resourceState = state.resources[props.resource];
  return { data: resourceState.data };
};

@connect(
  mapStateToProps,
  { crudGetList }
)
export default class ListController extends Component<PropsType> {
  componentDidMount() {
    this.getListData();
  }

  getListData() {
    this.props.crudGetList(this.props.resource);
  }

  render() {
    const {
      children,
      basePath,
      data,
      hasCreate,
      resource,
      ...other
    } = this.props;
    // isFunction
    return children({ basePath, data, hasCreate, resource });
  }
}
