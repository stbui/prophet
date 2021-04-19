# useCreate

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
