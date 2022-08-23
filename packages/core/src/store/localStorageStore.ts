/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { Store } from './types';

type Subscription = {
    key: string;
    callback: (value: any) => void;
};

const RA_STORE = 'RaStore';

const testLocalStorage = () => {
    if (typeof window === 'undefined' || window.localStorage == undefined) {
        return false;
    }

    try {
        window.localStorage.setItem('test', 'test');
        window.localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
};

let localStorageAvailable = testLocalStorage();

/**
 *
 * @example
 *
 * import { localStorageProvider } from '@prophet/core';
 *
 * const App = () => (
 *    <Admin store={localStorageProvider()}>
 *       ...
 *   </Admin>
 * );
 */
export const localStorageStore = (
    version: string = '1',
    appKey: string = ''
): Store => {
    const prefix = `${RA_STORE}${appKey}`;
    const prefixLength = prefix.length;
    const subscriptions: { [key: string]: Subscription } = {};
    const publish = (key: string, value: any) => {
        Object.keys(subscriptions).forEach(id => {
            if (!subscriptions[id]) return;
            if (subscriptions[id].key === key) {
                subscriptions[id].callback(value);
            }
        });
    };

    const onLocalStorageChange = (event: StorageEvent): void => {
        if (event.key?.substring(0, prefixLength) !== prefix) {
            return;
        }
        const key = event.key.substring(prefixLength + 1);
        const value = event.newValue ? tryParse(event.newValue) : undefined;
        Object.keys(subscriptions).forEach(id => {
            if (!subscriptions[id]) return;
            if (subscriptions[id].key === key) {
                if (value === null) {
                    subscriptions[id].callback(undefined);
                } else {
                    subscriptions[id].callback(
                        value == null ? undefined : value
                    );
                }
            }
        });
    };

    return {
        setup: () => {
            if (localStorageAvailable) {
                const storedVersion = getStorage().getItem(`${prefix}.version`);
                if (storedVersion && storedVersion !== version) {
                    getStorage().clear();
                }
                getStorage().setItem(`${prefix}.version`, version);
                window.addEventListener('storage', onLocalStorageChange);
            }
        },
        teardown: () => {
            if (localStorageAvailable) {
                window.removeEventListener('storage', onLocalStorageChange);
            }
        },
        getItem<T = any>(key: string, defaultValue?: T): T {
            const valueFromStorage = getStorage().getItem(`${prefix}.${key}`);

            return valueFromStorage == null
                ? defaultValue
                : tryParse(valueFromStorage);
        },
        setItem<T = any>(key: string, value: T): void {
            if (value === undefined) {
                getStorage().removeItem(`${prefix}.${key}`);
            } else {
                getStorage().setItem(`${prefix}.${key}`, JSON.stringify(value));
            }
            publish(key, value);
        },
        removeItem(key: string): void {
            getStorage().removeItem(`${prefix}.${key}`);
            publish(key, undefined);
        },
        reset(): void {
            const storage = getStorage();
            for (let i = 0; i < storage.length; i++) {
                if (storage.key(i)?.substring(0, prefixLength) === prefix) {
                    const key = storage.key(i)?.substring(prefixLength + 1);
                    if (!key || !storage.key(i)) return;
                    // @ts-ignore
                    storage.removeItem(storage.key(i));
                    publish(key, undefined);
                }
            }
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

const tryParse = (value: string): any => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};
class LocalStorageShim {
    valuesMap: any = new Map();

    getItem(key: string) {
        if (this.valuesMap.has(key)) {
            return String(this.valuesMap.get(key));
        }
        return null;
    }

    setItem(key: string, value: string) {
        this.valuesMap.set(key, value);
    }

    removeItem(key: string) {
        this.valuesMap.delete(key);
    }

    clear() {
        this.valuesMap.clear();
    }

    key(i): string {
        if (arguments.length === 0) {
            throw new TypeError(
                "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
            );
        }
        const arr = Array.from(this.valuesMap.keys()) as string[];
        return arr[i];
    }

    get length() {
        return this.valuesMap.size;
    }
}
const memoryStorage = new LocalStorageShim();

export const getStorage = () => {
    return localStorageAvailable ? window.localStorage : memoryStorage;
};
