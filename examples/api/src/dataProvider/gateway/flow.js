import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    { id: 9, service: '11', qps: 1000, concurrent: 120 },
    { id: 8, service: 'baidu', qps: 11, concurrent: 11 },
    { id: 7, service: 'zlo', qps: 100, concurrent: null },
    { id: 6, service: 'front', qps: 100, concurrent: 80 },
    { id: 5, service: '1111', qps: 111, concurrent: 222 },
    { id: 4, service: 'test', qps: 100, concurrent: 100 },
    { id: 3, service: 'gw', qps: 55555, concurrent: 555555 },
];

export default (apiUrl, httpClient, type, resource, params) => {
    let url = '';

    switch (type) {
        case GET_LIST:
            const { pagination, sort, filter, ...other } = params;
            const { page, perPage } = pagination;
            const query = {
                pageNum: page,
                pageSize: perPage,
                ...filter,
            };

            url = `${resource}?${stringify(query)}`;

            // return httpClient(url).then(({ json }) => ({
            //     data: json.result,
            //     total: json.result.length,
            // }));

            return Promise.resolve({ data: api, total: 1 });

        case GET_ONE:
            url = `${resource}/${params.id}`;

            return httpClient(url).then(({ json }) => ({ data: json.result }));

        case CREATE:
            url = `${resource}`;

            return httpClient(url, {
                method: 'POST',

                body: params.data,
            }).then(({ json }) => ({ data: json }));

        case UPDATE:
            url = `${resource}/${params.id}`;

            return httpClient(url, {
                method: 'PUT',
                body: { ...params.data, id: params.id },
            }).then(({ json }) => ({ data: json }));

        default:
            throw new Error(`不支持action类型 ${type}`);
    }
};
