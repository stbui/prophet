/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import set from 'lodash/set';
import { SET_FILTER, SET_PAGE, SET_PER_PAGE, SET_SORT } from '../../../actions';
import { removeKey, removeEmpty } from '../../../util';

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

        case 'SHOW_FILTER': {
            if (
                previousState.displayedFilters &&
                previousState.displayedFilters[payload.filterName]
            ) {
                return previousState;
            }
            return {
                ...previousState,
                filter:
                    typeof payload.defaultValue !== 'undefined'
                        ? set(
                              previousState.filter,
                              payload.filterName,
                              payload.defaultValue
                          )
                        : previousState.filter,
                displayedFilters: {
                    ...previousState.displayedFilters,
                    [payload.filterName]: true,
                },
            };
        }

        case 'HIDE_FILTER': {
            return {
                ...previousState,
                filter: removeEmpty(removeKey(previousState.filter, payload)),
                displayedFilters: previousState.displayedFilters
                    ? Object.keys(previousState.displayedFilters).reduce(
                          (filters, filter) => {
                              return filter !== payload
                                  ? { ...filters, [filter]: true }
                                  : filters;
                          },
                          {}
                      )
                    : previousState.displayedFilters,
            };
        }

        default:
            return previousState;
    }
};

export default queryReducer;
