/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useReducer, useRef, useEffect, useCallback } from 'react';

const sortReducer = (state, { type, payload }) => {
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

export default (initialSort = { field: 'id', order: 'ASC' }) => {
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
    }, [initialSort.field, initialSort.order]);

    return { setSort, setSortField, setSortOrder, sort };
};
