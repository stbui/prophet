import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 1,
        clientId: 1323234,
        type: 'TCP',
        remark: '',
        port: '8080',
        target: '127.0.0.1:8080',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
    },
    {
        id: 2,
        clientId: 234342,
        type: 'http',
        remark: '',
        port: '8081',
        target: '127.0.0.1:8081',
        createdTime: '2017-08-07T00:00:00Z',
        modifiedTime: '2017-08-07T00:00:00Z',
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
