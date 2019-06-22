/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { createSelector } from 'reselect';
import { push as pushAction } from 'react-router-redux';

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
  setPerPage?: any;
  setPage?: any;
  page?: number;
  perPage?: number;
  filterValues?: any;
  ids: any[];
  isLoading: boolean;
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
  perPage?: number;
  setPageParams?: any;
  setFiltersParams?: any;
  setPage?: any;
  location?: any;
  filter?: any;
  query?: any;
  push?: any;
  ids: any[];
  isLoading: boolean;
  version: any;
}

const getLocationPath = props => props.location.pathname;
const getLocationSearch = props => props.location.search;
const selectQuery = createSelector(
  getLocationPath,
  getLocationSearch,
  (path, search) => {
    const query: any = parse(search);
    if (query.filter && typeof query.filter === 'string') {
      try {
        query.filter = JSON.parse(query.filter);
      } catch (err) {
        delete query.filter;
      }
    }
    return query;
  }
);

const mapStateToProps = (state, props) => {
  const resourceState = state.resources[props.resource];

  return {
    data: resourceState.data,
    total: resourceState.list.total,
    params: resourceState.list.params,
    ids: resourceState.list.ids,
    query: selectQuery(props),
    isLoading: resourceState.loading > 0,
    version: state.refresh
  };
};

// @connect(
//   mapStateToProps,
//   {
//     crudGetList,
//     changeListParams,
//     setPageParams,
//     setFiltersParams,
//     push: pushAction
//   }
// )
export class ListController extends Component<IProps> {
  static defaultProps: Partial<IProps> = {
    perPage: 10,
    filter: {}
  };

  componentDidMount() {
    this.updateData();
    if (Object.keys(this.props.query).length > 0) {
      this.props.changeListParams(this.props.resource, this.props.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.query.page !== this.props.query.page ||
      nextProps.query.perPage !== this.props.query.perPage ||
      nextProps.resource !== this.props.resource
    ) {
      this.updateData(
        Object.keys(nextProps.query).length > 0
          ? nextProps.query
          : nextProps.params
      );
    }

    if (nextProps.version !== this.props.version) {
      this.updateData();
    }
  }

  getQuery() {
    const query =
      Object.keys(this.props.query).length > 0
        ? this.props.query
        : { ...this.props.params };

    if (!query.perPage) {
      query.perPage = this.props.perPage;
    }
    if (!query.page) {
      query.page = 1;
    }

    return query;
  }

  updateData(query?: object) {
    const params = query || this.getQuery();
    const { page = 1, perPage, ...filter } = params;
    const pagination = {
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10)
    };

    this.props.crudGetList(this.props.resource, pagination, { ...filter });
  }

  filterParams = query => {
    this.props.changeListParams(this.props.resource, query);
  };

  changeParams = action => {
    const query = this.getQuery();
    const newParams = queryReducer(query, action);
    this.props.push({
      ...this.props.location,
      search: `?${stringify({
        ...newParams,
        filter: JSON.stringify(newParams.filter)
      })}`
    });
    this.props.changeListParams(this.props.resource, newParams);
  };

  setPage = (page: number) => this.changeParams(this.props.setPageParams(page));

  setPerPage = (perPage: number) =>
    this.changeParams(this.props.setPageParams(perPage));

  setFilters = filters =>
    this.changeParams(this.props.setFiltersParams(filters));

  getFilterValues() {
    const query = this.getQuery();
    return query.filter || {};
  }

  render() {
    const {
      children,
      basePath,
      data,
      ids,
      total,
      hasCreate,
      resource,
      isLoading
    } = this.props;

    const query = this.getQuery();
    const page =
      (typeof query.page === 'string'
        ? parseInt(query.page, 10)
        : query.page) || 1;

    const perPage =
      (typeof query.perPage === 'string'
        ? parseInt(query.perPage, 10)
        : query.perPage) || 10;

    return children({
      basePath,
      data,
      ids,
      total,
      page,
      perPage,
      hasCreate,
      resource,
      isLoading,
      filterValues: this.getFilterValues(),
      setFilters: this.setFilters,
      setPage: this.setPage,
      setPerPage: this.setPerPage
    });
  }
}

export default connect(
  mapStateToProps,
  {
    crudGetList,
    changeListParams,
    setPageParams,
    setFiltersParams,
    push: pushAction
  }
)(ListController);
