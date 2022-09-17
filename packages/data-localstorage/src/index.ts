import { DataProvider } from '@stbui/prophet-core';
import pullAt from 'lodash/pullAt';

export default (params, fakeRestProvider) => {
    const {
        defaultData = {},
        localStorageKey = 'prophet-data-local-storage',
        localStorageUpdateDelay = 10,
        loggingEnabled = false,
    } = params || {};
    const localStorageData = localStorage.getItem(localStorageKey);
    const data = localStorageData ? JSON.parse(localStorageData) : defaultData;

    const updateLocalStorage = callback => {
        setTimeout(() => {
            callback();
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        }, localStorageUpdateDelay);
    };

    const baseDataProvider = fakeRestProvider(
        data,
        loggingEnabled
    ) as DataProvider;

    return {
        getList: (resource, params) =>
            baseDataProvider.getList(resource, params).catch(error => {
                if (error.code === 1) {
                    return { data: [], total: 0 };
                } else {
                    throw error;
                }
            }),
        getOne: (resource, params) => baseDataProvider.getOne(resource, params),
        update: (resource, params) => {
            updateLocalStorage(() => {
                const index = data[resource].findIndex(
                    record => record.id == params.id
                );
                data[resource][index] = {
                    ...data[resource][index],
                    ...params.data,
                };
            });
            return baseDataProvider.update(resource, params);
        },
        create: (resource, params) =>
            baseDataProvider.create(resource, params).then(response => {
                updateLocalStorage(() => {
                    if (!data.hasOwnProperty(resource)) {
                        data[resource] = [];
                    }
                    data[resource].push(response.data);
                });
                return response;
            }),
        delete: (resource, params) => {
            updateLocalStorage(() => {
                const index = data[resource].findIndex(
                    record => record.id == params.id
                );
                pullAt(data[resource], [index]);
            });

            return baseDataProvider.delete(resource, params);
        },
    };
};
