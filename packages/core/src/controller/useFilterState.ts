/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { Filter } from '../types';

export interface FilterProps {
    filter: Filter;
    setFilter: (v: string) => void;
}

let timer;

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
 *      fieldfilterToQuery: v => ({ query: v }),
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
        []
    );

    return { filter, setFilter };
};
