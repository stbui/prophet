import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from 'prophet-core';
import { crudMetadata } from 'prophet-common';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetch) => {
  return (type: crudMetadata, resource: string, params: any): Promise<any> => {
    let url: string = '';

    switch (type) {
      case GET_LIST:
        const { pagination, ...ohter } = params;
        const query = {
          ...ohter
        };

        if (pagination) {
          const { current, pageSize } = pagination;
          query.page = current;
          query.pageSize = pageSize;
        }

        url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url)
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response, total: 0 }));
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;

        return httpClient(url)
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response }));
      case CREATE:
        url = `${apiUrl}/${resource}`;
        return httpClient(url, {
          method: 'POST',
          body: JSON.stringify(params.data)
        })
          .then(resopnse => resopnse.json())
          .then(response => ({ data: { ...params.data, id: response.id } }));
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, {
          method: 'PUT',
          body: JSON.stringify(params.data)
        })
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response }));
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, { method: 'DETETE' })
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response }));
      default:
        throw new Error(`不支持action类型 ${type}`);
    }
  };
};
