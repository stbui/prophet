/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { FilterPayload } from '../types';

export interface UseFilterStateOptions {
    filterToQuery?: (v: string) => FilterPayload;
    permanentFilter?: FilterPayload;
    debounceTime?: number;
}

export interface FilterProps {
    filter: FilterPayload;
    setFilter: (v: string) => void;
}

/**
 * Filter
 *
 * @param {Object} options
 * @param {Object} options.filterToQuery
 * @param {Object} options.permanentFilter
 * @param {number} options.debounceTime
 * @returns {FilterProps}
 *
 * @example
 *
 * const { filter, setFilter } = useFilterState({
 *      filterToQuery: v => ({ query: v }),
 *      permanentFilter: { name: 'stbui' },
 *      debounceTime: 500,
 * });
 *
 */
export default ({
    filterToQuery = (v: string) => ({ q: v }),
    permanentFilter = {},
    debounceTime = 500,
}): FilterProps => {
    const [filter, setFilterValue] = useState({
        ...permanentFilter,
        ...filterToQuery(''),
    });

    const setFilter = useCallback(
        debounce((value: string) => {
            setFilterValue({
                ...permanentFilter,
                ...filterToQuery(value),
            });
        }, debounceTime),
        [JSON.stringify(permanentFilter)]
    );

    return { filter, setFilter };
};
