/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { isValidElement, useMemo, useEffect } from 'react';
import { useListParams } from './useListParams';
import { useGetList } from '../../dataProvider';
import { useNotify } from '../../notification';
import { useResourceContext } from '../../core';
import { SortPayload } from '../../types';

export interface ListControllerProps {
    resource?: string;
    sort?: SortPayload;
    perPage?: number;
    filter?: object;
    filterDefaultValues?: object;
    debounce?: number;
    disableAuthentication?: boolean;
    disableSyncWithLocation?: boolean;
    queryOptions?: any;
}

export interface ListControllerResult {
    resource: string;
    data: any[];
    sort: SortPayload;
    refetch: any;
    isFetching: boolean;
    isLoading: boolean;
    error: any;
    total: number;
    page: number;
    perPage?: number;
    filter?: any;
    filterValues: any;
    displayedFilters: any;
    setFilters: (
        filters: any,
        displayedFilters: any,
        debounce?: boolean
    ) => void;
    hideFilter: (filterName: string) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
    setPage: (page: number) => void;
    setPerPage: (page: number) => void;
    setSort: (sort: SortPayload) => void;
}

/**
 *
 * @param {object} props
 *
 * @return {Object}
 *
 * @example
 *
 * import { useListController } from '@stbui/prophet-core';
 * import ListView from './ListView';
 *
 * const List = props => {
 *     const controllerProps = useListController(props);
 *     return <ListView { ...controllerProps } {...props } />;
 * }
 *
 */
export const useListController = (
    props: ListControllerProps = {}
): ListControllerResult => {
    const {
        filterDefaultValues,
        filter,
        sort = { field: 'id', order: 'ASC' },
        perPage = 10,
        debounce = 500,
        queryOptions = {},
        disableAuthentication,
    } = props;
    const resource = useResourceContext(props);
    const { meta, ...otherQueryOptions } = queryOptions;

    if (filter && isValidElement(filter)) {
        throw new Error('<List filter={{}}>...</List>');
    }

    const notify = useNotify();

    const [query, queryMethod] = useListParams({
        resource,
        filterDefaultValues,
        sort,
        perPage,
        debounce,
    });

    const { data, pageInfo, total, error, isLoading, isFetching, refetch } =
        useGetList(
            resource,
            {
                pagination: {
                    page: query.page,
                    perPage: query.perPage,
                },
                sort: { field: query.sort, order: query.order },
                filter: { ...query.filter, ...filter },
                meta,
            },
            {
                keepPreviousData: true,
                retry: false,
                onError: error =>
                    notify(error?.message || 'ra.notification.http_error', {
                        type: 'warning',
                        messageArgs: {
                            _: error?.message,
                        },
                    }),
                ...otherQueryOptions,
            }
        );

    useEffect(() => {
        if (
            query.page <= 0 ||
            (!isFetching && query.page > 1 && data.length === 0)
        ) {
            queryMethod.setPage(1);
        }
    }, [isFetching, query.page, data, queryMethod, total]);

    const currentSort = useMemo(
        () => ({
            field: query.sort,
            order: query.order,
        }),
        [query.sort, query.order]
    );

    return {
        resource,
        data,
        sort: currentSort,
        total: total != undefined ? total : 0,
        displayedFilters: query.displayedFilters,
        refetch,
        isFetching,
        isLoading,
        error,
        page: query.page,
        perPage: query.perPage,
        filter,
        filterValues: query.filterValues,
        setFilters: queryMethod.setFilters,
        hideFilter: queryMethod.hideFilter,
        showFilter: queryMethod.showFilter,
        setPage: queryMethod.setPage,
        setPerPage: queryMethod.setPerPage,
        setSort: queryMethod.setSort,
    };
};
