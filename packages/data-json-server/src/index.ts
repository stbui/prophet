import { fetchJson } from '@stbui/prophet-core';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetchJson) => {
    return (type: string, resource: string, params: any): Promise<any> => {
        let url: string = '';

        // switch (type) {
        //     case GET_LIST:
        //         const { page, perPage } = params.pagination;
        //         const { field, order } = params.sort;

        //         const query = {
        //             ...fetchUtils.flattenObject(params.filter),
        //             sort: field,
        //             order: order,
        //             page: page,
        //             perPage: perPage,
        //         };

        //         url = `${apiUrl}/${resource}?${stringify(query)}`;
        //         return httpClient(url).then(({ json }: any) => ({
        //             data: json.result.resultList,
        //             total: json.result.total,
        //             code: json.code,
        //         }));
        //     case GET_ONE:
        //         url = `${apiUrl}/${resource}/${params.id}`;

        //         return httpClient(url).then(({ json }: any) => ({
        //             data: json.result,
        //             code: json.code,
        //         }));
        //     case CREATE:
        //         url = `${apiUrl}/${resource}`;
        //         return httpClient(url, {
        //             method: 'POST',
        //             body: JSON.stringify(params.data),
        //         }).then(({ json }: any) => ({
        //             data: { ...params.data, id: json.id },
        //         }));
        //     case UPDATE:
        //         url = `${apiUrl}/${resource}/${params.id}`;
        //         return httpClient(url, {
        //             method: 'PUT',
        //             body: JSON.stringify(params.data),
        //         }).then(({ json }) => ({
        //             data: json.result,
        //             code: json.code,
        //         }));
        //     case DELETE:
        //         url = `${apiUrl}/${resource}/${params.id}`;
        //         return httpClient(url, { method: 'DELETE' }).then(
        //             ({ json }) => ({
        //                 data: json.result,
        //                 code: json.code,
        //             })
        //         );

        //     default:
        //         throw new Error(`不支持action类型 ${type}`);
        // }
        url = `${apiUrl}/${resource}`;
        return httpClient(url).then(({ json }) => ({ data: [] }));
    };
};
