import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
import { stringify } from 'query-string';

const api = [
    {
        id: 9676643,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 400,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.092 [fizz-el-nio-3] INFO we.filter.FizzLogFilter - 801fa1e1-122126 GET http://127.0.0.1:8600/proxy/zlo2/test\nresponse 200 OK in 27\n',
    },
    {
        id: 9676642,
        bizId: '',
        serverIp: '172.19.135.110',
        level: 400,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.091 [wc-proxy-el-nio-2] INFO reactor.Mono.PeekTerminal.106932 - | onComplete()\n',
    },
    {
        id: 9676641,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 500,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.091 [wc-proxy-el-nio-2] DEBUG we.filter.RouteFilter - 801fa1e1-122126 response 200 OK\n',
    },
    {
        id: 9676640,
        bizId: '',
        serverIp: '172.19.135.110',
        level: 400,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.090 [wc-proxy-el-nio-2] INFO reactor.Mono.PeekTerminal.106932 - | onNext(org.springframework.web.reactive.function.client.DefaultClientResponse@6fe6602f)\n',
    },
    {
        id: 9676639,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 400,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.066 [fizz-el-nio-3] INFO reactor.Mono.PeekTerminal.106932 - | request(unbounded)\n',
    },
    {
        id: 9676638,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 400,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.066 [fizz-el-nio-3] INFO reactor.Mono.PeekTerminal.106932 - | onSubscribe([Fuseable] MonoPeekTerminal.MonoTerminalPeekSubscriber)\n',
    },
    {
        id: 9676637,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 500,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.065 [fizz-el-nio-3] DEBUG we.proxy.FizzWebClient - 801fa1e1-122126 GET http://apis.juhe.cn/xzqh/query\n',
    },
    {
        id: 9676636,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 500,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.065 [fizz-el-nio-3] DEBUG we.plugin.auth.AuthPluginFilter - req auth: {"id":23,"isDeleted":0,"gatewayGroups":["default"],"service":"zlo2","method":"GET","path":"/test","exactMatch":true,"backendPath":"/xzqh/query","httpHostPorts":["http://apis.juhe.cn"],"access":"a","checkApp":false,"proxyMode":3}\n',
    },
    {
        id: 9676635,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 500,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.065 [fizz-el-nio-3] DEBUG we.plugin.auth.ServiceConfig - default GET /test [{"id":23,"isDeleted":0,"gatewayGroups":["default"],"service":"zlo2","method":"GET","path":"/test","exactMatch":true,"backendPath":"/xzqh/query","httpHostPorts":["http://apis.juhe.cn"],"access":"a","checkApp":false,"proxyMode":3}]\n',
    },
    {
        id: 9676634,
        bizId: '801fa1e1-122126',
        serverIp: '172.19.135.110',
        level: 500,
        logTime: '2021-04-19 18:28:25',
        content:
            '2021-04-19 18:28:25.065 [fizz-el-nio-3] DEBUG we.plugin.PluginFilter - we.plugin.auth.AuthPluginFilter@13518f37: statPlugin execute success\n',
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
