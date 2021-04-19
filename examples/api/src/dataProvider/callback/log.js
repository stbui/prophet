import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 82,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-19 16:43:54',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 81,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-19 15:51:16',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 80,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 2,
        receivers:
            '[{"path":"/hello/hello","service":"fizz-gateway","type":2}]',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-18 22:01:08',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 79,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-18 21:40:01',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 78,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-17 02:40:40',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 77,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-16 13:42:58',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 76,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-16 11:43:19',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 75,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-14 16:56:11',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 74,
        callbackRequestId: 13,
        recvTime: '2021-02-27 13:36:24',
        origin: '58.251.121.186',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-14 16:38:39',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
    },
    {
        id: 73,
        callbackRequestId: 17,
        recvTime: '2021-03-29 09:53:57',
        origin: '101.84.174.17',
        method: 'GET',
        service: 'callback1',
        path: '/hello22',
        query: '',
        headers: {},
        body: '',
        mode: 1,
        receivers: '{"fizz-gateway":{"ip":"172.19.135.110","port":8600}}',
        createBy: 'admin',
        result: 1,
        errMsg: '',
        createTime: '2021-04-14 11:19:23',
        createTimeStart: '',
        createTimeEnd: '',
        recvTimeStart: '',
        recvTimeEnd: '',
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
