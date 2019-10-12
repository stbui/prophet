# 先知（Prophet）

用于构建 react 中后台前端应用框架。基于 redux 和 redux-saga 数据流方案，提取出 CURD 组件,支持各种数据格式的适配。

## 特性

-   提炼 CRUD 容器组件，快速开始前端开发
-   基于 Ant Design 组件布局
-   提炼后台应用的典型页面和场景
-   提供 dataProvider 来处理各种数据规范

# 架构

![架构](docs/prophet.png)

## 起步

```bash
npm install @stbui/prophet@latest @stbui/prophet-data-json-server@latest
```

```js
import { Prophet, Resource } from '@stbui/prophet';
import { Layout } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';

<Prophet layout={Layout} dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
    <Resource
        name="users"
        list={props => <div>list</div>}
        edit={props => <div>edit</div>}
        create={props => <div>create</div>}
        show={props => <div>show</div>}
    />
</Prophet>;
```

## Packages

| Package                                                         | Docs | Description       |
| --------------------------------------------------------------- | ---- | ----------------- |
| [`@stbui/prophet-core`](/packages/core)                         |      | 底层组件的封装    |
| [`@stbui/prophet-antd`](/packages/antd)                         |      | antd UI 实现      |
| [`@stbui/prophet-data-json-server`](/packages/data-json-server) |      | REST 接口规范实现 |
