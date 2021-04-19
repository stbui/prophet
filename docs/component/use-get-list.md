# useGetList

获取 users 列表

```js
const { data, ids, loading, error } = useGetList(
    'users',
    { page: 1, perPage: 10 },
    { username: 'stbui' },
    { field: 'id', order: 'DESC' }
);
```
