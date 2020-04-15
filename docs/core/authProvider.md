# authProvider

```js
const authProvider = {
    login: () => {
        console.log('login');
    },
    logout: () => {
        console.log('logout');
    },
    checkAuth: () => {
        console.log('checkAuth');
        return Promise.resolve();
    },
    checkError: () => {
        console.log('checkError');
        return Promise.resolve();
    },
    getPermissions: () => {
        console.log('getPermissions');
        return Promise.resolve();
    },
};
```
