import chineseMessages from '@stbui/prophet-language-chinese';

export default {
    ...chineseMessages,
    resources: {
        store: {
            fields: {
                id: '商品ID',
                name: '商品名称',
                category: '分类',
                price: '价格',
            },
        },
        category: {},
        user: {},
    },
};
