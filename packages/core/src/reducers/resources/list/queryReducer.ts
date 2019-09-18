/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { SET_FILTERS, SET_PAGE, SET_PER_PAGE } from '../../../actions';

export default (previousState, { type, payload }) => {
    switch (type) {
        case SET_PAGE:
            return { ...previousState, page: payload };
        case SET_PER_PAGE:
            return { ...previousState, page: 1, perPage: payload };
        case SET_FILTERS:
            return { ...previousState, page: 1, filter: payload };
        default:
            return previousState;
    }
};
