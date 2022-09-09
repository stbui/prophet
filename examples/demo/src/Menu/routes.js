export const routes = [
    { key: 'dashborad', label: '主页' },
    {
        key: 'goods',
        label: '商品管理',
        icon: 'alert',
        children: [
            {
                key: 'list',
                label: '商品列表',
                path: '/store',
            },
            {
                key: 'category',
                label: '商品分类',
                path: '/goods/category',
            },
            {
                key: 'comment',
                label: '商品评价',
                path: '/goods/comment',
            },
        ],
    },
    {
        key: 'order',
        label: '订单管理',
        icon: 'appstore',
        children: [
            {
                key: 'orderlist',
                label: '全部订单',
                path: '/order/list',
            },
            {
                key: 'orderdelivery',
                label: '待发货',
                path: '/order/delivery',
            },
            {
                key: 'receipt',
                label: '待收货',
                path: '/order/receipt',
            },
            {
                key: 'pay',
                label: '待付款',
                path: '/order/pay',
            },
            {
                key: 'complete',
                label: '已完成',
                path: '/order/complete',
            },
            {
                key: 'cancel',
                label: 'cancel',
                path: '/order/cancel',
            },
            {
                key: 'refund',
                label: '售后管理',
                path: '/order/refund',
            },
        ],
    },
    {
        key: 'user',
        label: '用户管理',
        icon: 'build',
        children: [
            {
                key: 'userlist',
                label: '用户列表',
                path: '/user/list',
            },
            {
                key: 'grade',
                label: '会员等级',
                path: '/user/grade',
            },
            {
                key: 'recharge',
                label: '充值记录',
                path: '/user/recharge',
            },
            {
                key: 'balance',
                label: '余额明细',
                path: '/user/balance',
            },
        ],
    },
    {
        key: 'market',
        label: '营销管理',
        icon: 'database',
        children: [
            {
                key: 'coupon',
                label: '优惠券列表',
                path: '/market/coupon',
            },
        ],
    },
    {
        key: 'setting',
        label: '设置',
        icon: 'eye',
        children: [
            {
                key: 'store',
                label: '商城设置',
                path: '/setting/store',
            },
            {
                key: 'trade',
                label: '交易设置',
                path: '/setting/trade',
            },
            {
                key: 'settingdelivery',
                label: '运费模板',
                path: '/setting/delivery',
            },
            {
                key: 'express',
                label: '物流公司',
                path: '/setting/express',
            },
            {
                key: 'sms',
                label: '短信通知',
                path: '/setting/sms',
            },
            {
                key: 'tplmsg',
                label: '模板消息',
                path: '/setting/tplmsg',
            },
            {
                key: 'address',
                label: '退货地址',
                path: '/setting/address',
            },
            {
                key: 'storage',
                label: '上传设置',
                path: '/setting/storage',
            },
        ],
    },
];
