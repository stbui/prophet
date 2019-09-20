// import jsonServerProvider from '@stbui/prophet-data-json-server';
// const dataProvider = jsonServerProvider('http://localhost:996');

// export default dataProvider;

import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet';

const list = {
    data: [
        {
            id: 1,
            username: '1',
            nickName: '2',
            address_id: '3',
            phone: '4',
            create_time: '5',
            status: '6',
            goods_name: 'test',
        },
        {
            id: 2,
            username: '1',
            nickName: '2',
            address_id: '3',
            phone: '4',
            create_time: '5',
            status: '6',
            goods_name: 'test',
        },
    ],
    total: 2,
};

const dataProvider = (apiUrl = './api', httpClient = fetch) => {
    return (type, resource, params) => {
        switch (type) {
            case GET_LIST:
                return Promise.resolve(list);
            case GET_ONE:
                return Promise.resolve({
                    data: {
                        id: 1,
                        username: '1',
                        nickName: '2',
                        address_id: '3',
                        phone: '4',
                        create_time: '5',
                        status: '6',
                        goods_name: 'test',
                    },
                });
            case CREATE:
                return Promise.resolve({ data: { ...params.data, id: 99 } });
            case UPDATE:
                return Promise.resolve(list);
            case DELETE:
                return Promise.resolve(list);
            default:
                throw new Error(`不支持action类型 ${type}`);
        }
    };
};

export default dataProvider('http://localhost:996');
