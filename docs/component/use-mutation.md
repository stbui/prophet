# useMuation

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
```
