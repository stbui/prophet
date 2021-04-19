import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 1,
        createUser: '1123598821738675201',
        createDept: '1260823335286165505',
        createTime: '2020-12-05 11:51:55',
        updateUser: '1123598821738675201',
        updateTime: '2020-12-05 11:51:55',
        status: 1,
        isDeleted: 0,
        groupId: 'default',
        groupName: '默认分组',
        instanceIps: '',
    },
    {
        id: 2,
        createUser: '1123598821738675201',
        createDept: '1260823335286165505',
        createTime: '2020-12-07 10:59:06',
        updateUser: '1123598821738675201',
        updateTime: '2021-03-03 15:59:55',
        status: 1,
        isDeleted: 0,
        groupId: 'test',
        groupName: '测试分组',
        instanceIps: '127.0.0.1，127.0.0.1',
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
