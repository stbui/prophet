import pickBy from './pickBy';

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

export default getFetchedAt;
