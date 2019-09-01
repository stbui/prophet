/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import {
    GET_LIST,
    GET_ONE,
    UPDATE,
    CREATE,
} from '../../actions/dataFatchActions';
import { FETCH_END } from '../../actions/fetchActions';
import { pickBy } from '../../util';

const defaultCacheDuration = 10 * 60 * 1000;

/**
 *
 * @param newRecordIds [1,2,3,4,5,6,7,8,9]
 * @param oldRecordFetchedAt
 * @param now
 * @param cacheDuration
 */
export const getFetchedAt = (
    newRecordIds: any[],
    oldRecordFetchedAt = {},
    now = new Date(),
    cacheDuration = defaultCacheDuration
) => {
    const newFetchedAt = {};
    newRecordIds.forEach(recordId => (newFetchedAt[recordId] = now));

    const latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);

    const stillValidFetchedAt = pickBy(
        oldRecordFetchedAt,
        date => date > latestValidDate
    );

    return { ...stillValidFetchedAt, ...newFetchedAt };
};

export const hideFetchedAt = records => {
    Object.defineProperty(records, 'fetchedAt', {
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return records;
};

export const addRecords = (newRecords, oldRecords) => {
    const newRecordsById = {};
    newRecords.forEach(record => (newRecordsById[record.id] = record));

    const newFetchedAt = getFetchedAt(
        newRecords.map(({ id }) => id),
        oldRecords.fetchedAt
    );

    const records = { fetchedAt: newFetchedAt };
    Object.keys(newFetchedAt).forEach(
        id => (records[id] = newRecordsById[id] || oldRecords[id])
    );

    return records;
};

export default (previousState = {}, { type, payload, meta }) => {
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }

    switch (meta.fetchResponse) {
        case GET_LIST:
            return addRecords(payload.data, previousState);
        case GET_ONE:
        case CREATE:
        case UPDATE:
            return addRecords([payload.data], previousState);
        default:
            return previousState;
    }
};
