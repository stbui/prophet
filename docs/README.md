# 中后台前端应用框架（Prophet）

用于构建企业级 react 中后台前端应用框架。基于 redux 和 redux-saga 数据流方案，提取出 CURD 组件,支持各种数据格式的适配。

## 特性

-   高生产效率: 10 分钟内做一个管理后台
-   提炼 CRUD 容器组件，UI 与逻辑分离，快速开始前端开发
-   提炼后台应用的典型页面和场景，具备完备的组件和布局
-   提供一致的 react hook，提供更强大的组件拓展与封装能力
-   默认集成 antd 组件布局，同时也灵活支持第三方 UI 组件集成
-   引入 dataProvider 来处理各 种数据规范
-   模块化管理，提供更加灵活的扩展机制。

## 架构

![架构](./prophet.png)

-   ** 数据源: ** 后端接口提供方式，如 REST，Graphql， RPC 等
-   ** 数据处理: ** 通过数据源提供来的数据进行规范化处理
-   ** 组件/Hook: ** 将数据封装 CRUD 组件和 Hook
-   ** UI: ** 包装成业务组件

| Package                                                         | Docs | Description       |
| --------------------------------------------------------------- | ---- | ----------------- |
| [`@stbui/prophet-core`](/packages/core)                         |      | 底层组件的封装    |
| [`@stbui/prophet-antd`](/packages/antd)                         |      | antd UI 实现      |
| [`@stbui/prophet-data-json-server`](/packages/data-json-server) |      | REST 接口规范实现 |
