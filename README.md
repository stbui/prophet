# 中后台前端应用框架（Prophet）

用于构建企业级 react 中后台前端应用框架。基于 redux 和 redux-saga 数据流方案，提取出 CURD 组件,支持各种数据格式的适配。

## 特性

- 基于 Ant Design 组件布局
- 提炼后台应用的典型页面和场景
- 提供 dataProvider 来适配各种数据规范

# 架构

![架构](docs/prophet.svg)

## 起步

```bash
npm install prophet-core
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

## Packages

| Package                                                  | Docs | Description |
| -------------------------------------------------------- | ---- | ----------- |
| [`prophet-core`](/packages/core)                         |      |             |
| [`prophet-antd`](/packages/antd)                         |      |             |
| [`prophet-data-json-server`](/packages/data-json-server) |      |             |

## dev

```bash
npm install && npx lerna bootstrap
npm run build
npm run demo
```
