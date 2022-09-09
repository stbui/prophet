export const routes = [
    {
        key: 'gateway',
        label: '网关管理',
        icon: 'alert',
        children: [
            {
                key: 'api',
                label: '路由管理',
                icon: 'alert',
                path: '/gateway/api',
            },
            {
                key: 'group',
                label: '网管分组',
                icon: 'alert',
                path: '/gateway/group',
            },
            {
                key: 'plugin',
                label: '插件管理',
                icon: 'alert',
                path: '/gateway/plugin',
            },
            {
                key: 'appid',
                label: 'AppId管理',
                icon: 'alert',
                path: '/gateway/appid',
            },
            {
                key: 'ip',
                label: '接口统计',
                icon: 'alert',
                path: '/gateway/ip',
            },
            {
                key: 'flow',
                label: '流量控制',
                icon: 'alert',
                path: '/gateway/flow',
            },
            {
                key: 'log',
                label: '网关日志',
                icon: 'alert',
                path: '/gateway/log',
            },
        ],
    },
    {
        key: 'callback',
        label: '回调管理',
        icon: 'alert',
        children: [
            {
                key: 'config',
                label: '回调配置',
                icon: 'alert',
                path: '/callback/config',
            },
            {
                key: 'playback',
                label: ' 回调回放',
                icon: 'alert',
                path: '/callback/playback',
            },
            {
                key: 'log',
                label: ' 回调日志',
                icon: 'alert',
                path: '/callback/log',
            },
        ],
    },
    {
        key: 'aggregate',
        label: '服务编排',
        icon: 'alert',
        children: [
            {
                key: 'api',
                label: '接口列表',
                icon: 'alert',
                path: '/aggregate/api',
            },
            {
                key: 'service',
                label: '服务管理',
                icon: 'alert',
                path: '/aggregate/service',
            },
            {
                key: 'log',
                label: '操作日志',
                icon: 'alert',
                path: '/aggregate/log',
            },
            {
                key: 'cache',
                label: '网关缓存',
                icon: 'alert',
                path: '/aggregate/cache',
            },
        ],
    },
    {
        key: 'approval',
        label: '编排审核',
        icon: 'alert',
        children: [
            {
                key: 'apply',
                label: '我的申请',
                icon: 'alert',
                path: '/approval/apply',
            },
            {
                key: 'audit',
                label: '待审核',
                icon: 'alert',
                path: '/approval/audit',
            },
            {
                key: 'log',
                label: '日志日志',
                icon: 'alert',
                path: '/approval/log',
            },
        ],
    },
    {
        key: 'client',
        label: '客户端',
        icon: 'alert',
        path: '/client',
    },
    {
        key: 'tunnel',
        label: '隧道管理',
        icon: 'alert',
        path: '/tunnel',
    },
    {
        key: 'dns',
        label: '域名解析',
        icon: 'dns',
        path: '/dns',
    },
    {
        key: 'proxy',
        label: '代理',
        icon: 'alert',
        path: '/proxy/list',
    },
    {
        key: 'server',
        label: '节点',
        icon: 'alert',
        path: '/server',
    },
    {
        key: 'ser',
        label: '增值服务',
        icon: 'alert',
        children: [
            {
                key: 'buy',
                label: '购买服务',
                icon: 'alert',
                path: '/buy',
            },
            {
                key: 'coupon',
                label: '优惠券',
                icon: 'alert',
                path: '/coupon',
            },
            {
                key: 'order',
                label: '订单列表',
                icon: 'alert',
                path: '/order',
            },
        ],
    },
    {
        key: 'user',
        label: '用户管理',
        icon: 'alert',
        children: [
            {
                key: 'profile',
                label: '个人设置',
                icon: 'alert',
                path: '/profile',
            },
            {
                key: 'q',
                label: ' 每日签到',
                icon: 'alert',
                path: '/q',
            },
        ],
    },
];
