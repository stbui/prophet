/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import set from 'lodash/set';
import unset from 'lodash/unset';
import get from 'lodash/get';
import { Store } from './types';

type Subscription = {
    key: string;
    callback: (value: any) => void;
};

/**
 *
 * @example
 *
 * import { memoryStore } from '@prophet/core';
 *
 * const App = () => (
 *    <Admin store={memoryStore()}>
 *       ...
 *   </Admin>
 * );
 */
export const memoryStore = (storage: any = {}): Store => {
    const subscriptions: { [key: string]: Subscription } = {};
    const publish = (key: string, value: any) => {
        Object.keys(subscriptions).forEach(id => {
            if (!subscriptions[id]) return;
            if (subscriptions[id].key === key) {
                subscriptions[id].callback(value);
            }
        });
    };
    return {
        setup: () => {},
        teardown: () => {
            Object.keys(storage).forEach(key => delete storage[key]);
        },
        getItem<T = any>(key: string, defaultValue?: T): T {
            return get(storage, key, defaultValue);
        },
        setItem<T = any>(key: string, value: T): void {
            set(storage, key, value);
            publish(key, value);
        },
        removeItem(key: string): void {
            unset(storage, key);
            publish(key, undefined);
        },
        reset(): void {
            Object.keys(storage).forEach(key => {
                unset(storage, key);
                publish(key, undefined);
            });
        },
        subscribe: (key: string, callback: (value: string) => void) => {
            const id = Math.random().toString();
            subscriptions[id] = {
                key,
                callback,
            };
            return () => {
                delete subscriptions[id];
            };
        },
    };
};
