import fetch from './fetch';

export default (apiUrl = '/api/', httpClient = fetch) => {
    return (type, resource, params) => {
        try {
            return require(`./${resource}`).default(
                apiUrl,
                httpClient,
                type,
                resource,
                params
            );
        } catch (e) {
            console.log('dataProvider:', resource, type, params);
            console.error('dataProvider:', '导入模块出错', e);
            return Promise.reject(e);
        }
    };
};
