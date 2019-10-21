# List

List 组件

## 组件依赖关系

```
ListController -> useListController -> useGetList -> useQueryWithStore -> useDataProvider -> ajax
```

## 示例

```js
import { ListController } from '@stbui/prophet-core';

export default props => {
    <ListController {...props}>...</ListController>;
};
```

## API

| 属性                | 类型   | 默认值                         | 可选值／参数 | 说明 |
| :------------------ | :----- | :----------------------------- | :----------- | :--- |
| resource            | string |                                | 否           |      |
| basePath            | string |                                | 否           |      |
| perPage             | number | 10                             | 否           |      |
| sort                | object | { field: 'id', order: 'ASC' } | 否           |      |
| filter              | any    |                                | 否           |      |
| filterDefaultValues | object |                                | 否           |      |

## useListController 示例

```js
import { useListController } from '@stbui/prophet-core';

export default props => {
    const {
        data,
        ids,
        isLoading,
        total,
        page,
        perPage,
        filterValues,
        setFilters,
        setPage,
        setPerPage,
        setSort,
        error,
    } = useListController(props);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div>{ids.map(id => data[id].username)}</div>;
};
```

## useGetList 示例

```js
import { useGetList } from '@stbui/prophet-core';

const UserList = () => {
    const { data, ids, loading, error } = useGetList(
        'users',
        { page: 1, perPage: 10 },
        { username: 'stbui' },
        { field: 'id', order: 'DESC' }
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div>{ids.map(id => data[id].username)}</div>;
};
```

### useQueryWithStore 示例

```js
import { useQueryWithStore } from '@stbui/prophet-core';

const UserProfile = record => {
    const { data, ids, total, loading, loaded, error } = useQueryWithStore(
        {
            type: 'GET_LIST',
            resource: 'users',
            payload: { pagination: {}, filter: {}, sort: {} },
        },
        { action: CRUD_GET_LIST },
        state =>
            state.resources[resource]
                ? state.resources[resource].list.ids
                : null,
        state =>
            state.resources[resource]
                ? state.resources[resource].list.total
                : null
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div>{data.username}</div>;
};
```

### useDataProvider 示例

```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDataProvider, showNotification } from '@stbui/prophet-core';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const dataProvider = useDataProvider();

    useEffect(() => {
        dataProvider('GET_LIST', 'posts', { filter: { status: 1 } })
            .then(({ data }) => setUsers(data))
            .catch(error => dispatch(showNotification('error', error.message)));
    }, []);

    return (
        <React.Fragment>
            {users.map((user, key) => (
                <UserDetail user={user} key={key} />
            ))}
        </React.Fragment>
    );
};
```
