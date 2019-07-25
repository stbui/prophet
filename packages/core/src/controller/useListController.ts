/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { isValidElement, useState, useEffect, useMemo } from 'react';
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

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { data, list } = useSelector((state: any) => state.resources[resource]);
    const { total, ids } = list;
    const version = useSelector((state: any) => state.refresh);

    const [query, queryMethod] = useListParams({
        resource,
        location,
        filterDefaultValues,
        sort,
        perPage,
        debounce,
    });

    useEffect(() => {
        dispatch(
            crudGetList(
                resource,
                {
                    page: query.page,
                    perPage: query.perPage,
                },
                { ...query.filter, ...filter },
                { field: query.sort, order: query.order },
                () => {
                    setLoading(false)
                }
            )
        );
    }, [resource, basePath, query.page, query.perPage, query.sort, query.order, JSON.stringify(query.filterValues), version]);

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
        ids,
        currentSort,
        total,
        hasCreate,
        page: query.page,
        perPage: query.perPage,
        filterValues: query.filterValues,
        displayedFilters: query.displayedFilters,
        setFilters: queryMethod.setFilters,
        hideFilter: queryMethod.hideFilter,
        showFilter: queryMethod.showFilter,
        setPage: queryMethod.setPage,
        setPerPage: queryMethod.setPerPage,
        setSort: queryMethod.setSort,
        isLoading: loading,
        version,
    };
};

export default useListController;
