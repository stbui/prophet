import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 29,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-04-16 11:57:31',
        updateUser: '1371717439132860417',
        updateTime: '2021-04-16 11:57:31',
        status: 1,
        isDeleted: 0,
        name: 'API10000',
        title: '服务1',
        description: '',
        team: '团队1',
        personInCharge: '负责人1',
    },
    {
        id: 27,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-04-14 16:20:06',
        updateUser: '1371717439132860417',
        updateTime: '2021-04-14 16:20:06',
        status: 1,
        isDeleted: 0,
        name: '12',
        title: '1212',
        description: '1212',
        team: '121',
        personInCharge: '12',
    },
    {
        id: 26,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-04-13 14:28:54',
        updateUser: '1371717439132860417',
        updateTime: '2021-04-13 14:28:54',
        status: 1,
        isDeleted: 0,
        name: 'test000',
        title: 'test000',
        description: 'test dev',
        team: 'dev',
        personInCharge: 'dev',
    },
    {
        id: 25,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-04-13 11:47:04',
        updateUser: '1371717439132860417',
        updateTime: '2021-04-13 11:47:04',
        status: 1,
        isDeleted: 0,
        name: 'evaluate',
        title: 'evaluate-service',
        description: '111',
        team: 'pushi',
        personInCharge: 'lin',
    },
    {
        id: 23,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-04-06 17:31:41',
        updateUser: '1371717439132860417',
        updateTime: '2021-04-06 17:31:41',
        status: 1,
        isDeleted: 0,
        name: '9999',
        title: '服务测试9999',
        description: '',
        team: '9999团队',
        personInCharge: '9999负责人',
    },
    {
        id: 22,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-03-31 11:45:38',
        updateUser: '1371717439132860417',
        updateTime: '2021-03-31 11:45:38',
        status: 1,
        isDeleted: 0,
        name: 'openApi',
        title: 'openAPi',
        description: '',
        team: '接口',
        personInCharge: '李国瑞',
    },
    {
        id: 21,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-03-22 19:53:49',
        updateUser: '1371717439132860417',
        updateTime: '2021-03-22 19:53:49',
        status: 1,
        isDeleted: 0,
        name: '1111111111',
        title: '111111111',
        description: '1111111',
        team: '11111',
        personInCharge: '1111',
    },
    {
        id: 20,
        createUser: '1371717439132860417',
        createDept: '1260823335286165505',
        createTime: '2021-03-22 19:53:01',
        updateUser: '1371717439132860417',
        updateTime: '2021-03-22 19:53:01',
        status: 1,
        isDeleted: 0,
        name: '23',
        title: '2323',
        description: '2323',
        team: '232',
        personInCharge: '2323',
    },
    {
        id: 19,
        createUser: '1123598821738675201',
        createDept: '1260823335286165505',
        createTime: '2021-03-11 16:56:16',
        updateUser: '1371717439132860417',
        updateTime: '2021-03-18 21:33:46',
        status: 1,
        isDeleted: 0,
        name: 'Srv-heather',
        title: 'HeatherService',
        description: '',
        team: 'Wolf',
        personInCharge: 'Savage',
    },
    {
        id: 18,
        createUser: '1123598821738675201',
        createDept: '1260823335286165505',
        createTime: '2021-03-08 15:33:17',
        updateUser: '1123598821738675201',
        updateTime: '2021-03-10 18:41:07',
        status: 1,
        isDeleted: 0,
        name: 'id',
        title: 'serivcename',
        description: '',
        team: 'team',
        personInCharge: 'me',
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
