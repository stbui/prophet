import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 1,
        env: 'dev',
        path: '/api/metadata',
        serviceName: 'metadata',
        serviceDesc: 'metadata',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
        url: 'api.stbui.com',
    },
    {
        id: 2,

        env: 'dev',
        path: '/api/jsonnow',
        serviceName: 'metadata',
        serviceDesc: 'metadata',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
        url: 'api.stbui.com',
    },
    {
        id: 3,
        env: 'dev',
        serviceName: 'metadata',
        serviceDesc: 'metadata',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
        url: 'api.stbui.com',
    },
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

            url = `/${resource}?${stringify(query)}`;

            // return httpClient(url).then(({ json }) => ({
            //     data: json.result,
            //     total: json.result.length,
            // }));

            return Promise.resolve({ data: api, total: 3 });

        case GET_ONE:
            url = `/${resource}/${params.id}`;

            return httpClient(url).then(({ json }) => ({ data: json.result }));

        case CREATE:
            url = `/${resource}`;

            // return httpClient(url, {
            //     method: 'POST',

            //     body: params.data,
            // }).then(({ json }) => ({ data: json }));

            return Promise.resolve({ data: params.data });

        case UPDATE:
            url = `/${resource}/${params.id}`;

            return httpClient(url, {
                method: 'PUT',
                body: { ...params.data, id: params.id },
            }).then(({ json }) => ({ data: json }));

        default:
            throw new Error(`不支持action类型 ${type}`);
    }
};
