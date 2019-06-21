/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { GET_LIST, GET_ONE, UPDATE, CREATE } from '../../actions/dataFatchActions';

const defaultCacheDuration = 10 * 60 * 1000;

export const getFetchedAt = (
  newRecordIds,
  oldRecordFetchedAt = {},
  now = new Date(),
  cacheDuration = defaultCacheDuration
) => {
  const newFetchedAt = {};
  newRecordIds.forEach(recordId => (newFetchedAt[recordId] = now));

  return { ...oldRecordFetchedAt, ...newFetchedAt };
};

export const hideFetchedAt = records => {
  Object.defineProperty(records, 'fetchedAt', {
    enumerable: false,
    configurable: false,
    writable: false
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
