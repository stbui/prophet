import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';

export default params => {
    const {
        defaultData = {},
        localStorageKey = 'prophet-data-local-storage',
        localStorageUpdateDelay = 10,
    } = params || {};
    const localStorageData = localStorage.getItem(localStorageKey);
    const data = localStorageData ? JSON.parse(localStorageData) : defaultData;

    const updateLocalStorage = callback => {
        setTimeout(() => {
            callback();
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        }, localStorageUpdateDelay);
    };

    return (type: string, resource: string, params: any): Promise<any> => {
        switch (type) {
            case GET_LIST:
                return Promise.resolve(data);

            case GET_ONE:
                return Promise.resolve(data);

            case CREATE:
                updateLocalStorage(() => {
                    if (!data.hasOwnProperty(resource)) {
                        data[resource] = [];
                    }
                    data[resource].push(params);
                });

                return Promise.resolve(data);

            case UPDATE:
                updateLocalStorage(() => {
                    const index = data[resource].findIndex(
                        record => record.id == params.id
                    );
                    data[resource][index] = {
                        ...data[resource][index],
                        ...params.data,
                    };
                });
                return Promise.resolve(data);

            case DELETE:
                updateLocalStorage(() => {
                    const index = data[resource].findIndex(
                        record => record.id == params.id
                    );
                });
                return Promise.resolve(data);

            default:
                throw new Error(`不支持action类型 ${type}`);
        }
    };
};
