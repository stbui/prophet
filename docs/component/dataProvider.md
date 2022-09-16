# dataProvider

向接口发送请求，将请求到的数据，依据 CRUD 设计思路，分别传递给对应组件

## 示例

```js
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
```

### 基本用法

### RESTful 接口规范实现

| 类型     | 方法   | url 示例                   | 说明 |
| :------- | :----- | :------------------------- | :--- |
| GET_LIST | GET    | http://127.0.0.1/users     |      |
| GET_ONE  | GET    | http://127.0.0.1/users/:id |      |
| CREATE   | POST   | http://127.0.0.1/users     |      |
| UPDATE   | PUT    | http://127.0.0.1/users/:id |      |
| DELETE   | DELETE | http://127.0.0.1/users/:id |      |

#### 列表

```js
import dataProvider from 'prophet-json-demo';
dataProvider('http://127.0.0.1')
    .getList('users')
    .then(response => {
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
dataProvider('http://127.0.0.1:3000')
    .update('users', { id: 1 })
    .then(response => {
        console.log(response);
    });
/**
 * console.log
 * {data: {}}
 */
```
