import { defineConfig } from 'dumi';

export default defineConfig({
    title: '先知',
    logo: ' ',
    outputPath: 'dist',
    mode: 'site',
    hash: true,
    publicPath: '/prophet/',
    navs: [
        null,
        {
            title: 'GitHub',
            path: 'https://github.com/stbui/prophet',
        },
    ],
    menus: {
        '/ui': [
            {
                title: '介绍',
                children: ['/ui/intro'],
            },
            {
                title: 'CRUD组件',
                children: [
                    '/ui/antd/list',
                    '/ui/antd/create',
                    '/ui/antd/edit',
                    '/ui/antd/show',
                    '/ui/antd/delete',
                ],
            },
            {
                title: '扩展组件',
                children: [
                    '/ui/antd/dashboard',
                    '/ui/antd/layout',
                    '/ui/antd/datagrid',
                ],
            },
        ],
        '/component': [
            {
                title: 'CRUD组件',
                children: [
                    '/component/List',
                    '/component/Create',
                    '/component/Edit',
                    '/component/Show',
                    '/component/Delete',
                ],
            },
            {
                title: 'hook组件',
                children: [
                    '/component/use-get-list',
                    '/component/use-get-one',
                    '/component/use-create',
                    '/component/use-edit',
                    '/component/use-delete',
                    '/component/use-mutation',
                    '/component/usequery',
                    '/component/use-query-with-store',
                ],
            },
            {
                title: 'provider',
                children: [
                    '/component/dataProvider',
                    '/component/authProvider',
                    '/component/translationProvider',
                ],
            },
        ],
    },
});
