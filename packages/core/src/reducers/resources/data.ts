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
import { getFetchedAt, isEqual } from '../../util';

export const hideFetchedAt = records => {
    Object.defineProperty(records, 'fetchedAt', {
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return records;
};

/**
 * 添加新记录，在获取之前显示缓存的数据，并删除过期记录
 * @param newRecords [{id:1},{id:2}]
 * @param oldRecords {}
 */
export const addRecords = (newRecords: any[] = [], oldRecords) => {
    const newRecordsById = {};
    newRecords.forEach(record => (newRecordsById[record.id] = record));

    const newFetchedAt = getFetchedAt(
        newRecords.map(({ id }) => id),
        oldRecords.fetchedAt
    );

    const records = { fetchedAt: newFetchedAt };
    Object.keys(newFetchedAt).forEach(
        id =>
            (records[id] = newRecordsById[id]
                ? isEqual(newRecordsById[id], oldRecords[id])
                    ? oldRecords[id]
                    : newRecordsById[id]
                : oldRecords[id])
    );

    return hideFetchedAt(records);
};

/**
 * 删除记录
 * @param removeRecords
 * @param oldRecords
 */
export const removeRecords = (removeRecords: any[] = [], oldRecords) => {
    const records = Object.entries(oldRecords)
        .filter(([key]) => !removeRecords.includes(key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {
            fetchedAt: {},
        });

    records.fetchedAt = Object.entries(oldRecords.fetchedAt)
        .filter(([key]) => !removeRecords.includes(key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});

    return hideFetchedAt(records);
};

export default (previousState = {}, { payload, meta }) => {
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
