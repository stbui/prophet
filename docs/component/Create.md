---
toc: menu
---

# Create

通过 Create 包装过的组件，将赋予了创建一条数据的功能

##### 组件依赖关系

```
CreateController -> useCreateController -> useCreate -> useMuation -> useDataProvider -> ajax
```

## CreateController

```js
import { CreateController } from '@stbui/prophet-core';

const FormEdit = ({ save }) => {
    return <button onClick={() => save({ name: stbui })}>创建</button>;
};

export default props => (
    <CreateController {...props}>
        <FormEdit />
    </CreateController>
);
```

#### API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                         |
| :------- | :----- | :----- | :----------- | :--------------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path      |
| basePath | string | -      | 否           | 用于页面路由拼接，路由跳转等 |

## useCreateController

```js
import { useCreateController } from '@stbui/prophet-core';

export default props => {
    const { save, loading, saving } = useCreateController(props);

    return (
        <button disabled={saving} onClick={() => save({ name: stbui })}>
            创建
        </button>
    );
};
```

## useCreate

```js
import { useCreate } from 'props-core';

const UserProfile = ({ record }) => {
    const [create, { loading, error }] = useCreate('users', {
        username: 'stbui',
    });

    if (error) {
        return error.message;
    }

    return (
        <div loading={loading} onClick={create}>
            创建
        </div>
    );
};
```

## useMuation

```js
import { useMutation } from '@stbui/prophet-core';

const UserProfile = record => {
    const [update, { data, loading, error }] = useMutation({
        type: 'UPDATE',
        resource: 'users',
        payload: { id: record.id, data: { username: 'stbui' } },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div onClick={update}>{data.username}</div>;
};

const UserProfile = record => {
    const [update, { data, loading, error }] = useMutation({
        type: 'UPDATE',
        resource: 'users',
        payload: { id: record.id, data: { username: 'stbui' } },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div onClick={() => update(null, { data: { updateAt: new Date() } })}>
            {data.username}
        </div>
    );
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
            .catch(error => dispatch(showNotification(error.message, 'error')));
    }, []);

    return users.map((user, key) => <div key={key}>{user.name}</div>);
};
```
