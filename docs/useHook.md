# useHook

### useCreateController

### uesDeleteController

### uesEditController

### uesListController

### uesShowController

```js
// 获取 users 列表
const { data, ids, loading, error } = useGetList('users',{ page: 1, perPage: 10 },{ username: 'stbui' },{ field: 'id', order: 'DESC' });
// 获取一个单独的 users
const { data, loading, error } = useGetOne('users', record.id);
// 创建一个新的 users
const [create, { loading, error }] = useCreate('users', { username: 'stbui' });
// 更新 users
const { record, loading, save, isSaving } = useEdit({ resource, id payload: { data: { userId:1 } } });
// 删除 users
const [delete, { loading, error }] = useDelete('users', record.id);

// 获取数据，参数可以自定义
const { data, loading, error } = useQuery({
    type: 'GET_ONE',
    resource: 'users',
    payload: {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'username', order: 'ASC' },
        filter: { id: 1 },
    },
});
// 更新数据，参数可以自定义
const [update, { data, loading, error }] = useMutation({
    type: 'UPDATE',
    resource: 'users',
    payload: { id: record.id, data: { username: 'stbui' } },
});
// 获取数据，从redux中出
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
