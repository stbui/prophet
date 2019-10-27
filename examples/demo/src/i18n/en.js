import englishMessages from '@stbui/prophet-language-english';

export default {
    ...englishMessages,
    resources: {
        store: {
            fields: {
                id: 'ID',
                name: 'name',
                categories: 'category',
                price: 'price',
            },
        },
        category: {},
        user: {},
    },
};
