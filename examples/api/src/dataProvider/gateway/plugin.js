import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 6,
        app: 'mukun1001',
        appName: 'base',
        secretkey: '',
        useWhiteList: -1,
        authIps: '',
        useAuth: 1,
        authType: 1,
        customConfig: '',
        tags: [],
        tagCondition: '',
    },
    {
        id: 5,
        app: '1313123',
        appName: 'scopa',
        secretkey: '',
        useWhiteList: -1,
        authIps: '',
        useAuth: 1,
        authType: 1,
        customConfig: '31313',
        tags: ['scopa1'],
        tagCondition: '',
    },
    {
        id: 4,
        app: '313123',
        appName: '321',
        secretkey: '',
        useWhiteList: -1,
        authIps: '',
        useAuth: 1,
        authType: 1,
        customConfig: '',
        tags: [],
        tagCondition: '',
    },
    {
        id: 3,
        app: 'test2',
        appName: 'test2',
        secretkey: '',
        useWhiteList: -1,
        authIps: '',
        useAuth: 1,
        authType: 2,
        customConfig: '',
        tags: [],
        tagCondition: '',
    },
    {
        id: 2,
        app: 'test',
        appName: 'test',
        secretkey: '',
        useWhiteList: -1,
        authIps: '',
        useAuth: 1,
        authType: 1,
        customConfig: '',
        tags: [],
        tagCondition: '',
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
