export const routes = [
    {
        id: 'goods',
        name: '商品管理',
        icon: 'alert',
        children: [
            {
                id: 'list',
                name: '商品列表',
                path: '/store',
            },
            {
                id: 'category',
                name: '商品分类',
                path: '/goods/category',
            },
            {
                id: 'comment',
                name: '商品评价',
                path: '/goods/comment',
            },
        ],
    },
    {
        id: 'order',
        name: '订单管理',
        icon: 'appstore',
        children: [
            {
                id: 'orderlist',
                name: '全部订单',
                path: '/order/list',
            },
            {
                id: 'delivery',
                name: '待发货',
                path: '/order/delivery',
            },
            {
                id: 'receipt',
                name: '待收货',
                path: '/order/receipt',
            },
            {
                id: 'pay',
                name: '待付款',
                path: '/order/pay',
            },
            {
                id: 'complete',
                name: '已完成',
                path: '/order/complete',
            },
            {
                id: 'cancel',
                name: 'cancel',
                path: '/order/cancel',
            },
            {
                id: 'refund',
                name: '售后管理',
                path: '/order/refund',
            },
        ],
    },
    {
        id: 'user',
        name: '用户管理',
        icon: 'build',
        children: [
            {
                id: 'list',
                name: '用户列表',
                path: '/user/list',
            },
            {
                id: 'grade',
                name: '会员等级',
                path: '/user/grade',
            },
            {
                id: 'recharge',
                name: '充值记录',
                path: '/user/recharge',
            },
            {
                id: 'balance',
                name: '余额明细',
                path: '/user/balance',
            },
        ],
    },
    {
        id: 'market',
        name: '营销管理',
        icon: 'database',
        children: [
            {
                id: 'coupon',
                name: '优惠券列表',
                path: '/market/coupon',
            },
        ],
    },
    {
        id: 'setting',
        name: '设置',
        icon: 'eye',
        children: [
            {
                id: 'store',
                name: '商城设置',
                path: '/setting/store',
            },
            {
                id: 'trade',
                name: '交易设置',
                path: '/setting/trade',
            },
            {
                id: 'delivery',
                name: '运费模板',
                path: '/setting/delivery',
            },
            {
                id: 'express',
                name: '物流公司',
                path: '/setting/express',
            },
            {
                id: 'sms',
                name: '短信通知',
                path: '/setting/sms',
            },
            {
                id: 'tplmsg',
                name: '模板消息',
                path: '/setting/tplmsg',
            },
            {
                id: 'address',
                name: '退货地址',
                path: '/setting/address',
            },
            {
                id: 'storage',
                name: '上传设置',
                path: '/setting/storage',
            },
        ],
    },
];
