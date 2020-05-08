/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import debounce from 'lodash/debounce';
import set from 'lodash/set';
import pickBy from 'lodash/pickBy';

import {
    changeListParams,
    SET_FILTER,
    SET_SORT,
    SET_PAGE,
    SET_PER_PAGE,
} from '../actions/listActions';
import queryReducer from '../reducers/resources/list/queryReducer';
import { removeKey, removeEmpty } from '../util';
import { Sort } from '../types';
import { Location } from 'history';

interface ListParamsOptions {
    resource: string;
    location: Location;
    filterDefaultValues?: object;
    sort?: Sort;
    perPage?: number;
    debounceTime?: number;
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
 * @param {number} options.debounceTime
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
    debounceTime = 500,
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
        sort => changeParams({ type: SET_SORT, payload: { sort } }),
        requestSignature
    );

    const setPage = useCallback(
        page => changeParams({ type: SET_PAGE, payload: page }),
        requestSignature
    );

    const setPerPage = useCallback(
        perPage => changeParams({ type: SET_PER_PAGE, payload: perPage }),
        requestSignature
    );

    const filterValues = query.filter || {};
    const displayedFilterValues = query.displayedFilters || {};

    const debouncedSetFilters = debounce((newFilters, newDisplayedFilters) => {
        let payload: any = {
            filter: removeEmpty(newFilters),
            displayedFilters: undefined,
        };

        if (newDisplayedFilters) {
            payload.displayedFilters = Object.keys(newDisplayedFilters).reduce(
                (filters, filter) => {
                    return newDisplayedFilters[filter]
                        ? { ...filters, [filter]: true }
                        : filters;
                },
                {}
            );
        }

        changeParams({ type: SET_FILTER, payload });
    }, debounceTime);

    const setFilters = useCallback(
        (filters, displayedFilters) =>
            debouncedSetFilters(filters, displayedFilters),
        requestSignature
    );

    const hideFilter = useCallback((filterName: string) => {
        const newFilters = removeKey(filterValues, filterName);
        const newDisplayedFilters = {
            ...displayedFilterValues,
            [filterName]: undefined,
        };

        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature);

    const showFilter = useCallback((filterName: string, defaultValue: any) => {
        const newFilters = set(filterValues, filterName, defaultValue);
        const newDisplayedFilters = {
            ...displayedFilterValues,
            [filterName]: true,
        };

        setFilters(newFilters, newDisplayedFilters);
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

const parseObject = (query, field) => {
    if (query[field] && typeof query[field] === 'string') {
        try {
            query[field] = JSON.parse(query[field]);
        } catch (err) {
            delete query[field];
        }
    }
};
/**
 * 将url参数转换成对象
 * ?page=1&perPage=10&sort=stb&order=ASC&filter={}
 * @param {string} options.search
 */
export const parseQueryFromLocation = ({ search }) => {
    const query = pickBy(
        parse(search),
        (v, k) =>
            ['page', 'perPage', 'sort', 'order', 'filter'].indexOf(k) !== -1
    );

    parseObject(query, 'filter');
    parseObject(query, 'displayedFilters');

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
            params.order !== null ||
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
