// import jsonServerProvider from '@stbui/prophet-data-json-server';
// const dataProvider = jsonServerProvider('http://localhost:996');

// export default dataProvider;

import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from '@stbui/prophet';

const list = {
    data: Array.from(Array(200).keys()).map(id => {
        return {
            id: id + 1,
            name: '电脑',
            categories: '未分类',
            price: Math.floor(Math.random() * 100),
            store_count: Math.floor(Math.random() * 1000 + 100),
            is_on_sale: 1,
            create_time: new Date().toLocaleDateString(),
        };
    }),
    total: 200,
};

const dataProvider = (apiUrl = './api', httpClient = fetchUtils.fetchJson) => {
    return (type, resource, params) => {
        switch (type) {
            case GET_LIST:
                return Promise.resolve(list);
            case GET_ONE:
                return Promise.resolve({
                    data: {
                        id: 1,
                        name: '电脑',
                        categories: '未分类',
                        price: Math.floor(Math.random() * 100),
                        store_count: Math.floor(Math.random() * 1000 + 100),
                        is_on_sale: 1,
                        create_time: new Date().toLocaleDateString(),
                    },
                });
            case CREATE:
                return Promise.resolve({ data: { ...params.data, id: 99 } });
            case UPDATE:
                return Promise.resolve(list);
            case DELETE:
                return Promise.resolve(list);
            default:
                throw new Error(`不支持action类型 ${type}`);
        }
    };
};

export default dataProvider('http://localhost:996');
