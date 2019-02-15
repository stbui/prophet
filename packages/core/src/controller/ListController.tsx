import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { createSelector } from 'reselect';

import {
  crudGetList,
  changeListParams,
  setPageParams,
  setFiltersParams
} from '../actions';
import queryReducer from '../reducers/resources/list/queryReducer';

export interface InjectedProps {
  resource: string;
  basePath: string;
  data: any;
  total: number;
  hasCreate?: boolean;
  changeParams?: any;
  setFilters?: any;
  setPage?: any;
  pagination?: any;
}

export interface IProps {
  children(props: InjectedProps): JSX.Element;
  crudGetList?: any;
  changeListParams?: any;
  resource: string;
  basePath: string;
  data: any;
  total: number;
  hasCreate?: boolean;
  changeParams?: any;
  params?: any;
  setPageParams?: any;
  setFiltersParams?: any;
  setPage?: any;
  location?: any;
  filter?: any;
  query?: any;
}

const getLocationPath = props => props.location.pathname;
const getLocationSearch = props => props.location.search;
const selectQuery = createSelector(
  getLocationPath,
  getLocationSearch,
  (path, search) => {
    return parse(search);
  }
);

const mapStateToProps = (state, props) => {
  const resourceState = state.resources[props.resource];

  return {
    data: resourceState.data,
    total: resourceState.list.total,
    params: resourceState.list.params,
    query: selectQuery(props)
  };
};

// @connect(
//   mapStateToProps,
//   { crudGetList, changeListParams, setPageParams, setFiltersParams }
// )
export class ListController extends Component<IProps> {
  componentDidMount() {
    this.updateData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      'componentWillReceiveProps',
      nextProps.query,
      this.props.query,
      nextProps.params,
      this.props.params
    );
    if (this.props.params) {
      if (
        nextProps.params.page !== this.props.params.page ||
        nextProps.params.filter !== this.props.params.filter
      ) {
        this.updateData(
          Object.keys(nextProps.query).length > 0
            ? nextProps.query
            : nextProps.params
        );
      }
    }
  }

  getQuery() {
    const query =
      Object.keys(this.props.query).length > 0
        ? this.props.query
        : { ...this.props.params };

    return query;
  }

  updateData(query?: object) {
    const params = query || this.getQuery();
    const { page, filter } = params;
    const pagination = page;

    this.props.crudGetList(this.props.resource, pagination, { ...filter });
  }

  filterParams = query => {
    this.props.changeListParams(this.props.resource, query);
  };

  changeParams = action => {
    const query = this.getQuery();
    const newParams = queryReducer(query, action);
    console.log('newParams', newParams, this.props.location);

    this.props.changeListParams(this.props.resource, newParams);
  };

  setPage = page => this.changeParams(this.props.setPageParams(page));

  setFilters = filters =>
    this.changeParams(this.props.setFiltersParams(filters));

  render() {
    const {
      children,
      basePath,
      data,
      total,
      hasCreate,
      resource,
      params
    } = this.props;

    const query = this.getQuery();
    const pagination = query.page ? { ...params.page } : {};

    return children({
      basePath,
      data,
      total,
      pagination,
      hasCreate,
      resource,
      setFilters: this.setFilters,
      setPage: this.setPage
    });
  }
}

export default connect(
  mapStateToProps,
  { crudGetList, changeListParams, setPageParams, setFiltersParams }
)(ListController);
