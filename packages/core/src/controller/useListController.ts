/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { isValidElement, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useListParams } from './useListParams';
import { crudGetList } from '../actions';

export interface ListProps {
    resource: string;
    basePath: string;
    location: any;
    hasCreate: any;
    filterDefaultValues: any;
    sort: any;
    perPage: any;
    filter: any;
    debounce: any;
}

export const useListController = (props: ListProps) => {
    const {
        resource,
        basePath,
        location,
        hasCreate,
        filterDefaultValues,
        sort,
        perPage = 10,
        filter,
        debounce = 500,
    } = props;

    if (filter && isValidElement(filter)) {
        throw new Error('<List filter={{}}>...</List>');
    }

    const dispatch = useDispatch();
    const [data] = useSelector((state: any) => state.resources[resource]);
    const [version] = useSelector((state: any) => state.refresh);
    const [total, ids] = useSelector(
        (state: any) => state.resources[resource].list
    );

    const [query, queryMethod] = useListParams({
        resource,
        location,
        filterDefaultValues,
        sort,
        perPage,
        debounce,
    });

    useCallback(() => {
        dispatch(
            crudGetList(
                resource,
                {
                    page: query.page,
                    perPage: query.perPage,
                },
                { ...query.filter, ...filter },
                { field: query.sort, order: query.order }
            )
        );
    }, [resource, basePath]);

    if (!query.page && query.page > 1 && total > 0) {
        queryMethod.setPage(query.page - 1);
    }

    const currentSort = useMemo(
        () => ({
            field: query.sort,
            order: query.order,
        }),
        [query.sort, query.order]
    );

    return {
        resource,
        basePath,
        data,
        currentSort,
        displayedFilters: query.displayedFilters,
        filterValues: query.filterValues,
        ids,
        page: query.page,
        perPage: query.perPage,
        setFilters: queryMethod.setFilters,
        hideFilter: queryMethod.hideFilter,
        showFilter: queryMethod.showFilter,
        setPage: queryMethod.setPage,
        setPerPage: queryMethod.setPerPage,
        setSort: queryMethod.setSort,
        hasCreate,
        total,
        isLoading: false,
        version,
    };
};

export default useListController;
