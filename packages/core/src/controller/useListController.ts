/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { isValidElement, useMemo } from 'react';
import { useListParams } from './useListParams';
import { useGetList } from '../dataProvider';
import useVerison from './useVersion';

export interface ListProps {
    resource: string;
    basePath: string;
    location: any;
    hasCreate?: boolean;
    filterDefaultValues?: object;
    sort?: any;
    perPage?: number;
    filter?: object;
    debounce?: number;
}

export const useListController = (props: ListProps) => {
    const {
        resource,
        basePath,
        location,
        hasCreate,
        filterDefaultValues,
        filter,
        sort,
        perPage = 10,
        debounce = 500,
    } = props;

    if (filter && isValidElement(filter)) {
        throw new Error('<List filter={{}}>...</List>');
    }

    const version = useVerison();

    const [query, queryMethod] = useListParams({
        resource,
        location,
        filterDefaultValues,
        sort,
        perPage,
        debounce,
    });

    const { data, ids, total, loading, loaded } = useGetList(
        resource,
        {
            page: query.page,
            perPage: query.perPage,
        },
        { ...query.filter, ...filter },
        { field: query.sort, order: query.order },
        { version }
    );

    if (!query.page && !(ids || []).length && query.page > 1 && total > 0) {
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
        loading,
        loaded,
        version,
    };
};

export default useListController;
