# Resource

快速创建一组路由，包含创建，编辑，详情路由，并在 store 中注册该路由。

## 示例

```js
import { Prophet, Resource } from '@stbui/prophet-core';
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

> /users

```js
<Resource name="users" list={props => <div>list</div>} />
```

> /users/:id

```js
<Resource name="users" edit={props => <div>edit</div>} />
```

> /users/create

```js
<Resource name="users" create={props => <div>create</div>} />
```

> /users/:id/show

```js
<Resource name="users" show={props => <div>show</div>} />
```

## API

| 属性   | 类型          | 默认值 | 可选值／参数 | 说明 |
| :----- | :------------ | :----- | :----------- | :--- |
| name   | string        |        |              |      |
| label  | string        |        |              |      |
| list   | ComponentType |        |              |      |
| edit   | ComponentType |        |              |      |
| create | ComponentType |        |              |      |
| show   | ComponentType |        |              |      |
