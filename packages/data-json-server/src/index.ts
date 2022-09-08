import { flattenObject, fetchJson, DataProvider } from '@stbui/prophet-core';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetchJson): DataProvider => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            ...flattenObject(params.filter),
            sort: field,
            order: order,
            page: page,
            perPage: perPage,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ json }: any) => ({
            data: json.result.resultList,
            total: json.result.total,
            code: json.code,
        }));
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({
            data: json,
        })),
});
