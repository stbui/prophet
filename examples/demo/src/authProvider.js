export default {
    login: params => {
        localStorage.setItem('username', JSON.stringify(params));
        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },

    checkError: ({ status }) => {
        console.log(status);
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    },

    getPermissions: () => {
        // const role = localStorage.getItem('role');
        const role = 'user';

        return Promise.resolve(role);
    },
};
