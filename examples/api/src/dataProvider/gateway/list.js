import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 1,
        serviceId: 1,
        serviceName: 'metadata',
        serviceDesc: 'metadata',
        apiId: '1',
        apiDesc: '',
        apiName: 'metadata',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
        requestConfig: {
            path: '/kanban/myapp',
            method: 'GET',
        },
        requestParameters: [
            {
                name: 'usename',
                in: 'QUERY',
                type: 'String',
                defaultValue: '',
                required: 'True',
                desc: '用户名称',
            },
        ],
        serviceType: 'HTTP',
        serviceTimeout: 60,
        serviceConfig: {
            url: 'api.stbui.com',
            path: '/v1/app/getMyApprovedApp',
            method: 'GET',
        },
        serviceParameters: [
            {
                name: 'proposer',
                in: 'QUERY',
                relevantRequestParameterName: 'usename',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '',
                desc: '用户名称',
            },
            {
                name: 'currentPage',
                in: 'QUERY',
                relevantRequestParameterName: 'page',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '1',
                desc: '',
            },
            {
                name: 'pageSize',
                in: 'QUERY',
                relevantRequestParameterName: 'perPage',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '10',
                desc: '',
            },
        ],
        constantParameters: [
            {
                name: 'name',
                desc: 'desc',
                position: 'position',
                defaultValue: 'defaultValue',
            },
        ],
        responseType: 'JSON',
    },
    {
        id: 2,
        serviceId: 2,
        serviceName: 'alarm',
        serviceDesc: 'alarm',
        apiId: '2',
        apiDesc: '',
        apiName: 'alarm',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
        requestConfig: {
            path: '/warn/config',
            method: 'POST',
        },
        requestParameters: [
            {
                name: 'usename',
                in: 'QUERY',
                type: 'String',
                defaultValue: '',
                required: 'True',
                desc: '用户名称',
            },
        ],
        serviceType: 'HTTP',
        serviceTimeout: 60,
        serviceConfig: {
            url: 'api.stbui.com',
            path: '/kpi/rule/queryKpiRuleByParam',
            method: 'POST',
        },
        serviceParameters: [
            {
                name: 'user',
                in: 'QUERY',
                relevantRequestParameterName: 'usename',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '',
                desc: '用户名称',
            },
            {
                name: 'pageNation.currentPage',
                in: 'QUERY',
                relevantRequestParameterName: 'page',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '1',
                desc: '',
            },
            {
                name: 'pageNation.pageSize',
                in: 'QUERY',
                relevantRequestParameterName: 'perPage',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '10',
                desc: '',
            },
        ],
        constantParameters: [
            {
                name: 'name',
                desc: 'desc',
                position: 'position',
                defaultValue: 'defaultValue',
            },
        ],
        responseType: 'JSON',
    },
    {
        id: 3,
        serviceId: 3,
        serviceName: 'jonsnow',
        serviceDesc: 'jonsnow',
        apiId: '3',
        apiDesc: '',
        apiName: 'jonsnow',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
        requestConfig: {
            path: '/getRoles',
            method: 'GET',
        },
        requestParameters: [
            {
                name: 'username',
                in: 'QUERY',
                type: 'String',
                defaultValue: '',
                required: 'True',
                desc: '用户名称',
            },
        ],
        serviceType: 'HTTP',
        serviceTimeout: 60,
        serviceConfig: {
            url: 'api.stbui.com',
            path: '/v1/api/getRoles',
            method: 'GET',
        },
        serviceParameters: [
            {
                name: 'loginName',
                in: 'QUERY',
                relevantRequestParameterName: 'username',
                relevantRequestParameterIn: 'QUERY',
                defaultValue: '',
                desc: '',
            },
        ],
        constantParameters: [
            {
                name: 'name',
                desc: 'desc',
                position: 'position',
                defaultValue: 'defaultValue',
            },
        ],
        responseType: 'JSON',
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

            url = `/gateway?${stringify(query)}`;

            // return httpClient(url).then(({ json }) => ({
            //     data: json.result,
            //     total: json.result.length,
            // }));

            return Promise.resolve({ data: api, total: 3 });

        case GET_ONE:
            url = `/gateway/${params.id}`;

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
