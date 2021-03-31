// import jsonServerProvider from '@stbui/prophet-data-json-server';
// const dataProvider = jsonServerProvider('http://localhost:996');

// export default dataProvider;

import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet';
import { fetchUtils } from '@stbui/prophet-core';

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

export default (apiUrl, httpClient, type, resource, params) => {
    let url = '';

    const optimistic = {
        GET_LIST() {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;

            const query = {
                ...fetchUtils.flattenObject(params.filter),
                page_no: page,
                page_size: perPage,
            };
            url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

            // return httpClient(url).then(({ data }) => {
            //     return { data: data.data, total: data.total };
            // });
            return Promise.resolve(list);
        },

        CREATE() {
            return Promise.resolve({ data: { ...params.data, id: 99 } });
        },

        UPDATE() {
            return Promise.resolve(list);
        },

        DELETE() {
            return Promise.resolve(list);
        },
    };

    return optimistic[type](resource, params);
};
