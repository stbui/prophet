# Prophet

可插拔的企业级 react 中后台前端应用框架。基于 redux 和 redux-saga 数据流，抽离出 CURD 组件,支持各种数据格式的适配。

## 特性

- 基于 Ant Design 组件布局
- 提炼后台应用的典型页面和场景
- 提供 dataProvider 来适配各种数据规范

# 架构

Api -> GET -> dataProvider -> redux-saga -> reducers -> list
Api -> POST -> dataProvider -> redux-saga -> reducers -> create
Api -> PUT -> dataProvider -> redux-saga -> reducers -> edit
Api -> DELETE -> dataProvider -> redux-saga -> reducers -> any

## 起步

```bash
npm install && npx lerna bootstrap
npm run build
npm run demo
```

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

## 包

- prophet-core
- prophet-antd
- prophet-data-json-server

## prophet-core

#### Admin

```js
<Admin dataProvider={} layout={} menu={} dashboard={} customRoutes={} />
```

#### Resource

```js
<Resource
  name="users"
  label="用户"
  list={}
  edit={}
  create={}
  show={}
/>
```

## prophet-antd

#### List

#### Create

#### Edit

#### Show

## prophet-data-json-server
