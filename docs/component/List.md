---
nav:
    title: 容器组件
    order: 3
order: 1
toc: menu
---

# List

List 组件

##### 组件依赖关系

```
ListController -> useListController -> useGetList -> useQueryWithStore -> useDataProvider -> ajax
```

## ListController

```js
import { ListController } from '@stbui/prophet-core';

export default props => {
    <ListController>...</ListController>;
};
```

##### API

| 属性                | 类型   | 默认值                        | 可选值／参数 | 说明                    |
| :------------------ | :----- | :---------------------------- | :----------- | :---------------------- |
| resource            | string | -                             | 是           | 用于映射到对于接口 path |
| page                | number | 1                             | 是           |                         |
| perPage             | number | 10                            | 是           |                         |
| sort                | object | { field: 'id', order: 'ASC' } | 是           |                         |
| filter              | object |                               | 是           |                         |
| filterDefaultValues | object |                               | 是           |                         |
| queryOptions        | object | {}                            | 是           | 附加参数                |

## useListController

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

## useGetList

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

## useQueryWithStore

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

## useDataProvider

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
