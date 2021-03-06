# dataProvider

向接口发送请求，将请求到的数据，依据 CRUD 设计思路，分别传递给对应组件

## 示例

```js
import { GET_LIST, CREATE, UPDATE, DELETE } from '@stbui/prophet-core';
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
            case CREATE:
                return;
            case UPDATE:
                return;
            case DELETE:
                return;
        }

        // 其他操作处理
    };
};
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
dataProvider('http://127.0.0.1:3000')('UPDATE', 'users', { id: 1 }).then(
    response => {
        console.log(response);
    }
);
/**
 * console.log
 * {data: {}}
 */
```
