import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 328,
        serviceId: 1,
        serviceName: 'service1',
        configId: 53,
        name: 'hello',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hello',
        opType: 1,
        config: '',
        version: 2,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-19 15:26:18',
    },
    {
        id: 327,
        serviceId: 1,
        serviceName: 'service1',
        configId: 53,
        name: 'hello',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hello',
        opType: 0,
        config: '',
        version: 1,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-19 15:25:45',
    },
    {
        id: 326,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 34,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 17:01:12',
    },
    {
        id: 325,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 33,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 17:00:15',
    },
    {
        id: 324,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 32,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 16:59:04',
    },
    {
        id: 323,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 31,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 16:58:54',
    },
    {
        id: 322,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 30,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 16:56:44',
    },
    {
        id: 321,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 29,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 16:55:37',
    },
    {
        id: 320,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 28,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 16:55:06',
    },
    {
        id: 319,
        serviceId: 1,
        serviceName: 'service1',
        configId: 1,
        name: '酒店信息',
        description: '',
        developer: '',
        method: 'GET',
        path: '/hotelInfo',
        opType: 1,
        config: '',
        version: 27,
        opUserId: '1371717439132860417',
        opBy: 'admin',
        opTime: '2021-04-16 16:54:38',
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
