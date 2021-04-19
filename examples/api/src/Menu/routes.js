export const routes = [
    {
        id: 'gateway',
        name: '网关管理',
        icon: 'alert',
        children: [
            {
                id: 'api',
                name: '路由管理',
                icon: 'alert',
                path: '/gateway/api',
            },
            {
                id: 'group',
                name: '网管分组',
                icon: 'alert',
                path: '/gateway/group',
            },
            {
                id: 'plugin',
                name: '插件管理',
                icon: 'alert',
                path: '/gateway/plugin',
            },
            {
                id: 'appid',
                name: 'AppId管理',
                icon: 'alert',
                path: '/gateway/appid',
            },
            {
                id: 'ip',
                name: '接口统计',
                icon: 'alert',
                path: '/gateway/ip',
            },
            {
                id: 'flow',
                name: '流量控制',
                icon: 'alert',
                path: '/gateway/flow',
            },
            {
                id: 'log',
                name: '网关日志',
                icon: 'alert',
                path: '/gateway/log',
            },
        ],
    },
    {
        id: 'callback',
        name: '回调管理',
        icon: 'alert',
        children: [
            {
                id: 'config',
                name: '回调配置',
                icon: 'alert',
                path: '/callback/config',
            },
            {
                id: 'playback',
                name: ' 回调回放',
                icon: 'alert',
                path: '/callback/playback',
            },
            {
                id: 'log',
                name: ' 回调日志',
                icon: 'alert',
                path: '/callback/log',
            },
        ],
    },
    {
        id: 'aggregate',
        name: '服务编排',
        icon: 'alert',
        children: [
            {
                id: 'api',
                name: '接口列表',
                icon: 'alert',
                path: '/aggregate/api',
            },
            {
                id: 'service',
                name: '服务管理',
                icon: 'alert',
                path: '/aggregate/service',
            },
            {
                id: 'log',
                name: '操作日志',
                icon: 'alert',
                path: '/aggregate/log',
            },
            {
                id: 'cache',
                name: '网关缓存',
                icon: 'alert',
                path: '/aggregate/cache',
            },
        ],
    },
    {
        id: 'approval',
        name: '编排审核',
        icon: 'alert',
        children: [
            {
                id: 'apply',
                name: '我的申请',
                icon: 'alert',
                path: '/approval/apply',
            },
            {
                id: 'audit',
                name: '待审核',
                icon: 'alert',
                path: '/approval/audit',
            },
            {
                id: 'log',
                name: '日志日志',
                icon: 'alert',
                path: '/approval/log',
            },
        ],
    },
    {
        id: 'client',
        name: '客户端',
        icon: 'alert',
        path: '/client',
    },
    {
        id: 'tunnel',
        name: '隧道管理',
        icon: 'alert',
        path: '/tunnel',
    },
    {
        id: 'dns',
        name: '域名解析',
        icon: 'dns',
        path: '/dns',
    },
    {
        id: 'proxy',
        name: '代理',
        icon: 'alert',
        path: '/proxy/list',
    },
    {
        id: 'server',
        name: '节点',
        icon: 'alert',
        path: '/server',
    },
    {
        id: 'ser',
        name: '增值服务',
        icon: 'alert',
        children: [
            {
                id: 'buy',
                name: '购买服务',
                icon: 'alert',
                path: '/buy',
            },
            {
                id: 'coupon',
                name: '优惠券',
                icon: 'alert',
                path: '/coupon',
            },
            {
                id: 'order',
                name: '订单列表',
                icon: 'alert',
                path: '/order',
            },
        ],
    },
    {
        id: 'user',
        name: '用户管理',
        icon: 'alert',
        children: [
            {
                id: 'profile',
                name: '个人设置',
                icon: 'alert',
                path: '/profile',
            },
            {
                id: 'q',
                name: ' 每日签到',
                icon: 'alert',
                path: '/q',
            },
        ],
    },
];
