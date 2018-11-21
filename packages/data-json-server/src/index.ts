import { GET_LIST } from 'prophet-core';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetch) => {
  return (type, resource, params) => {
    console.log('===', 'data-json-server', '===');
    console.log('apiUrl', apiUrl);
    console.log('type', type);
    console.log('resource', resource);
    console.log('params', params);
    console.log('===', 'data-json-server', '===');

    let url = '';

    switch (type) {
      case GET_LIST:
        url = `${apiUrl}/${resource}?${stringify(params)}`;
        return httpClient(url)
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response, total: 0 }));
    }

    // 其他操作处理
    return httpClient(url);
  };
};
