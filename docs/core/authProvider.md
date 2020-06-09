# authProvider

系统的权限控制，包括登录，登出，权限检查

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
