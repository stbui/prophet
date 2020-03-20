/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { parse, stringify } from 'query-string';
import { useHistory } from 'react-router-dom';
import { changeListParams } from '../actions/listActions';
import queryReducer from '../reducers/resources/list/queryReducer';
import { pickBy, removeKey, removeEmpty } from '../util';
import { Sort } from '../types';
import { Location } from 'history';

interface ListParamsOptions {
    resource: string;
    location: Location;
    filterDefaultValues?: object;
    sort?: Sort;
    perPage?: number;
    debounce?: number;
}

export interface ListParams {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
    filterValues: object;
    displayedFilters: {
        [key: string]: boolean;
    };
    requestSignature: any[];
}

interface Modifiers {
    changeParams: (action: any) => void;
    setPage: (page: number) => void;
    setPerPage: (pageSize: number) => void;
    setSort: (sort: string) => void;
    setFilters: (filters: any, displayedFilters: any) => void;
    hideFilter: (filterName: string) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
}

/**
 * ListParams
 *
 * @param {Object} options
 * @param {string} options.resource
 * @param {Object} options.location
 * @param {Object} options.filterDefaultValues
 * @param {Object} options.sort
 * @param {order} options.sort.field
 * @param {order} options.sort.order
 * @param {number} options.perPage
 * @param {number} options.debounce
 * @returns
 *
 * @example
 *
 * const [query, queryMethod] = useListParams({
 *      resource: 'users',
 *      location: {},
 *      filterDefaultValues: { username: 'stbui' },
 *      sort: { field: 'id', order: 'ASC' },
 *      perPage: 20
 * })
 *
 */
export const useListParams = ({
    resource,
    location,
    filterDefaultValues,
    sort = { field: 'id', order: 'ASC' },
    perPage = 10,
    debounce = 500,
}: ListParamsOptions): [ListParams, Modifiers] => {
    const dispatch = useDispatch();
    const history = useHistory();

    const params = useSelector(
        (state: any) =>
            state.resources[resource]
                ? state.resources[resource].list.params
                : {},
        shallowEqual
    );

    const requestSignature = [
        location.search,
        resource,
        params,
        filterDefaultValues,
        JSON.stringify(sort),
        perPage,
    ];

    const query = useMemo(
        () =>
            getQuery({ location, params, filterDefaultValues, sort, perPage }),
        requestSignature
    );

    const changeParams = useCallback(action => {
        const newParams = queryReducer(query, action);

        history.push({
            search: `?${stringify({
                ...newParams,
                filter: JSON.stringify(newParams.filter),
                displayedFilters: JSON.stringify(newParams.displayedFilters),
            })}`,
        });

        dispatch(changeListParams(resource, newParams));
    }, requestSignature);

    const setSort = useCallback(
        sort => changeParams({ type: 'SET_SORT', payload: { sort } }),
        requestSignature
    );

    const setPage = useCallback(
        page => changeParams({ type: 'SET_PAGE', payload: page }),
        requestSignature
    );

    const setPerPage = useCallback(
        perPage => changeParams({ type: 'SET_PER_PAGE', payload: perPage }),
        requestSignature
    );

    const filterValues = query.filter || {};
    const displayedFilterValues = query.displayedFilters || {};

    const setFilters = useCallback((filters, displayedFilters) => {
        let payload: any = {
            filter: removeEmpty(filters),
            displayedFilters: undefined,
        };

        if (displayedFilters) {
            payload.displayedFilters = Object.keys(displayedFilters).reduce(
                (filters, filter) => {
                    return displayedFilters[filter]
                        ? { ...filters, [filter]: true }
                        : filters;
                },
                {}
            );
        }

        changeParams({ type: 'SET_FILTERS', payload });
    }, requestSignature);

    const hideFilter = useCallback((filterName: string) => {
        const newFilters = removeKey(filterValues, filterName);
        const newDisplayedFilters = removeKey(
            displayedFilterValues,
            filterName
        );
        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature);

    const showFilter = useCallback((filterName: string, defaultValue: any) => {
        setFilters(
            {
                ...filterValues,
                [filterName]: defaultValue,
            },
            { ...displayedFilterValues, [filterName]: true }
        );
    }, requestSignature);

    return [
        {
            displayedFilters: displayedFilterValues,
            filterValues,
            requestSignature,
            ...query,
        },
        {
            changeParams,
            setPage,
            setPerPage,
            setSort,
            setFilters,
            hideFilter,
            showFilter,
        },
    ];
};

/**
 * 将url参数转换成对象
 * ?page=1&perPage=10&sort=stb&order=ASC&filter={}
 * @param {string} options.search
 */
export const parseQueryFromLocation = ({ search }) => {
    const query: any = pickBy(
        parse(search),
        (v, k) =>
            ['page', 'perPage', 'sort', 'order', 'filter'].indexOf(k) !== -1
    );

    if (query.filter && typeof query.filter === 'string') {
        try {
            query.filter = JSON.parse(query.filter);
        } catch (err) {
            delete query.filter;
        }
    }

    return query;
};

/**
 *
 * { filter: {}, order: null, page: 1, perPage: null, sort: null }
 * @param {object} params
 */
export const hasCustomParams = params => {
    return (
        params &&
        params.filter &&
        (Object.keys(params.filter).length > 0 ||
            params.order !== 1 ||
            params.page !== 1 ||
            params.perPage != null ||
            params.sort != null)
    );
};

/**
 *
 * @param {Object} options
 * @param {Object} options.location
 * @param {Object} options.params
 * @param {string} options.filterDefaultValues
 * @param {Object} options.sort
 * @param {number} options.perPage
 */
export const getQuery = ({
    location,
    params,
    filterDefaultValues,
    sort,
    perPage,
}) => {
    const queryFormLocation = parseQueryFromLocation(location);
    const query =
        Object.keys(queryFormLocation).length > 0
            ? queryFormLocation
            : hasCustomParams(params)
            ? { ...params }
            : { filter: filterDefaultValues || {} };

    if (!query.sort) {
        query.sort = sort.field;
        query.order = sort.order;
    }

    if (!query.perPage) {
        query.perPage = perPage;
    }

    if (!query.page) {
        query.page = 1;
    }

    return {
        ...query,
        page:
            (typeof query.page === 'string'
                ? parseInt(query.page, 10)
                : query.page) || 1,
        perPage:
            (typeof query.perPage === 'string'
                ? parseInt(query.perPage, 10)
                : query.perPage) || 10,
    };
};
