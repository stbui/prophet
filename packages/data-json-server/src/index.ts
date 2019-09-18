import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from 'prophet-core';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetch) => {
    return (type: any, resource: string, params: any): Promise<any> => {
        let url: string = '';

        switch (type) {
            case GET_LIST:
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;

                const query = {
                    ...params.filter,
                    sort: field,
                    order: order,
                    page: page,
                    perPage: perPage,
                };

                url = `${apiUrl}/${resource}?${stringify(query)}`;
                return httpClient(url)
                    .then(resopnse => resopnse.json())
                    .then(response => ({
                        data: response.result.resultList,
                        total: response.result.total,
                        code: response.code,
                    }));
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;

                return httpClient(url)
                    .then(resopnse => resopnse.json())
                    .then(response => ({
                        data: response.result,
                        code: response.code,
                    }));
            case CREATE:
                url = `${apiUrl}/${resource}`;
                return httpClient(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: JSON.stringify(params.data),
                })
                    .then(resopnse => resopnse.json())
                    .then(response => ({
                        data: { ...params.data, id: response.id },
                    }));
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                return httpClient(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: JSON.stringify(params.data),
                })
                    .then(resopnse => resopnse.json())
                    .then(response => ({
                        data: response.result,
                        code: response.code,
                    }));
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                return httpClient(url, { method: 'DELETE' })
                    .then(resopnse => resopnse.json())
                    .then(response => ({
                        data: response.result,
                        code: response.code,
                    }));
            default:
                throw new Error(`不支持action类型 ${type}`);
        }
    };
};
