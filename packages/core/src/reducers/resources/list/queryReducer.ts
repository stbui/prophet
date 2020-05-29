/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { SET_FILTER, SET_PAGE, SET_PER_PAGE, SET_SORT } from '../../../actions';

const queryReducer: Reducer<any> = (previousState, { type, payload }) => {
    switch (type) {
        case SET_PAGE:
            return { ...previousState, page: payload };
        case SET_PER_PAGE:
            return { ...previousState, page: 1, perPage: payload };

        case SET_FILTER:
            return {
                ...previousState,
                page: 1,
                filter: payload.filter,
                displayedFilters: payload.displayedFilters
                    ? payload.displayedFilters
                    : previousState.displayedFilters,
            };

        case SET_SORT:
            if (payload.sort === previousState.sort) {
                return {
                    ...previousState,
                    page: 1,
                    order: previousState.sort === 'DESC' ? 'ASC' : 'DESC',
                };
            }

            return {
                ...previousState,
                page: 1,
                order: payload.order || 'ASC',
                sort: payload.sort,
            };

        default:
            return previousState;
    }
};

export default queryReducer;
