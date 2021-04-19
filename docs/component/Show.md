---
toc: menu
---

# Show

详情组件。在渲染该组件时，先向 dataProvider 获取到该 id 的数据，成功拿到数据之后渲染子组件

#### 组件依赖关系

```
ShowController -> useShowController -> useShow -> useGetOne -> useDataProvider -> ajax
```

## ShowController

```js
import { Show } from '@stbui/prophet';

const ShowView = ({ record }) => {
    return <div>{record.id}</div>;
};

export default props => (
    <Show {...props}>
        <ShowView />
    </Show>
);
```

#### API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                         |
| :------- | :----- | :----- | :----------- | :--------------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path      |
| basePath | string | -      | 否           | 用于页面路由拼接，路由跳转等 |
| id       | number | 是     | 否           | 从 ShowButton 组件传入       |

## useShowController

```js
import { useShowController } from '@stbui/prophet-core';

const ShowView = ({ record }) => <div>{record.name}</div>;

const create = props => {
    const controllerProps = useShowController(props);

    return <ShowView {...controllerProps} {...props} />;
};
```

## useShow

```js
import { useShow } from 'props-core';

const UserProfile = ({ record }) => {
    const [Show, { loading, error }] = useShow('users', {
        username: 'stbui',
    });

    if (error) {
        return <Error />;
    }

    return (
        <div loading={loading} onClick={Show}>
            Show
        </div>
    );
};
```

## useGetOne

```js
import { useGetOne } from '@stbui/prophet-core';

cconst UserProfile = record => {
    const { data, loading, error } = useGetOne('users', record.id);

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
