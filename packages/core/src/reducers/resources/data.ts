/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */
import { Reducer } from 'redux';
import isEqual from 'lodash/isEqual';

import {
    GET_LIST,
    GET_ONE,
    UPDATE,
    CREATE,
} from '../../actions/dataFatchActions';
import { FETCH_END } from '../../actions/fetchActions';
import { getFetchedAt } from '../../util';

export interface Record {
    id: string | number;
    [key: string]: any;
}

interface RecordSetWithDate {
    [key: string]: Record | object;
    [key: number]: Record;
    fetchedAt: {
        [key: string]: Date;
        [key: number]: Date;
    };
}

export const hideFetchedAt = (
    records: RecordSetWithDate
): RecordSetWithDate => {
    Object.defineProperty(records, 'fetchedAt', {
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return records;
};

export const addRecordsAndRemoveOutdated = (
    newRecords: Record[] = [],
    oldRecords: RecordSetWithDate
): RecordSetWithDate => {
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
 * 添加新记录，并删除过期记录
 * @param newRecords [{id:1},{id:2}]
 * @param oldRecords {}
 */
export const addRecords = (
    newRecords: Record[] = [],
    oldRecords: RecordSetWithDate
): RecordSetWithDate => {
    const newRecordsById = { ...oldRecords };
    newRecords.forEach(record => {
        newRecordsById[record.id] = isEqual(record, oldRecords[record.id])
            ? (oldRecords[record.id] as Record)
            : record;
    });

    const updatedFetchedAt = getFetchedAt(
        newRecords.map(({ id }) => id),
        oldRecords.fetchedAt
    );

    Object.defineProperty(newRecordsById, 'fetchedAt', {
        value: { ...oldRecords.fetchedAt, ...updatedFetchedAt },
        enumerable: false,
    });

    return newRecordsById;
};

export const addOneRecord = (
    newRecord: Record,
    oldRecords: RecordSetWithDate,
    date = new Date()
): RecordSetWithDate => {
    const newRecordsById = {
        ...oldRecords,
        [newRecord.id]: isEqual(newRecord, oldRecords[newRecord.id])
            ? oldRecords[newRecord.id]
            : newRecord,
    };

    return Object.defineProperty(newRecordsById, 'fetchedAt', {
        value: { ...oldRecords.fetchedAt, [newRecord.id]: date },
        enumerable: false,
    });
};

const includesNotStrict = (items, element) =>
    items.some(item => item == element);

/**
 * 删除记录
 * @param removeRecords
 * @param oldRecords
 */
export const removeRecords = (
    removedRecordIds: any[] = [],
    oldRecords: RecordSetWithDate
): RecordSetWithDate => {
    const records = Object.entries(oldRecords)
        .filter(([key]) => !includesNotStrict(removedRecordIds, key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {
            fetchedAt: {},
        });
    records.fetchedAt = Object.entries(oldRecords.fetchedAt)
        .filter(([key]) => !includesNotStrict(removedRecordIds, key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});

    return hideFetchedAt(records);
};

const initialState = hideFetchedAt({ fetchedAt: {} });

const dataReducer: Reducer<RecordSetWithDate> = (
    previousState = initialState,
    { payload, meta }
) => {
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }

    switch (meta.fetchResponse) {
        case GET_LIST:
            return addRecordsAndRemoveOutdated(payload.data, previousState);
        case GET_ONE:
        case CREATE:
        case UPDATE:
            return addOneRecord(payload.data, previousState);
        default:
            return previousState;
    }
};

export default dataReducer;
