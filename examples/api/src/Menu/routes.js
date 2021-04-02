export const routes = [
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
