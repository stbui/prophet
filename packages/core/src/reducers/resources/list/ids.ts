/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import {
    CRUD_GET_LIST_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
    CRUD_CREATE_SUCCESS,
} from '../../../actions';
import { getFetchedAt } from '../../../util';

export const addRecordIds = (newRecordIds, oldRecordIds) => {
    const newFetchedAt = getFetchedAt(newRecordIds, oldRecordIds.fetchedAt);
    const recordIds: any = Array.from(
        new Set(
            oldRecordIds.filter(id => !!newFetchedAt[id]).concat(newRecordIds)
        )
    );

    Object.defineProperty(recordIds, 'fetchedAt', { value: newFetchedAt });

    return recordIds;
};

export const ids = (previousState = [], { type, payload }) => {
    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return addRecordIds(
                payload.data.map(({ id }) => id),
                []
            );
        case CRUD_GET_ONE_SUCCESS:
        case CRUD_CREATE_SUCCESS:
            return addRecordIds([payload.data.id], previousState);
        default:
            return previousState;
    }
};

export default ids;
