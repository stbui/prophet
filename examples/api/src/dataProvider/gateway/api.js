import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 31,
        gatewayGroup: 'default',
        service: 'API10000',
        method: 'GET',
        path: '/key',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'API10000',
        backendPath: '/key',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 30,
        gatewayGroup: 'default',
        service: 'booking',
        method: 'GET',
        path: '/order',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/2',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 29,
        gatewayGroup: 'default',
        service: 'test1',
        method: 'GET',
        path: '/22',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/2',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 28,
        gatewayGroup: 'test',
        service: 'aa',
        method: 'POST',
        path: '/**',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/{$1}',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 27,
        gatewayGroup: 'test',
        service: 'Srv-heather',
        method: 'POST',
        path: '/**',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'Srv-heather',
        backendPath: '/{$1}',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 26,
        gatewayGroup: 'test',
        service: 'service1',
        method: 'GET',
        path: '/**',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/{$1}',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 25,
        gatewayGroup: 'default',
        service: 'service1',
        method: '',
        path: '/test/path',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/test/path',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 24,
        gatewayGroup: 'default',
        service: '1111111111',
        method: 'POST',
        path: '/**',
        appEnabled: true,
        apps: [],
        pluginNames: 'sign',
        access: 'f',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/{$1}',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 23,
        gatewayGroup: 'default',
        service: 'zlo2',
        method: 'GET',
        path: '/test',
        appEnabled: false,
        apps: [],
        pluginNames: '',
        access: 'a',
        proxyMode: 3,
        backendService: '',
        backendPath: '/xzqh/query',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
        pluginId_in: [],
        method_in: [],
        proxyMode_in: [],
    },
    {
        id: 22,
        gatewayGroup: 'test',
        service: '11',
        method: 'POST',
        path: '/**',
        appEnabled: false,
        apps: [],
        pluginNames: 'sign,大大1,Basic Auth校验',
        access: 'a',
        proxyMode: 1,
        backendService: 'service1',
        backendPath: '/{$1}',
        apiPlugins: [],
        apiBackends: [],
        callbackType: '',
        callbackReceivers: [],
        callbackRespHeaders: [],
        callbackRespBody: '',
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
            url = `/gateway`;

            return httpClient(url, {
                method: 'POST',

                body: params.data,
            }).then(({ json }) => ({ data: json }));

        case UPDATE:
            url = `/gateway/${params.id}`;

            return httpClient(url, {
                method: 'PUT',
                body: { ...params.data, id: params.id },
            }).then(({ json }) => ({ data: json }));

        default:
            throw new Error(`不支持action类型 ${type}`);
    }
};
