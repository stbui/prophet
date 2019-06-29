# Prophet

通过 dataProvider 把传递过来的数据,分发给内部组件

## 示例

```js
import { Prophet, Resource } from 'prophet-core';
import dataJsonServer from 'prophet-data-json-server';

<Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
  <Resource
    name="users"
    list={props => <div>list</div>}
    edit={props => <div>edit</div>}
    create={props => <div>create</div>}
    show={props => <div>show</div>}
  />
</Prophet>;
```

### 基本用法

```js
<Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>...</Prophet>
```

## API

| 属性         | 类型             | 默认值 | 可选值／参数 | 说明 |
| :----------- | :--------------- | :----- | :----------- | :--- |
| dataProvider | Promise Function | -      |              |      |
| customRoutes | []               | -      |              |      |
| dashboard    | ComponentType    | -      |              |      |
| layout       | ComponentType    | antd   |              |      |
| menu         | ComponentType    | antd   |              |      |
| brand        | ComponentType    | antd   |              |      |
| login        | ComponentType    | antd   |              |      |
| catchAll     | ComponentType    | antd   |              |      |
