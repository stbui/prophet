/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import pickBy from 'lodash/pickBy';

const defaultCacheDuration = 10 * 60 * 1000;

interface FetchedOutDates {
    [key: string]: Date;
    [key: number]: Date;
}

/**
 *
 * @param newRecordIds id的数组 [1,2,3,4,5,6,7,8,9]
 * @param oldRecordFetchedAt 在旧记录获取日期
 * @param now 当前时间
 * @param cacheDuration 从列表中删除旧记录的时间
 *
 * @return
 * {
 *      1: new Date('2020-11-11T11:11:11.000Z'),
 *      2: new Date('2020-12-11T11:11:11.000Z'),
 * }
 */
export const getFetchedAt = (
    newRecordIds: any[],
    oldRecordFetchedAt: FetchedOutDates = {},
    now = new Date(),
    cacheDuration = defaultCacheDuration
): FetchedOutDates => {
    const newFetchedAt = {};
    newRecordIds.forEach(recordId => (newFetchedAt[recordId] = now));

    const latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);

    const stillValidFetchedAt = pickBy(
        oldRecordFetchedAt,
        date => (date: any) => latestValidDate
    );

    return { ...stillValidFetchedAt, ...newFetchedAt };
};

export default getFetchedAt;
