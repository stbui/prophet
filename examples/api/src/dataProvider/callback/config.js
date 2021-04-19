import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 10,
        gatewayGroup: 'default',
        service: 'callback1',
        method: 'GET',
        path: '/hello22',
        appEnabled: false,
        apps: [],
        pluginNames: 'sign',
        access: 'a',
        proxyMode: 4,
        backendService: '',
        backendPath: '',
        apiPlugins: [],
        apiBackends: [],
        callbackType: 'a',
        callbackReceivers: [
            { service: 'fizz-gateway', type: 2, path: '/hello/hello' },
        ],
        callbackRespHeaders: [
            { key: 'Content-Type', value: 'application/json' },
        ],
        callbackRespBody: '{"hello":"world"}',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
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
