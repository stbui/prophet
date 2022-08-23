/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

import { useEventCallback } from '../util';
import { useStoreContext } from './useStoreContext';

/**
 * @example
 * import { useStore } from '@prophet/core';
 *
 * const PostList = props => {
 *     const [density] = useStore('posts.list.density', 'small');
 *
 *     return (
 *         <List {...props}>
 *             <Datagrid size={density}>
 *                 ...
 *             </Datagrid>
 *         </List>
 *     );
 * }
 *
 * const ChangeDensity: FC<any> = () => {
 *     const [density, setDensity] = useStore('posts.list.density', 'small');
 *
 *     const changeDensity = (): void => {
 *         setDensity(density === 'small' ? 'medium' : 'small');
 *     };
 *
 *     return (
 *         <Button onClick={changeDensity}>
 *             {`Change density (current ${density})`}
 *         </Button>
 *     );
 * };
 */
export const useStore = <T = any>(
    key: string,
    defaultValue?: T
): useStoreResult<T> => {
    const { getItem, setItem, subscribe } = useStoreContext();
    const [value, setValue] = useState(() => getItem(key, defaultValue));

    useEffect(() => {
        const storedValue = getItem(key, defaultValue);
        if (!isEqual(value, storedValue)) {
            setValue(storedValue);
        }
        const unsubscribe = subscribe(key, newValue => {
            setValue(typeof newValue === 'undefined' ? defaultValue : newValue);
        });
        return () => unsubscribe();
    }, [key, subscribe, defaultValue, getItem, value]);

    const set = useEventCallback(
        (valueParam: T, runtimeDefaultValue: T) => {
            const newValue =
                typeof valueParam === 'function'
                    ? valueParam(value)
                    : valueParam;

            setItem(
                key,
                typeof newValue === 'undefined'
                    ? typeof runtimeDefaultValue === 'undefined'
                        ? defaultValue
                        : runtimeDefaultValue
                    : newValue
            );
        },
        [key, setItem, defaultValue, value]
    );
    // @ts-ignore
    return [value, set];
};

export type useStoreResult<T = any> = [
    T,
    (value: T | ((value: T) => void), defaultValue?: T) => void
];
