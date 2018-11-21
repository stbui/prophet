import React, { Component } from 'react';
import { connect } from 'react-redux';

import { crudGetList } from '../actions';

export interface InjectedProps {
  resource: string;
  basePath: string;
  data: any;
  total: number;
  hasCreate: boolean;
  changeParams?: any;
}

export interface IProps {
  children(props: InjectedProps): JSX.Element;
  crudGetList?: any;
  resource: string;
  basePath: string;
  data: any;
  total: number;
  hasCreate?: boolean;
  changeParams?: any;
}

const mapStateToProps = (state, props) => {
  const resourceState = state.resources[props.resource];
  return { data: resourceState.data, total: resourceState.list.total };
};

@connect(
  mapStateToProps,
  { crudGetList }
)
export default class ListController extends Component<IProps> {
  componentDidMount() {
    this.getListData();
  }

  getListData(query?: object) {
    this.props.crudGetList(this.props.resource, { ...query });
  }

  changeParams = (query: object) => {
    console.log('listConstroller', query);
    this.getListData(query);
  };

  render() {
    const {
      children,
      basePath,
      data,
      total,
      hasCreate,
      resource,
      changeParams
    } = this.props;

    return children({
      basePath,
      data,
      total,
      hasCreate,
      resource,
      changeParams: this.changeParams
    });
  }
}
