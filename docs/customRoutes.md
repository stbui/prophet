# customRoutes

## 示例

```js
import { Admin, Resource } from 'prophet-core';
import dataJsonServer from 'prophet-data-json-server';
import { Route } from 'react-router-dom';

<Admin
  dataProvider={dataJsonServer('http://127.0.0.1:3001')}
  customRoutes={[<Route path="custom" component={<div>custom router</div>} />]}
>
  <Resource
    name="users"
    list={props => <div>list</div>}
    edit={props => <div>edit</div>}
    create={props => <div>create</div>}
    show={props => <div>show</div>}
  />
</Admin>;
```

### 基本用法

## API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :----- | :----------- | :--- |

