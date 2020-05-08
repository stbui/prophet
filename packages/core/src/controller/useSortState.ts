/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useReducer, useRef, useEffect, useCallback } from 'react';
import { Sort } from '../types';

export interface SortProps {
    sort: Sort;
    setSort: (sort: Sort) => void;
    setSortField: (field: string) => void;
    setSortOrder: (order: string) => void;
}

const sortReducer = (state: Sort, { type, payload }) => {
    switch (type) {
        case 'SET_SORT':
            return payload.sort;
        case 'SET_SORT_FIELD': {
            const { field } = payload;
            const order =
                state.field === field
                    ? state.order === 'ASC'
                        ? 'DESC'
                        : 'ASC'
                    : 'ASC';
            return { field, order };
        }
        case 'SET_SORT_ORDER': {
            const { order } = payload;
            return {
                ...state,
                order,
            };
        }
        default:
            return state;
    }
};

/**
 * sort
 *
 * @param {Object} initialSort
 * @param {string} initialSort.field
 * @param {string} initialSort.order
 * @returns {SortProps}
 *
 * @example
 *
 * const { sort, setSort, setSortField, setSortOrder } = useSortState({
 *      field: 'name',
 *      order: 'ASC',
 * });
 *
 * setSort({ field: 'name', order: 'ASC' });
 * setSortField('name');
 * setSortField('name');
 */
export default (
    initialSort: Sort = { field: 'id', order: 'ASC' }
): SortProps => {
    const [sort, dispatch] = useReducer(sortReducer, initialSort);
    const isFirstRender = useRef(true);

    const setSort = useCallback(
        sort => dispatch({ type: 'SET_SORT', payload: { sort } }),
        [dispatch]
    );

    const setSortField = useCallback(
        field => dispatch({ type: 'SET_SORT_FIELD', payload: { field } }),
        [dispatch]
    );

    const setSortOrder = useCallback(
        order => dispatch({ type: 'SET_SORT_ORDER', payload: { order } }),
        [dispatch]
    );

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        dispatch({ type: 'SET_SORT', payload: { sort: initialSort } });
    }, [initialSort.field, initialSort.order]);

    return { setSort, setSortField, setSortOrder, sort };
};
