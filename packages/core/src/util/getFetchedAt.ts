import pickBy from 'lodash/pickBy';

const defaultCacheDuration = 10 * 60 * 1000;

/**
 *
 * @param newRecordIds id的数组 [1,2,3,4,5,6,7,8,9]
 * @param oldRecordFetchedAt 在旧记录获取日期
 * @param now 当前时间
 * @param cacheDuration 从列表中删除旧记录的时间
 *
 * @example
 *
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
