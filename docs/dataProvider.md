# dataProvider

## 映射 RESTful 服务器接口

| 类型       | 方法   | url 示例                   | 说明 |
| :--------- | :----- | :------------------------- | :--- |
| GET_LIST   | GET    | http://127.0.0.1/users     |      |
| GET_CREATE | POST   | http://127.0.0.1/users     |      |
| GET_EDIT   | PUT    | http://127.0.0.1/users/:id |      |
| GET_SHOW   | DELETE | http://127.0.0.1/users/:id |      |
| ...        | GET    | http://127.0.0.1/users/:id |      |

## 示例

```js
import { GET_LIST, GET_CREATE, GET_EDIT, GET_SHOW } from 'prophet-core';
import { stringify } from 'query-string';

export default (apiUrl: string, httpClient = fetch) => {
  return (type, resource, params) => {
    let url = '';

    switch (type) {
      case GET_LIST:
        url = `${apiUrl}/${resource}?${stringify(params)}`;
        return httpClient(url)
          .then(resopnse => resopnse.json())
          .then(response => ({ data: response, total: 0 }));
      case GET_CREATE:
        return;
      case GET_EDIT:
        return;
      case GET_SHOW:
        return;
    }

    // 其他操作处理
  };
};
```

### 基本用法

#### 列表

```js
import dataProvider from 'prophet-json-demo';
dataProvider('http://127.0.0.1')('GET_LIST', 'users').then(response => {
  console.log(response);
});
/**
 * console.log
 * {data: [], totoal: 0}
 */
```

#### 更新

```js
import dataProvider from 'prophet-json-demo';
dataProvider('http://127.0.0.1:3000')('GET_EDIT', 'users', { id: 1 }).then(
  response => {
    console.log(response);
  }
);
/**
 * console.log
 * {data: {}}
 */
```

## API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :----- | :----------- | :--- |

