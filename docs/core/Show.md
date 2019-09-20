# Show

详情组件

## 组件依赖关系

```
ShowController -> useShowController -> useShow -> useGetOne -> useDataProvider -> ajax
```

## ShowController 示例

```js
import { ShowController } from '@stbui/prophet-core';

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

## useShowController 示例

```js
import { useShowController } from '@stbui/prophet-core';

const FormEdit = ({ save }) => {
    return <button onClick={() => save({ name: stbui })}>form</button>;
};

export default props => {
    const { save, isLoading, isSaving } = useShowController(props);

    return (
        <button disabled={isSaving} onClick={() => save({ name: stbui })}>
            submit
        </button>
    );
};
```

## useShow 示例

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

### useGetOne 示例

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
