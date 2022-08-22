/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { isValidElement, useMemo, useEffect } from 'react';
import { useListParams } from './useListParams';
import { useGetList } from '../../dataProvider';
import useVersion from '../useVersion';
import { useNotify } from '../../sideEffect';
import { useResourceContext } from '../../core';

export interface ListProps {
    resource: string;
    basePath: string;
    hasCreate?: boolean;
    filterDefaultValues?: object;
    sort?: any;
    perPage?: number;
    filter?: object;
    debounce?: number;
    [key: string]: any;
}

export interface ListControllerProps {
    resource: string;
    basePath: string;
    data: any;
    ids: any;
    currentSort: any;
    total: number;
    hasCreate: any;
    page: number;
    perPage: number;
    filterValues: any;
    displayedFilters: any;
    setFilters: (filters: any, displayedFilters: any) => void;
    hideFilter: (filterName: string) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
    setPage: (page: number) => void;
    setPerPage: (page: number) => void;
    setSort: (sort: string) => void;
    loading: any;
    loaded: any;
    version: number;
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
export const useListController = (props: ListProps): ListControllerProps => {
    const {
        basePath,
        hasCreate,
        filterDefaultValues,
        filter,
        sort = { field: 'id', order: 'ASC' },
        perPage = 10,
        debounce = 500,
    } = props;
    const resource = useResourceContext(props);

    if (filter && isValidElement(filter)) {
        throw new Error('<List filter={{}}>...</List>');
    }

    const version = useVersion();
    const notify = useNotify();

    const [query, queryMethod] = useListParams({
        resource,
        filterDefaultValues,
        sort,
        perPage,
        debounceTime: debounce,
    });

    const { data, ids, total, loading, loaded } = useGetList(
        resource,
        {
            page: query.page,
            perPage: query.perPage,
        },
        { ...query.filter, ...filter },
        { field: query.sort, order: query.order },
        {
            version,
            onFailure: error =>
                notify(
                    typeof error === 'string'
                        ? error
                        : error.message || 'prophet.notification.http_error',
                    'error'
                ),
        }
    );

    useEffect(() => {
        if (
            query.page <= 0 ||
            (!loading && query.page > 1 && (ids || []).length === 0)
        ) {
            queryMethod.setPage(1);
        }
    }, [loading, query.page, ids, queryMethod]);

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
        ids: ids || [],
        currentSort,
        total: total != undefined ? total : 0,
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
