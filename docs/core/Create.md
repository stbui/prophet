# Create

创建组件

## 组件依赖关系

```
CreateController -> useCreateController -> useCreate -> useMuation -> useDataProvider -> ajax
```

## CreateController 示例

```js
import { CreateController } from '@stbui/@stbui/prophet-core';

const FormEdit = ({ save }) => {
    return <button onClick={() => save({ name: stbui })}>submit</button>;
};

export default props => (
    <EditController {...props}>
        <FormEdit />
    </EditController>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| resource | string |        | 否           |      |
| basePath | string |        | 否           |      |
| id       | number |        | 否           |      |

## useCreateController 示例

```js
import { useCreateController } from '@stbui/prophet-core';

const FormEdit = ({ save }) => {
    return <button onClick={() => save({ name: stbui })}>form</button>;
};

export default props => {
    const { save, isLoading, isSaving } = useCreateController(props);

    return (
        <button disabled={isSaving} onClick={() => save({ name: stbui })}>
            submit
        </button>
    );
};
```

## useCreate 示例

```js
import { useCreate } from 'props-core';

const UserProfile = ({ record }) => {
    const [create, { loading, error }] = useCreate('users', {
        username: 'stbui',
    });

    if (error) {
        return <Error />;
    }

    return (
        <div loading={loading} onClick={create}>
            create
        </div>
    );
};
```

### useMuation 示例

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
