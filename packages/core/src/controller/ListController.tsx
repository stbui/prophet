import React, { Component } from 'react';
import { connect } from 'react-redux';

import { crudGetList } from '../actions';

export interface InjectedProps {
  resource: string;
  basePath: string;
  data: any;
  hasCreate: boolean;
}

export interface IProps {
  children(props: InjectedProps): JSX.Element;
  resource: string;
  basePath: string;
  data: any;
  hasCreate?: boolean;
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
export default class ListController extends Component<IProps> {
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
