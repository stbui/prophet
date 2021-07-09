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
    DELETE,
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
    const newRecordsById: any = {};
    newRecords.forEach(record => (newRecordsById[record.id] = record));

    const newFetchedAt = getFetchedAt(
        newRecords.map(({ id }) => id),
        oldRecords.fetchedAt
    );

    const records: any = { fetchedAt: newFetchedAt };
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
    const newRecordsById: any = { ...oldRecords };
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

/**
 * 更新相同id中的数据
 * @param {Record} newRecord
 * @param {RecordSetWithDate}  oldRecords
 * @param {date} date
 *
 * @returns {RecordSetWithDate}
 *
 * @example
 * const newRecord = [{id:1, name: 'prophet'}];
 * const oldRecords = [{id:1, name: 'stbui'}]
 * const record = addOneRecord(newRecord, oldRecords)
 */
export const addOneRecord = (
    newRecord: Record,
    oldRecords: RecordSetWithDate,
    date = new Date()
): RecordSetWithDate => {
    const newRecordsById: any = {
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

const includesNotStrict = (items: any, element: any) =>
    items.some((item: any) => item == element);

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
    if (meta && meta.optimistic) {
        // 更新状态数据

        if (meta.fetch === UPDATE) {
            const updatedRecord = {
                ...previousState[payload.id],
                ...payload.data,
            };
            return addOneRecord(updatedRecord, previousState);
        }

        if (meta.fetch === DELETE) {
            return removeRecords([payload.id], previousState);
        }
    }

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
