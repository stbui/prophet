import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 21330,
        ip: '47.103.46.194',
        gatewayGroup: 'default',
        service: 'test1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/22',
        recentReqTime: '2021-04-19 18:27:02',
        reqCount: 4781,
        createTime: '2021-04-16 10:47:03',
        updateTime: '2021-04-19 18:27:02',
    },
    {
        id: 1561,
        ip: '47.92.133.137',
        gatewayGroup: 'default',
        service: 'service1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/getCity',
        recentReqTime: '2021-04-19 18:26:59',
        reqCount: 5972,
        createTime: '2021-04-15 14:55:48',
        updateTime: '2021-04-19 18:26:58',
    },
    {
        id: 21331,
        ip: '39.99.233.38',
        gatewayGroup: 'default',
        service: 'test1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/22',
        recentReqTime: '2021-04-19 18:26:59',
        reqCount: 4781,
        createTime: '2021-04-16 10:47:03',
        updateTime: '2021-04-19 18:26:58',
    },
    {
        id: 5651,
        ip: '47.92.7.83',
        gatewayGroup: 'default',
        service: 'test',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/http',
        recentReqTime: '2021-04-19 18:26:54',
        reqCount: 5525,
        createTime: '2021-04-15 22:23:12',
        updateTime: '2021-04-19 18:26:54',
    },
    {
        id: 5654,
        ip: '47.92.7.83',
        gatewayGroup: 'default',
        service: 'service1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/getCity',
        recentReqTime: '2021-04-19 18:26:54',
        reqCount: 5525,
        createTime: '2021-04-15 22:23:12',
        updateTime: '2021-04-19 18:27:02',
    },
    {
        id: 2012,
        ip: '119.23.204.15',
        gatewayGroup: 'default',
        service: 'service1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/baidu',
        recentReqTime: '2021-04-19 18:26:52',
        reqCount: 5827,
        createTime: '2021-04-15 17:20:44',
        updateTime: '2021-04-19 18:26:51',
    },
    {
        id: 21372,
        ip: '47.103.44.164',
        gatewayGroup: 'default',
        service: 'booking',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/order',
        recentReqTime: '2021-04-19 18:26:49',
        reqCount: 4779,
        createTime: '2021-04-16 10:48:43',
        updateTime: '2021-04-19 18:26:49',
    },
    {
        id: 5717,
        ip: '47.103.44.164',
        gatewayGroup: 'default',
        service: 'zlo2',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/test',
        recentReqTime: '2021-04-19 18:26:38',
        reqCount: 5521,
        createTime: '2021-04-15 22:25:31',
        updateTime: '2021-04-19 18:26:49',
    },
    {
        id: 1997,
        ip: '47.106.201.78',
        gatewayGroup: 'default',
        service: 'service1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/city',
        recentReqTime: '2021-04-19 18:26:33',
        reqCount: 5827,
        createTime: '2021-04-15 17:19:20',
        updateTime: '2021-04-19 18:26:54',
    },
    {
        id: 2005,
        ip: '47.106.201.78',
        gatewayGroup: 'default',
        service: 'service1',
        appid: '',
        apiMethod: 'GET',
        apiPath: '/getCity',
        recentReqTime: '2021-04-19 18:26:33',
        reqCount: 5827,
        createTime: '2021-04-15 17:20:02',
        updateTime: '2021-04-19 18:26:51',
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
