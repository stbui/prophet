# useHook

### useCreateController 创建新数据组件

### uesDeleteController 删除一条数据组件

### uesEditController 编辑一条数据组件

### uesListController 显示列表数据组件

### uesShowController 显示一条数据组件

```js
// 获取 users 列表
const { data, ids, loading, error } = useGetList('users',{ page: 1, perPage: 10 },{ username: 'stbui' },{ field: 'id', order: 'DESC' });
// 获取一条的 users
const { data, loading, error } = useGetOne('users', 'id');
// 创建一个新的 users
const [create, { loading, error }] = useCreate('users', { username: 'stbui' });
// 更新 users
const { record, loading, save, isSaving } = useEdit({ 'users', 1, payload: { data: { userId:1 } } });
// 删除 users
const [deleteOne, { loading, error }] = useDelete('users', 'id');

// 获取数据，自定义参数
const { data, loading, error } = useQuery({
    type: 'GET_ONE',
    resource: 'users',
    payload: {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'username', order: 'ASC' },
        filter: { id: 1 },
    },
});
// 更新数据，自定义参数
const [update, { data, loading, error }] = useMutation({
    type: 'UPDATE',
    resource: 'users',
    payload: { id: 'id', data: { username: 'stbui' } },
});
// 获取数据，在store中注册过
const { data, loading, error } = useQueryWithStore(
    {
        type: 'GET_ONE',
        resource: 'users',
        payload: { id: record.id },
    },
    {},
    state => state.resource.user.data[record.id]
);
```
