import { GET_LIST } from 'prophet-core';

export default (apiUrl: string, httpClient = fetch) => {
  return (type, resource, params) => {
    console.log('data-json-server', apiUrl, httpClient);
    console.log('data-json-server', type, resource, params);

    switch (type) {
      case GET_LIST:
        return httpClient(apiUrl)
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response }));
    }

    // 其他操作处理
    return Promise.all([{ resource: GET_LIST }]).then(response => ({
      data: response
    }));
  };
};
