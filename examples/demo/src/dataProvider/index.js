// import jsonServerProvider from '@stbui/prophet-data-json-server';
// const dataProvider = jsonServerProvider('http://localhost:996');

// export default dataProvider;

import { fetchJson } from '@stbui/prophet';

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

const dataProvider = (apiUrl = './api', httpClient = fetchJson) => ({
    getList: () => Promise.resolve(list),
    getOne: () =>
        Promise.resolve({
            data: {
                id: 1,
                name: '电脑',
                categories: '未分类',
                price: Math.floor(Math.random() * 100),
                store_count: Math.floor(Math.random() * 1000 + 100),
                is_on_sale: 1,
                create_time: new Date().toLocaleDateString(),
            },
        }),
    create: (resource, params) =>
        Promise.resolve({ data: { ...params.data, id: 99 } }),
    update: () => Promise.resolve(list),
    delete: () => Promise.resolve(list),
});

export default dataProvider('http://localhost:996');
