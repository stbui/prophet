# useGetOne

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
