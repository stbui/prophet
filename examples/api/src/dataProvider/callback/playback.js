import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 17,
        reqId: '5fda0b9e-24189',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-03-29 09:53:57',
        gatewayGroup: '',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 16,
        reqId: 'aa98c1e8-9701',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-03-02 17:15:48',
        gatewayGroup: '',
        origin: '101.91.62.11',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 15,
        reqId: '712e5aff-3273',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-28 12:13:34',
        gatewayGroup: '',
        origin: '59.36.119.227',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 14,
        reqId: '1bca7830-3253',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-27 19:08:17',
        gatewayGroup: '',
        origin: '58.251.121.184',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 13,
        reqId: 'f746756f-3192',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-27 13:36:24',
        gatewayGroup: '',
        origin: '58.251.121.186',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 12,
        reqId: '3fee3f92-3010',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-26 13:17:20',
        gatewayGroup: '',
        origin: '58.251.121.185',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 11,
        reqId: 'c7a87719-2876',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-26 10:20:42',
        gatewayGroup: '',
        origin: '39.170.42.227',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 10,
        reqId: 'ce9a4842-2875',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-26 10:20:28',
        gatewayGroup: '',
        origin: '39.170.42.227',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 9,
        reqId: 'f6e366c2-71',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-25 15:52:54',
        gatewayGroup: '',
        origin: '59.41.200.98',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
    },
    {
        id: 8,
        reqId: '45b8d011-70',
        callbackConfigId: 1,
        app: '',
        recvTime: '2021-02-25 15:52:53',
        gatewayGroup: '',
        origin: '59.41.200.98',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        targets: '',
        startTime: '',
        endTime: '',
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
