## 示例

```js
import { Admin, Resource } from 'prophet-core';
import dataJsonServer from 'prophet-data-json-server';

<Admin dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
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

```js
<Resource name="users" />
```

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
