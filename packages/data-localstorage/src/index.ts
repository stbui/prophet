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
            default:
                throw new Error(`不支持action类型 ${type}`);
        }
    };
};
