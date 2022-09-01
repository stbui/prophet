import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import { parse, stringify } from 'query-string';
import lodashDebounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';
import { useNavigate, useLocation } from 'react-router-dom';

import { useStore } from '../../store';
import queryReducer, {
    SET_FILTER,
    HIDE_FILTER,
    SHOW_FILTER,
    SET_PAGE,
    SET_PER_PAGE,
    SET_SORT,
    SORT_ASC,
} from './queryReducer';
import { SortPayload, FilterPayload } from '../../types';
import { removeEmpty } from '../../util';
import { useIsMounted } from '../../util/hooks';

export interface ListParams {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
    displayedFilters: any;
}

export const useListParams = ({
    resource,
    filterDefaultValues,
    sort = defaultSort,
    perPage = 10,
    debounce = 500,
    disableSyncWithLocation = false,
}: ListParamsOptions): [Parameters, Modifiers] => {
    const location = useLocation();
    const navigate = useNavigate();
    const [localParams, setLocalParams] = useState(defaultParams);
    const storeKey = `${resource}.listParams`;
    const [params, setParams] = useStore(storeKey, defaultParams);
    const tempParams = useRef<ListParams>();
    const isMounted = useIsMounted();

    const requestSignature = [
        location.search,
        resource,
        JSON.stringify(disableSyncWithLocation ? localParams : params),
        JSON.stringify(filterDefaultValues),
        JSON.stringify(sort),
        perPage,
        disableSyncWithLocation,
    ];

    const queryFromLocation = disableSyncWithLocation
        ? {}
        : parseQueryFromLocation(location);

    const query = useMemo(
        () =>
            getQuery({
                queryFromLocation,
                params: disableSyncWithLocation ? localParams : params,
                filterDefaultValues,
                sort,
                perPage,
            }),
        requestSignature
    );

    useEffect(() => {
        if (Object.keys(queryFromLocation).length > 0) {
            setParams(query);
        }
    }, [location.search]);

    const changeParams = useCallback(
        action => {
            if (!isMounted.current) return;

            if (!tempParams.current) {
                tempParams.current = queryReducer(query, action);
                setTimeout(() => {
                    if (disableSyncWithLocation) {
                        // @ts-ignore
                        setLocalParams(tempParams.current);
                    } else {
                        navigate(
                            {
                                search: `?${stringify({
                                    ...tempParams.current,
                                    filter: JSON.stringify(
                                        // @ts-ignore
                                        tempParams.current.filter
                                    ),
                                    displayedFilters: JSON.stringify(
                                        // @ts-ignore
                                        tempParams.current.displayedFilters
                                    ),
                                })}`,
                            },
                            {
                                state: {
                                    _scrollToTop: action.type === SET_PAGE,
                                },
                            }
                        );
                    }
                    tempParams.current = undefined;
                }, 0);
            } else {
                tempParams.current = queryReducer(tempParams.current, action);
            }
        },
        [...requestSignature, navigate]
    );

    const setSort = useCallback(
        (sort: SortPayload) =>
            changeParams({
                type: SET_SORT,
                payload: sort,
            }),
        [changeParams]
    );

    const setPage = useCallback(
        (newPage: number) => changeParams({ type: SET_PAGE, payload: newPage }),
        [changeParams]
    );

    const setPerPage = useCallback(
        (newPerPage: number) =>
            changeParams({ type: SET_PER_PAGE, payload: newPerPage }),
        [changeParams]
    );

    const filterValues = query.filter || emptyObject;
    const displayedFilterValues = query.displayedFilters || emptyObject;

    const debouncedSetFilters = lodashDebounce((filter, displayedFilters) => {
        changeParams({
            type: SET_FILTER,
            payload: {
                filter: removeEmpty(filter),
                displayedFilters,
            },
        });
    }, debounce);

    const setFilters = useCallback(
        (filter, displayedFilters, debounce = true) =>
            debounce
                ? debouncedSetFilters(filter, displayedFilters)
                : changeParams({
                      type: SET_FILTER,
                      payload: {
                          filter: removeEmpty(filter),
                          displayedFilters,
                      },
                  }),
        [changeParams]
    );

    const hideFilter = useCallback(
        (filterName: string) => {
            changeParams({
                type: HIDE_FILTER,
                payload: filterName,
            });
        },
        [changeParams]
    );

    const showFilter = useCallback(
        (filterName: string, defaultValue: any) => {
            changeParams({
                type: SHOW_FILTER,
                payload: {
                    filterName,
                    defaultValue,
                },
            });
        },
        [changeParams]
    );

    return [
        {
            // @ts-ignore
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

export const validQueryParams = [
    'page',
    'perPage',
    'sort',
    'order',
    'filter',
    'displayedFilters',
];

const parseObject = (query, field) => {
    if (query[field] && typeof query[field] === 'string') {
        try {
            query[field] = JSON.parse(query[field]);
        } catch (err) {
            delete query[field];
        }
    }
};

export const parseQueryFromLocation = ({ search }): Partial<ListParams> => {
    const query = pickBy(
        parse(search),
        (v, k) => validQueryParams.indexOf(k) !== -1
    );
    parseObject(query, 'filter');
    parseObject(query, 'displayedFilters');
    return query;
};

export const hasCustomParams = (params: ListParams) => {
    return (
        params &&
        params.filter &&
        (Object.keys(params.filter).length > 0 ||
            params.order != null ||
            params.page !== 1 ||
            params.perPage != null ||
            params.sort != null)
    );
};

export const getQuery = ({
    queryFromLocation,
    params,
    filterDefaultValues,
    sort,
    perPage,
}) => {
    const query: Partial<ListParams> =
        Object.keys(queryFromLocation).length > 0
            ? queryFromLocation
            : hasCustomParams(params)
            ? { ...params }
            : { filter: filterDefaultValues || {} };

    if (!query.sort) {
        query.sort = sort.field;
        query.order = sort.order;
    }
    if (query.perPage == null) {
        query.perPage = perPage;
    }
    if (query.page == null) {
        query.page = 1;
    }

    return {
        ...query,
        page: getNumberOrDefault(query.page, 1),
        perPage: getNumberOrDefault(query.perPage, 10),
    } as ListParams;
};

export const getNumberOrDefault = (
    possibleNumber: string | number | undefined,
    defaultValue: number
) => {
    const parsedNumber =
        typeof possibleNumber === 'string'
            ? parseInt(possibleNumber, 10)
            : possibleNumber;

    // @ts-ignore
    return isNaN(parsedNumber) ? defaultValue : parsedNumber;
};

export interface ListParamsOptions {
    resource: string;
    perPage?: number;
    sort?: SortPayload;
    filterDefaultValues?: FilterPayload;
    debounce?: number;
    disableSyncWithLocation?: boolean;
}

interface Parameters extends ListParams {
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
    setSort: (sort: SortPayload) => void;
    setFilters: (filters: any, displayedFilters: any) => void;
    hideFilter: (filterName: string) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
}

const emptyObject = {};

const defaultSort = {
    field: 'id',
    order: SORT_ASC,
};

const defaultParams = {};
