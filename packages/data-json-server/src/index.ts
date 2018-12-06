import { GET_LIST } from 'prophet-core';
import { crudMetadata } from 'prophet-common';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetch) => {
  return (type: crudMetadata, resource: any, params: any) => {
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
    }

    // 其他操作处理
    return httpClient(url);
  };
};
